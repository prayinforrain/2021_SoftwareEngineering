module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "item",
        {
            album: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            singer: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            supply: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            detail: {
                type: DataTypes.STRING(20000),
                allowNull: false,
            },
            cover: {
                type: DataTypes.STRING(300),
                allowNull: false,
            }
        },
        {
            timestamps: true,
        }
    );
};
