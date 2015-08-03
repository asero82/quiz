var path = require('path');

//cargar el Model ORM
var Sequelize = require('sequelize');

//Usar BBDD SQLite:
var sequelize = new Sequelize(
                        null, 
                        null, 
                        null,
                        {
                            dialect: "sqlite", 
                            storage: "quiz.sqlite"
                        }
               );
               
// Importar la definición de la tabla quiz
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

exports.Quiz = Quiz; //Exporta definición de la tabla quiz

// sequelize.sync() crea e inicializa la tabla de preguntas de la BD
sequelize.sync().success(function(){
    //Success(..) ejecuta el manejador una vez creada la tabla
    Quiz.count().success(function(count){
        if (count === 0) { // la tabla se inicializa solo si está vacia
                        Quiz.create({pregunta: 'Capital de Italia',
                                     respuesta: 'Roma'
                                    })
                        .success(function(){console.log('Base de datos inicializada')});
        }
    })
})               
