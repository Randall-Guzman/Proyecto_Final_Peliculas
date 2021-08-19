const link = "https://api.themoviedb.org/3/movie/upcoming?api_key=c8f0e89c2a789ea8a93c6db654ac65d8&language=en-US&page=1"


async function getAPI(proxima){
    try {
        const resultado = await fetch(proxima)
        if(resultado.ok){
            console.log(resultado.status)
            return await resultado.json()
        }else{
            throw new Error ('Http error: ${resultado.status}')}
    }catch (error){
        console.error(error)
    }
}

var htmlProximas = (movie) =>`
<div class = "madre">
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">${movie.original_title}</h5>
            <p class="card-text"> <img data-src=" https://image.tmdb.org/t/p/w300/${movie.poster_path}"> </p>
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
                                <p class="card-text"><small class="text-muted"><span class="fw-bold">Fecha de salida: </span>${movie.release_date}</small></p>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <input id="radio1" type ="radio" name="Valoracion" value="">
                        <label for ="radio1">★</label>

                        <input id="radio2" type ="radio" name="Valoracion" value="">
                        <label for ="radio2">★</label>

                        <input id="radio3" type ="radio" name="Valoracion" value="">
                        <label for ="radio3">★</label>

                        <input id="radio4" type ="radio" name="Valoracion" value="">
                        <label for ="radio4">★</label>

                        <input id="radio5" type ="radio" name="Valoracion" value="">
                        <label for ="radio5">★</label>
                        <button type="button" class="btn btn-warning" data-bs-dismiss="modal" aria-label="Close" onclick="guardarPeliculaP(${movie.id})"><i class="bi bi-star-fill"></i>Agregar Valoración<i class="bi bi-star-fill"></i></button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>`



var ArrayPelProxima = []

async function renderProxima() {
    let peli = await getAPI(link)
    if (peli) {
        ArrayPelProxima = peli.results
        var renderArray = peli.results.map(htmlProximas)
        var renderJoin = renderArray.join(' ')
        let lista = document.querySelector('#renderProximas')
        lista.innerHTML = renderJoin
    }
    Interseccion()

}

renderProxima();

function guardarPeliculaP(idPeliculas){
    var Pelicula = ArrayPelProxima.filter(pelicula=>pelicula.id == idPeliculas)
    var jsonPelicula = {}
    jsonPelicula.id = Pelicula[0].id
    jsonPelicula.title = Pelicula[0].original_title
    jsonPelicula.description = Pelicula[0].overview
    jsonPelicula.image = Pelicula[0].poster_path
    jsonPelicula.valoracion = obtenerValoracion()

    localStorage.setItem(Pelicula[0].id, JSON.stringify(jsonPelicula))
    console.log(JSON.parse(localStorage.getItem(Pelicula[0].id)))
}


