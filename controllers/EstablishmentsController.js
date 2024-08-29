import sequelize from '../database/db.js';
import crypto from 'crypto'

const getAllEstablishments = async (req, res) => {
    console.log(req.body, "request body");
    const input = req.body;
    const values = [];
    const LANGUAGES = ['es_ES', 'es']; // Define your languages array

    if (!input.language) input.language = LANGUAGES[0];

    let query = `
      SELECT 
        establishments_details.ID,
        establishments_details.owner,
        establishments_details.name,
        establishments_descriptions.text AS description,
        establishments_locations.full_address,
        ST_Y(establishments_locations.coordinate) AS latitude,
        ST_X(establishments_locations.coordinate) AS longitude
      FROM establishments_details
      INNER JOIN establishments_locations ON establishments_details.ID = establishments_locations.ID
      INNER JOIN establishments_descriptions ON establishments_details.ID = establishments_descriptions.ID
      WHERE establishments_details.status > 0
      AND establishments_descriptions.language = ?`;

    values.push(input.language);

    // Sorting
    const sortableFields = ['ID', 'name', 'description', 'full_address'];
    const sortField = sortableFields.includes(input.sortField) ? input.sortField : 'name';
    const sortOrder = ['asc', 'desc'].includes(input.sortOrder) ? input.sortOrder : 'asc';

    // Pagination
    const page = input.page || 1;
    const sizePerPage = input.sizePerPage || 10;

    // Filters
    if (input.filters && typeof input.filters === 'object') {
        Object.keys(input.filters).forEach(key => {
            const filter = input.filters[key];
            if (filter.filterType === 'TEXT') {
                if (key === 'description') {
                    query += ` AND establishments_descriptions.text LIKE ?`;
                } else if (key === 'full_address') {
                    query += ` AND establishments_locations.full_address LIKE ?`;
                } else {
                    query += ` AND ${key} LIKE ?`;
                }
                values.push(`%${filter.filterVal}%`);
            } else if (filter.filterType === 'NUMBER' && filter.filterVal.comparator && filter.filterVal.number !== undefined) {
                const allowed = ['=', '>=', '<=', '>', '<', '!='];
                if (allowed.includes(filter.filterVal.comparator)) {
                    query += ` AND ${key} ${filter.filterVal.comparator} ?`;
                    values.push(filter.filterVal.number);
                }
            } else if (filter.filterType === 'DATE' && filter.filterVal.comparator && filter.filterVal.date) {
                const date = new Date(filter.filterVal.date).toISOString().split('T')[0];
                const allowed = ['=', '>=', '<=', '>', '<', '!='];
                if (allowed.includes(filter.filterVal.comparator)) {
                    if (filter.filterVal.comparator === '=') {
                        query += ` AND ${key} LIKE ?`;
                        values.push(`${date}%`);
                    } else if (filter.filterVal.comparator === '!=') {
                        query += ` AND ${key} NOT LIKE ?`;
                        values.push(`${date}%`);
                    } else {
                        query += ` AND ${key} ${filter.filterVal.comparator} ?`;
                        values.push(date);
                    }
                }
            }
        });
    }

    try {
        // Count total results
        const totalResults = await sequelize.query(query, { replacements: values, type: sequelize.QueryTypes.SELECT });
        const total = totalResults.length;

        // Sorting and pagination
        query += ` ORDER BY ${sortField} ${sortOrder} LIMIT ? OFFSET ?`;
        values.push(sizePerPage, (page - 1) * sizePerPage);

        // Get paginated results
        const items = await sequelize.query(query, { replacements: values, type: sequelize.QueryTypes.SELECT });

        res.json({ total, items });
    } catch (error) {
        console.log(error, "error")
        res.status(500).json({ message: error.message });
    }
};


