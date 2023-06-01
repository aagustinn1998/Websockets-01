const socket = io ();


socket.emit('message', 'Hola muchachos');

socket.on('evento_solo_individual', data=>{
    console.log(data)
})

socket.on('evento_todos_menos_actual', data=>{
    console.log(data)
})

socket.on('evento_todos', data=>{
    console.log(data)
})
