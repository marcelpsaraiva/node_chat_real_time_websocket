module.exports = function(application){
    application.get('/', function(req, res){
        // res.render('index') // index.ejs
        application.app.controllers.index.home(application, req, res);
    });
}