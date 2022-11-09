const URL_MOVIE = 'https://japceibal.github.io/japflix_api/movies-data.json'
let base_dato = ""
let genres = []

function showRatingStars(ratingNumber){ //Función que representa en estrellas amarillas el promedio de puntuaciones de los usuarios.
    let ratingStarsToAppendChecked = `<span class="fa fa-star checked"></span>`;

    let ratingStarsToAppendNotChecked = `<span class="fa fa-star"></span>`;

    let rating = Math.round(ratingNumber / 2)

    let uncheckedStars = 5 - rating ;

  
    if (rating > 0){
        return ratingStarsToAppendChecked.repeat(rating) + ratingStarsToAppendNotChecked.repeat(uncheckedStars);
    }else{
        return ratingStarsToAppendNotChecked.repeat(5)
    };

};

function mostrarGeneros(arr) {
    let generosPeli = arr.genres
    let htmlContentToAppend= "";       
            
            for(let j=0; j <generosPeli.length; j++){
            let genero = generosPeli[j];
            htmlContentToAppend += `${genero.name} <br>`}
            return htmlContentToAppend;
}


function mostrarPeliculas(arr,i){ //Función que recibe un array y un número. El array que recibe es el que contiene la información de la coincidencia que se encontró, con su respectiva posición dentro del JSON.
    //Se agrega al HTML la información de la película y la posibilidad de clickear y ver el canvas con más info.

    let htmlToAppend = "";
    let year = arr.release_date.slice(0,4)
        htmlToAppend =`
        <button type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop${i}" aria-controls="offcanvasTop${i}">
              <li class="list-group-item text-light bg-dark d-block">${arr.title} 
              ${showRatingStars(arr.vote_average)}
              <p>${arr.tagline}</p></li></button>
              <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop${i}" aria-labelledby="offcanvasTopLabel${i}">
                <div class="offcanvas-header">
                  <h5 class="offcanvas-title" id="offcanvasTopLabel${i}">${arr.title} </h5>
                  <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                ${arr.overview}
                </div><hr>
                <div class="offcanvas-body">${mostrarGeneros(arr)}</div>

        `

        htmlToAppend +=`<div class="dropdown col align-self-end">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              More
            </button>
            <ul class="dropdown-menu">
              <li><p >Year:   ${year}</p></li>
              <li><p >runtime: ${arr.runtime} mins</p></li>
              <li><p >Budget: ${arr.budget}</p></li>
              <li><p >Revenue: ${arr.revenue}</p></li>
            </ul>
          </div>`

    document.getElementById("listaPelis").innerHTML += htmlToAppend;
};

fetch(URL_MOVIE) //Fetchea la información de la API.

.then(response=>response.json())

.then(data=>{ 

document.getElementById("btnBuscar").addEventListener("click", ()=>{  //Evento que ejecuta una función cuando usuario apretó el botón submit.

        let boton = document.getElementById("inputBuscar").value.toLowerCase();   

    

        if (boton){
            for (let i=0; i < data.length; i++){


                let coincide_genero = false
    
                for (let j=0; j < data[i].genres.length; j++){
    
                    if (data[i].genres[j].name.toLowerCase().includes(boton)){
    
                        coincide_genero = true;
                    }
                }
    
                if (data[i].title.toLowerCase().includes(boton) || (data[i].tagline.toLowerCase().includes(boton)) || (data[i].overview.toLowerCase().includes(boton)) || coincide_genero){
    
                    mostrarPeliculas(data[i],i);  
    
                }; 
    
            };
        }else{
            console.log("Usuario no ingresó nada.")
        }
        

    });


});

