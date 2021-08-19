const url = "https://api.themoviedb.org/3/movie/popular?api_key=c8f0e89c2a789ea8a93c6db654ac65d8&language=en-US&page=1"

async function getAPI(popular) {
    try {
        const resultado = await fetch(popular)
        if (resultado.ok) {
            console.log(resultado.status)
            return await resultado.json()
        } else {
            throw new Error('Http error: ${resultado.status}')
        }

    } catch (error) {
        console.error(error)
    }
}

var htmlPeliculas = (movie) => `
<div class = "padre">
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">${movie.original_title}</h5>
            <div class="card-text"> <img data-src=" https://image.tmdb.org/t/p/w300/${movie.poster_path}" alt = "imagen de la película"> </div>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#x_${movie.id}">
            <svg id="i-fullscreen" xmlns="http://www.w3.org/200/svg" viewBox="0 0 32 32" width="18" height="18" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                        <path d="M4 12 L4 4 12 4 M20 4 L28 4 28 12 M4 20 L4 28 12 28 M28 20 L28 28 20 28" />
                    </svg>
                Ver mas
            </button>
            <div class="col-2">
            <div class="modal fade text-white" id="x_${movie.id}" tabindex="-1" aria-labelledby="${movie.id}Label" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content bg-dark ">
                    <div class="modal-header">
                        <h5 class="modal-title text-light" id="${movie.id}Label">${movie.title}</h5>
                        <button type="button" class="btn-close btn-danger" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body bg-dark">
                        <div class="card border-0 mb-3" style="max-width: 540px;">
                        <div class="row g-0">
                           
                            <div class="col-md-8 ">
                            <div class="card-body text-light">
                                <p class="card-text">${movie.overview}</p>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <input id="radio1" type ="radio" name="Valoracion" value="1">
                        <label for ="radio1">★</label>

                        <input id="radio2" type ="radio" name="Valoracion" value="2">
                        <label for ="radio2">★</label>

                        <input id="radio3" type ="radio" name="Valoracion" value="3">
                        <label for ="radio3">★</label>

                        <input id="radio4" type ="radio" name="Valoracion" value="4">
                        <label for ="radio4">★</label>

                        <input id="radio5" type ="radio" name="Valoracion" value="5">
                        <label for ="radio5">★</label>
                        <button type="button" name = "btn_agregar" id="movieform" class="btn btn-warning" data-bs-dismiss="modal" aria-label="Close" onclick="guardarPelicula(${movie.id})"><i class="bi bi-star-fill"></i>Agregar Valoración<i class="bi bi-star-fill"></i></button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>`


var ArrayPelPopular = []

async function renderMovie() {
    let movies = await getAPI(url)
    if (movies) {
        ArrayPelPopular = movies.results
        var renderArray = movies.results.map(htmlPeliculas)
        var renderJoin = renderArray.join(' ')
        let lista = document.querySelector('#renderPopulares')
        lista.innerHTML = renderJoin
    }

    Interseccion()
}

renderMovie();

function guardarPelicula(idPeliculas){
    var Pelicula = ArrayPelPopular.filter(pelicula=>pelicula.id == idPeliculas)
    var jsonPelicula = {}
    jsonPelicula.id = Pelicula[0].id
    jsonPelicula.title = Pelicula[0].original_title
    jsonPelicula.description = Pelicula[0].overview
    jsonPelicula.image = Pelicula[0].poster_path
    jsonPelicula.valoracion = obtenerValoracion()

    localStorage.setItem(Pelicula[0].id, JSON.stringify(jsonPelicula))
    console.log(JSON.parse(localStorage.getItem(Pelicula[0].id)))
}


















