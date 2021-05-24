module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'notice',
		{
			title: {
				type: DataTypes.STRING(30),
				allowNull: false,
			},
			contents: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
		},
		{
			timestamps: true,
		}
	);
};