const getEstablishmentByID = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'ID is required' });
    }

    try {
        const query = `
            SELECT
                ed.ID,
                ed.name,
                ed.owner,
                el.full_address,
                ST_Y(el.coordinate) AS latitude,
                ST_X(el.coordinate) AS longitude
            FROM establishments_details ed
            INNER JOIN establishments_locations el ON ed.ID = el.ID
            WHERE ed.status = 1 AND ed.ID = ?`;

        const [establishment] = await sequelize.query(query, {
            replacements: [id],
            type: sequelize.QueryTypes.SELECT
        });

        if (!establishment) {
            return res.status(404).json({ message: 'Establishment not found' });
        }

        // Get establishment descriptions as an array
        const descriptionQuery = `
            SELECT language, text 
            FROM establishments_descriptions 
            WHERE ID = ?`;
        const descriptions = await sequelize.query(descriptionQuery, {
            replacements: [id],
            type: sequelize.QueryTypes.SELECT
        });

        establishment.description = descriptions; // Simple array of descriptions

        // If the 'full' query parameter is present, get pictures
        if (req.query.full) {
            const picturesQuery = `SELECT buffer FROM establishments_pictures WHERE ID = ?`;
            const pictures = await sequelize.query(picturesQuery, {
                replacements: [id],
                type: sequelize.QueryTypes.SELECT
            });

            establishment.pictures = pictures.map(picture =>
                `data:image/webp;base64,${picture.buffer.toString('base64')}`
            );
        }

        // Return the structured establishment data
        res.json(establishment);
    } catch (error) {
        console.error("Error fetching establishment:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const updateEstablishment = async (req, res) => {

    const { name, full_address, latitude, longitude, language, user_id } = req.body;
    const ID = parseInt(req.body.ID);

    const descriptions = req.body.description;
    console.log(req.body, ID, descriptions, req.files, "req");
    if (!ID || !name || !full_address || !latitude || !longitude || !language) {
        return res.status(400).json({ message: 'Required fields are missing' });
    }

    try {
        await sequelize.transaction(async (t) => {
            // Update establishment details
            await sequelize.query(
                "UPDATE establishments_details SET name = ? WHERE ID = ?",
                {
                    replacements: [name, ID],
                    type: sequelize.QueryTypes.UPDATE,
                    transaction: t
                }
            );

            // Update establishment location
            await sequelize.query(
                "UPDATE establishments_locations SET full_address = ?, coordinate = ST_GeomFromText('POINT(? ?)', 4326) WHERE ID = ?",
                {
                    replacements: [full_address, longitude, latitude, ID],
                    type: sequelize.QueryTypes.UPDATE,
                    transaction: t
                }
            );

            // Handle descriptions
            for (let lang in descriptions) {
                const text = descriptions[lang];

                const [existingDescription] = await sequelize.query(
                    "SELECT text FROM establishments_descriptions WHERE ID = ? AND language = ?",
                    {
                        replacements: [ID, lang],
                        type: sequelize.QueryTypes.SELECT,
                        transaction: t
                    }
                );

                if (existingDescription) {
                    if (existingDescription.text !== text) {
                        await sequelize.query(
                            "UPDATE establishments_descriptions SET text = ? WHERE ID = ? AND language = ?",
                            {
                                replacements: [text, ID, lang],
                                type: sequelize.QueryTypes.UPDATE,
                                transaction: t
                            }
                        );
                    }
                } else {
                    await sequelize.query(
                        "INSERT INTO establishments_descriptions (ID, language, text) VALUES (?, ?, ?)",
                        {
                            replacements: [ID, lang, text],
                            type: sequelize.QueryTypes.INSERT,
                            transaction: t
                        }
                    );
                }
            }

            // Handle pictures if provided
            if (req.files && req.files.length > 0) {
                // Delete existing pictures
                await sequelize.query(
                    "DELETE FROM establishments_pictures WHERE ID = ?",
                    {
                        replacements: [ID],
                        type: sequelize.QueryTypes.DELETE,
                        transaction: t
                    }
                );

                // Insert new pictures
                const pictures = Array.isArray(req.files) ? req.files : [req.files];
                console.log(pictures, "pictures")
                for (let picture of pictures) {
                    const buffer = picture.buffer; // Get buffer from file
                    const hash = crypto.createHash('md5').update(buffer).digest('hex');

                    await sequelize.query(
                        "INSERT INTO establishments_pictures (ID, hash, buffer) VALUES (?, ?, ?)",
                        {
                            replacements: [ID, hash, buffer],
                            type: sequelize.QueryTypes.INSERT,
                            transaction: t
                        }
                    );
                }
            }
        });

        res.json({ success: true, message: 'Establishment updated successfully', establishmentID: ID });
    } catch (error) {
        console.error("Error updating establishment:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const disableEstablishment = async (req, res) => {
    const { id } = req.params;
    const { user_id, permissions } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'ID is required' });
    }

    try {
        const establishmentDetails = await sequelize.query("SELECT name, owner FROM establishments_details WHERE ID = ? LIMIT 1", {
            replacements: [id],
            type: sequelize.QueryTypes.SELECT
        });

        if (establishmentDetails.length === 0) {
            return res.status(404).json({ message: 'Establishment not found' });
        }

        if (!permissions.includes('delete:establishments') && establishmentDetails[0].owner !== user_id) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        await sequelize.query("UPDATE establishments_details SET status = 0 WHERE ID = ? LIMIT 1", {
            replacements: [id],
            type: sequelize.QueryTypes.UPDATE
        });

        res.json({ success: true });
    } catch (error) {
        console.log(error, "error");
        res.status(500).json({ message: error.message });
    }
};

