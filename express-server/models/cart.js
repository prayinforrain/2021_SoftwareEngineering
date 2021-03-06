module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'cart',
		{
			itemID: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			userID: {
				type: DataTypes.STRING(20),
				allowNull: false,
			},
			quantity: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			timestamps: true,
		}
	);
};
