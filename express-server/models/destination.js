module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "destination",
        {
            postcode: {
                type: DataTypes.STRING(6),
                allowNull: false,
            },
            roadAddress: {
                type: DataTypes.STRING(60),
                allowNull: false,
            },
            jibunAddress1: {
                type: DataTypes.STRING(60),
                allowNull: false,
            },
            jibunAddress2: {
                type: DataTypes.STRING(60),
                allowNull: false,
            },
            extraAddress: {
                type: DataTypes.STRING(60),
                allowNull: false,
            },
            addressOwner: {
                type: DataTypes.INTEGER(),
                allowNull: false,
            },
        },
        {
            timestamps: true,
        }
    );
};
