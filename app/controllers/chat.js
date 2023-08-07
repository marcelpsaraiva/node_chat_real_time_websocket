module.exports.iniciaChat = function(application, req, res) {

    var dadosForm = req.body;
    // console.log(dadosForm);

    req.assert('apelido', 'Nome ou apelido obrigatório').notEmpty();
    req.assert('apelido', 'Nome ou apelido deve conter entre 3 e 15 caracteres').len(3, 15);

    var errors = req.validationErrors();

    if (errors) {
        // res.send("Existem erros no formulário");
        res.render("index", {validacao: errors});
        return;
    }

    application.get('io').emit(
        'msgParaCliente',
        {apelido: dadosForm.apelido, mensagem: ' acabou de entrar no chat'}
    );

    res.render('chat', {dadosForm: dadosForm}); // chat.ejs
}