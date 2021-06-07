module.exports = (sequelize, DataTypes) => {
	const Items = sequelize.define(
		'item',
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
				allowNull: false,
			},
			fee: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			supply: {
				type: DataTypes.STRING(30),
				allowNull: false,
			},
			detail: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			cover: {
				type: DataTypes.STRING(300),
				allowNull: false,
			},
			released: {
				type: DataTypes.STRING(30),
				allowNull: false,
			},
			available: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
		},
		{
			timestamps: true,
		}
	);
	return Items;
};
