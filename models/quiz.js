module.exports = function(sequelize, DataTypes) {
   return sequelize.define(
        'Quiz',
        {
            pregunta: DataTypes.STRING,
            respuesta: DataTypes.STRING,
            indexes:[
                {
                    name: 'preguntas_en_minusculas',
                    fields:[
                        sequelize.fn(
                            'lower',
                            sequelize.col('pregunta')
                        )
                    ]
                }
            ]
        }
    );
};
