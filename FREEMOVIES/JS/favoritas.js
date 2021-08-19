function ObtenerLocalStorage(){
    var Peliculas = []
    for (let index = 0; index < localStorage.length; index++) {
        Peliculas[index] = JSON.parse(localStorage.getItem(localStorage.key(index)))

        
    }
    return Peliculas;

}

var htmlFavoritas = (Pelis) => `
<div class = "padre">
    <div class="card">
        <div class="card-header">
            <h5 class="card-title" id="title">${Pelis.title}</h5> 
        </div>
        <div class="card-body">
            <div class="row g-0">
                <div class="col-md-4">
                    <div class="card-text"> <img data-src=" https://image.tmdb.org/t/p/w500/${Pelis.image}" alt = "imagen de la película"> </div>
                </div>
                <div class="col-md-8 ">
                    <div class="card-body">
                        <p class="card-text" id="descripcion">${Pelis.description}</p>
                        <p class="card-text" id="valoracion">${Pelis.valoracion}</p>
                        <button type="button" id="eliminar" class="btn btn-warning" data-bs-dismiss="modal" aria-label="Close" onclick="eliminarPelicula(${Pelis.id})"><i class="bi bi-star-fill"></i>Eliminar Valoración<i class="bi bi-star-fill"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`


function renderPeli() {
    let Pelicu = ObtenerLocalStorage()
    if (Pelicu) {
        var renderPeliculas = Pelicu.map(htmlFavoritas)
        var renderJoin = renderPeliculas.join(' ')
        let lista = document.querySelector('#renderFavoritas')
        lista.innerHTML = renderJoin
    }

    Interseccion()
}

renderPeli();


function eliminarPelicula(idPeliculas){
    var local = ObtenerLocalStorage()
    var Pelicula = local.filter(pelicula=>pelicula.id == idPeliculas)
    var jsonPelicula = {}
    jsonPelicula.id = Pelicula[0].id
    jsonPelicula.title = Pelicula[0].original_title
    jsonPelicula.description = Pelicula[0].overview
    jsonPelicula.image = Pelicula[0].poster_path
    jsonPelicula.valoracion = obtenerValoracion()

    localStorage.removeItem(Pelicula[0].id, jsonPelicula)
    console.log(JSON.parse(localStorage.getItem(Pelicula[0].id)))
}
