module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'Comment',
    {
      texto: {
        type: DataTypes.STRING,
        validate: {notEmpty: "-> Falta Comentario"}
      },
      publicado:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }
  );
}
