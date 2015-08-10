var models = require ('../models/models.js');

//GET /quizes/:id/comments/new
exports.new = function(req, res){
  res.render(
    'comments/new.ejs',
    {
      quizId: req.params.quizId,
      errors: []
    }
  );
};

//POST /quizes/:id/comments
exports.create = function (req, res){
  var comment = models.Comment.build({
    texto: req.body.comment.texto,
    QuizId: req.params.quizId
  });

console.log(JSON.stringify(comment));

  comment
  .validate()
  .then(
    function (err){
      if(err){
        res.render(
          'comments/new.ejs',
          {
            comment: comment,
            quizId: req.params.quizId,
            errors: err.errors
          }
        );
      } else {
        comment
        .save({fields: ["texto", "QuizId"]})
        .then(
          function (){
            res.redirect('/quizes/' + req.params.quizId);
          }
        );
      }
    }
  ).catch(function(error){next(error)});
}
