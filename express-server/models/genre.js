module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'genre',
		{
			name: {
				type: DataTypes.STRING(30),
				allowNull: false,
			},
		},
		{
			timestamps: false,
		}
	);
};

//insert into musicstore.genres (name) value ('발라드'), ('댄스'), ('랩/힙합'), ('R&B/Soul'), ('인디'), ('록/메탈'), ('트로트'), ('포크/블루스');
