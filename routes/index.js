var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
	  res.render('index', { title: 'Bienvenido a Quiz' , errors: []});
});

// Autoload de comandos con :quizId
router.param('quizId', quizController.load); // Autoload: quizId

// Rutas de session
router.get('/login', sessionController.new);
router.post('/login', sessionController.create);
router.delete('/login', sessionController.destroy);

// Rutas quizes
router.get('/quizes/:search(\\D)?', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);
router.post('/quizes/create', quizController.create);
router.get('/quizes/new', quizController.new);
router.put('/quizes/:quizId(\\d+)', quizController.update);
router.delete('/quizes/:quizId(\\d+)', quizController.destroy);

router.get('/author', function(req, res, next){
	res.render('author', {errors: []});
})

// Rutas Comentarios
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);

module.exports = router;
