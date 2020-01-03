const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require('../utils/utilidades');

const usuarios = new Usuarios();


io.on('connection', (client) => {

    client.on('entrarChat', (data, callback) => {


        if( !data.nombre || !data.sala){

            return callback({
                error: true,
                mensaje: 'El nombre/sala es necesario'
            });
        }

        client.join(data.sala);

        usuarios.agregarPersona( client.id, data.nombre, data.sala );

        client.broadcast.to(data.sala).emit('listaPersonas', usuarios.getPersonasPorSala(data.sala) );

        callback(usuarios.getPersonasPorSala(data.sala));

    });

    client.on('crearMensaje', (data) => { 

        let persona = usuarios.getPerson(client.id);

       let mensaje = crearMensaje( persona.nombre, data.mensaje)
       client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);


    });

    client.on('enviarMensaje', (data) => { 

        let persona = usuarios.getPerson(client.id);

        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.emit('crearMensaje', mensaje);

     });

    client.on('disconnect', () => {

       let usuarioBorrado = usuarios.borrarPrsona(client.id)
       
       console.log( usuarioBorrado )

       client.broadcast.to(usuarioBorrado.sala).emit('crearMensaje', crearMensaje('Admin', `Usuario borrado ${usuarioBorrado.nombre} salio`) );
       client.broadcast.to(usuarioBorrado.sala).emit('listaPersonas', usuarios.getPersonasPorSala() );

    });

    // mensajes privados
    client.on('mensajePrivado', data => { 

        let persona = usuarios.getPerson(client.id);
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje( persona.nombre, data.mensaje ));


     });
   
});