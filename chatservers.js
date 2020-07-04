var http = require('http').Server(),
    io = require('socket.io')(http),
    MongoClient = require('mongodb').MongoClient,
    url = 'mongodb://localhost:27017',

    dbName = 'message';


io.on('connection', socket => {
    socket.on('enviarMensaje', (msg) => {
        MongoClient.connect(url, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }, (err, client) => {
            const db = client.db(dbName);
            db.collection('chat').insert({
                "de": msg.de,
                "para": msg.para,
                "msg": msg.msg
            });
            io.emit('recibirMensaje', msg);

        });
    });
    socket.on('chatHistory', () => {
        MongoClient.connect(url, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }, (err, client) => {
            const db = client.db(dbName);
            db.collection('chat').find({}).toArray((err, msgs) => {
                io.emit('chatHistory', msgs);
            });
        });
    });
});
http.listen(3001, () => {
    console.log('Escuchando peticiones por el puerto 3001, LISTO');
});