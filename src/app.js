import express  from 'express';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.routes.js';
import __dirname from './utils.js';

const app = express ();

app.use(express.static(`${__dirname}/public`));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);

const server = app.listen(8081, ()=> console.log("Server running puerto 8081"));

const io = new Server (server);

// io.on('connection', socket=>{
//     console.log('Nuevo cliente conectado');

//     socket.on('message', data=>{
//         console.log(data);
//     })

//     socket.emit('evento_socket_individual', 'este mensaje solo lo recibe el socket');

//     socket.broadcast.emit('evento_todos_menos_actual', 'Lo van a ver todos los clientes menos el actual')
    
//     io.emit('evento_todos', 'Lo recibirán todos los clientes')

// });



io.on('connection', socket=>{
    console.log('Conectado');
    socket.on('message1', data=>{
        io.emit('log', data)
    })
})

// Emitir eventos de actualización de la lista de productos

io.on("connection", (socket) => { socket.on("productAdded", (producto) => 
    { io.emit("productAdded", producto); });
    socket.on("productDeleted", (productoId) => { io.emit("productDeleted", productoId); 
    });
});
