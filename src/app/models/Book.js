const User = require('./User');

module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define("Book", {
        userEmail: DataTypes.STRING,
        name: DataTypes.STRING,
        author: DataTypes.STRING,
        cover: DataTypes.STRING,
        pages: DataTypes.INTEGER,
        lastPage: DataTypes.INTEGER,
        pagesPerDay: DataTypes.INTEGER,
        totalDaysReading: DataTypes.INTEGER,
        finished: DataTypes.BOOLEAN
    });

    Book.associate = function(models) {
        Book.belongsTo(models.User, {foreignKey: 'userEmail', targetKey: 'email'})
    };

    return Book;
}