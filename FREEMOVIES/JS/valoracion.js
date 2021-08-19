function obtenerValoracion(){
    let valoracion = document.querySelector('input[name=Valoracion]:checked')
    if ('input[value="1"]:checked'){
        return "5 estrellas";
    }
    if ('input[value="2"]:checked'){
        return "4 estrellas";
    }
    if ('input[value="3"]:checked'){
        return "3 estrellas";
    }
    if ('input[value="4"]:checked'){
        return "2 estrellas";
    }
    if ('input[value="5"]:checked'){
        return "1 estrella";
    }  
}

// var contador
// function calificar(item){
//     console.log(item)
//     contador = item.id[0]
//     let nombre = item.id.substring(1)
//     for (let i=0; i<5; i++){
//         if(i<contador){
//             document.getElementById((i+1)=nombre).style.color="orange"
//         }else{
//             document.getElementById((i+1)=nombre).style.color="black"
//         }
//     }
// }

// function guardarPeliculaP(){
//     alert ("Gracias por calificar nuestro canal, nos diste "+contador+" estrellas")
// }



