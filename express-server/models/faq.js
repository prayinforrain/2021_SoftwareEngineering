module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'faq',
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
