module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'itemGenre',
		{
			itemID: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            genreID: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
		},
		{
			timestamps: false,
		}
	);
};
