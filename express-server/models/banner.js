module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'banner',
		{
			title: {
				type: DataTypes.STRING(30),
				allowNull: false,
			},
			path: {
				type: DataTypes.BLOB('long'),
				allowNull: false,
			},
			start: {
				type: DataTypes.STRING(10),
				allowNull: false,
			},
			end: {
				type: DataTypes.STRING(10),
				allowNull: false,
			},
		},
		{
			timestamps: true,
		}
	);
};
