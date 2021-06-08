module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'inquiry',
		{
            productID: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            orderID: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            customerID: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
			title: {
				type: DataTypes.STRING(30),
				allowNull: false,
			},
			detail: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
            answer: {
				type: DataTypes.TEXT,
				allowNull: false,
                defaultValue: ""
			},
		},
		{
			timestamps: true,
		}
	);
};
//alter table musicstore.inquiries alter answer set default '';
