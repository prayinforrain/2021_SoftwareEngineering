module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'wishlist',
		{
			itemID: {
				type: DataTypes.INTEGER,
				allowNull: false,
				unique: true,
			},
			userID: {
				type: DataTypes.STRING(20),
				allowNull: false,
			},
		},
		{
			timestamps: true,
		}
	);
};
