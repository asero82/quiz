// GET /login --Formulario de login
exports.new = function(req, res){
  var errors = req.session.errors || {};
  req.session.errors = {};
  
  res.render('session/new', {errors: errors});
};

// POST /login -- Crear la session
exports.create = function(req, res){
  var login = req.body.login;
  var password = req.body.password;
  
  var userController = require('./user_controller');
  
  userController.autenticar(login, password, function(error, user){
    if(error){
     req.session.errors = [{message: "Se ha producido un error: " + error}];
     res.redirect('/login');
     return;
    }
    
    // Crear req.session.user y guardar campos id y username
    // La sesión se define por la existencia de: req.session.user
    
    req.session.user = {id: user.id, username: user.username};
    console.log(req.session);
    res.redirect(req.session.redir.toString());
  });
};


// DELETE /login -- Destruir la session
exports.destroy = function(req, res){
  delete req.session.user;
  res.redirect(req.session.redir.toString()); // Redirijo a path anterior a logout
};