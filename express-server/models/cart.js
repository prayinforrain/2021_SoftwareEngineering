module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'cart',
		{
			itemID: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            userID: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
		},
		{
			timestamps: true,
		}
	);
};
