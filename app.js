/* importar as configurações do servidor */
var app = require('./config/server');

/* parametrizar a porta de escuta */
var server = app.listen(80, function() {
    console.log('Servidor online');
});

// socket.io => permitir que o servidor envie req para o cliente (tempo real)
// estamos criando uma inteligência para a nossa aplicação para que na porta 80 
// tanto requisições HTTP quanto requisições websocket só sejam recebidas e interpretadas.
var io = require('socket.io').listen(server);

// definir io como variável global para que seja usada nos controllers sem precisar passar param
app.set('io', io);

/* criar a conexão por websocket */
// on é uma função que permite o lado servidor escutar chamadas do lado cliente e vice versa
// ou seja, o on fica ouvindo pedidos de execução

// já o emit faz um pedido para executar alguma coisa
io.on('connection', function(socket){
    console.log('Usuário conectou');

    socket.on('disconnect', function(){
        console.log('Usuário desconectou');
    });

    socket.on('msgParaServidor', function(data){

        /* diálogo */
        socket.emit(
            'msgParaCliente', 
            { apelido: data.apelido, mensagem: data.mensagem }
        );

        // entregar mensagem para todos os usuários do chat
        // broadcast = enviar msg para todos usuários conectado em um broadcast
        // irá enviar para todos, menos para quem emitiu
        socket.broadcast.emit(
            'msgParaCliente', 
            { apelido: data.apelido, mensagem: data.mensagem }
        );

        /* participantes */
        if(parseInt(data.apelido_atualizado_nos_clientes) == 0) {
            socket.emit(
                'participantesParaCliente', 
                { apelido: data.apelido }
            );
            
            socket.broadcast.emit(
                'participantesParaCliente', 
                { apelido: data.apelido }
            );
        }
    });
});
