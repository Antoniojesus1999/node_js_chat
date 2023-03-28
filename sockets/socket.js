const { io } = require('../index');
const { comprobarJWT } = require('../helper/jwt');
const{ usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket')

// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');
    console.log(client.handshake.headers);
    //Verificación autenticación
    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);

    //Cliente autenticado
    usuarioConectado(uid);
    console.log('udi ->' + uid );
    client.join(uid);

    //escuchar del cliente el mensaje-personal
    client.on('mensaje-personal',async (payload) =>{
        console.log('payload 1 -> ' + payload);
        await grabarMensaje(payload);
        io.to(payload.para).emit('mensaje-personal',payload)
    });

   




    if(!valido){return client.disconnect();}
    

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
        usuarioDesconectado(uid)
    });

    /*client.on('mensaje', ( payload ) => {
        console.log('Mensaje', payload);

        io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

    });*/


});
