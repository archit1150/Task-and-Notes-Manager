const Sequelize = require('sequelize')

const db = new Sequelize({
    dialect: 'sqlite',
    storage: __dirname + '/todos.db'
})

const Todos = db.define('todo', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    description:{
        type: Sequelize.STRING(400),
        defaultValue:'No Description Available'
    },
    done: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: 'incomplete'
    },
    due: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW

    },
    priority:{
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue:'medium'

    }
})
const Notes = db.define('notes', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey : true,
    },
    note: {
        type: Sequelize.STRING(100),
    },
})
module.exports = {
    db, Todos , Notes
}