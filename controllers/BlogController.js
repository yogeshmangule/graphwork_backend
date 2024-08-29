import BlogModel from "../models/BlogModel.js";

//** Metodos para el CRUD**//

//Mostrar todos los registros 
export const getAllBlogs = async (req,  res) => {
    try{
        const blogs = await BlogModel.findAll()
        res.json(blogs)

    } catch (error){
        res.json({message: error.message})

    }
}
// Mostrar un registro por ID
export const getBlog = async (req, res) => {
    try {
        const blog = await BlogModel.findByPk(req.params.id);

        if (!blog) {
            res.status(404).json({ message: "Blog no encontrado" });
            return;
        }

        res.json(blog);
    } catch (error) {
        res.json({ message: error.message });
    }
};
// Crear un nuevo registro
export const createBlog = async (req, res) => {
    try {
        const newBlog = await BlogModel.create(req.body);
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// Actualizar un registro por ID
export const updateBlog = async (req, res) => {
    try {
        const blog = await BlogModel.findByPk(req.params.id);

        if (!blog) {
            res.status(404).json({ message: "Blog no encontrado" });
            return;
        }

        await blog.update(req.body);
        res.json({ message: "Blog actualizado correctamente" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// Eliminar un registro por ID
export const deleteBlog = async (req, res) => {
    try {
        const blog = await BlogModel.findByPk(req.params.id);

        if (!blog) {
            res.status(404).json({ message: "Blog no encontrado" });
            return;
        }

        await blog.destroy();
        res.json({ message: "Blog eliminado correctamente" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};