const deleteEstablishment = async (req, res) => {
    const { id } = req.params;
    const { user_id, permissions } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'ID is required' });
    }

    try {
        const establishmentDetails = await sequelize.query("SELECT name, owner FROM establishments_details WHERE ID = ? LIMIT 1", {
            replacements: [id],
            type: sequelize.QueryTypes.SELECT
        });

        if (establishmentDetails.length === 0) {
            return res.status(404).json({ message: 'Establishment not found' });
        }

        if (!permissions.includes('delete:establishments') && establishmentDetails[0].owner !== user_id) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        await sequelize.query("DELETE FROM establishments_details WHERE ID = ? LIMIT 1", {
            replacements: [id],
            type: sequelize.QueryTypes.DELETE
        });

        res.json({ success: true, name: establishmentDetails[0].name });
    } catch (error) {
        console.log(error, "error");
        res.status(500).json({ message: error.message });
    }
};

const createEstablishment = async (req, res) => {
    console.log(req.body, req.files, "createEstablishment");
    const { user_id } = req.body;  // Assuming user_id is being passed
    const input = req.body;

    // Check for required fields
    if (!input || !input.name || !input.full_address || !input.latitude || !input.longitude || !input.description) {
        return res.status(400).json({ message: 'Required fields are missing' });
    }

    try {
        // Convert latitude and longitude to float to ensure they are numbers
        const latitude = parseFloat(input.latitude);
        const longitude = parseFloat(input.longitude);

        // Check if coordinates are valid
        if (isNaN(latitude) || isNaN(longitude)) {
            return res.status(400).json({ message: 'Invalid latitude or longitude' });
        }

        // Check if an establishment with the same name already exists
        const checkExist = await sequelize.query(
            "SELECT ID FROM establishments_details WHERE name = ? LIMIT 1",
            {
                replacements: [input.name],
                type: sequelize.QueryTypes.SELECT
            }
        );

        if (checkExist.length > 0) {
            return res.status(409).json({ message: 'Establishment with this name already exists' });
        }

        await sequelize.transaction(async (t) => {
            // Insert into establishments_details table
            const [result] = await sequelize.query(
                "INSERT INTO establishments_details (name, owner, created_at) VALUES (?, ?, NOW())",
                {
                    replacements: [input.name, user_id],
                    type: sequelize.QueryTypes.INSERT,
                    transaction: t
                }
            );
            const newEstablishmentID = result;

            // Insert into establishments_locations table
            await sequelize.query(
                `INSERT INTO establishments_locations (ID, full_address, coordinate) VALUES (?, ?, ST_GeomFromText('POINT(${longitude} ${latitude})', 4326))`,
                {
                    replacements: [newEstablishmentID, input.full_address],
                    type: sequelize.QueryTypes.INSERT,
                    transaction: t
                }
            );

            // Insert into establishments_descriptions table
            await sequelize.query(
                "INSERT INTO establishments_descriptions (ID, language, text) VALUES (?, ?, ?)",
                {
                    replacements: [newEstablishmentID, input.language, input.description],  // Assuming 'en' for English; adjust as necessary
                    type: sequelize.QueryTypes.INSERT,
                    transaction: t
                }
            );

            // Handle pictures
            if (req.files && req.files.length > 0) {
                for (const file of req.files) {
                    console.log(file.buffer, "file"); // Debug log for file
                    const buffer = file.buffer;
                    const hash = crypto.createHash('md5').update(buffer).digest('hex');
                    await sequelize.query(
                        "INSERT INTO establishments_pictures (ID, hash, buffer, updated_at) VALUES (?, ?, ?, NOW())",
                        {
                            replacements: [newEstablishmentID, hash, buffer],
                            type: sequelize.QueryTypes.INSERT,
                            transaction: t
                        }
                    );
                }
            }

            res.json({ success: true, establishmentID: newEstablishmentID });
        });
    } catch (error) {
        console.log(error, "error");
        res.status(500).json({ message: error.message });
    }
};

export {
    getAllEstablishments,
    getEstablishmentByID,
    updateEstablishment,
    disableEstablishment,
    deleteEstablishment,
    createEstablishment
};
