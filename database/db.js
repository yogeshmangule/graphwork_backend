import { Sequelize } from 'sequelize'

const db = new Sequelize('fiestaismadrid_quality', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

export default db

// import { Sequelize } from 'sequelize'

// const db = new Sequelize('fiestaismadrid_responsable', 'fiestaismadrid_responsable_usr', 'conAbsystem_80', {
//     host: 'localhost',
//     dialect: 'mysql'
// })

// export default db