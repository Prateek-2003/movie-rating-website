
const API_KEY = 'api_key=47c8c04805c3dd5707b20d6e88edae32';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const BT_URL = '/discover/movie?primary_release_year=2010&sort_by=vote_average.desc&';
const API_URL2 = BASE_URL + BT_URL + API_KEY;
const searchURL = BASE_URL + '/search/movie?' + API_KEY;

const  genres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]

  const tagsEl = document.getElementById('featured-content');

  let selectedGenre = []
  setGenre();
  function setGenre(){
     tagsEl.innerHTML= '';
     genres.forEach(genre => {
        const t = document.createElement('div');
        t.classList.add('tag');
        t.id=genre.id;
        t.innerText=genre.name;
        t.addEventListener('click',()=>{
           if(selectedGenre.length == 0){
            selectedGenre.push(genre.id);
           }else{
            if(selectedGenre.includes(genre.id)){
                selectedGenre.forEach((id,idx)=>{
                    if(id == genre.id){
                        selectedGenre.splice(idx,1);
                    }
                })
            }else{
                selectedGenre.push(genre.id);
            }
           }
           getNewMovies(API_URL+'&with_genres='+encodeURI(selectedGenre.join(',')))
           highlightSelection()
        })
        tagsEl.append(t);
     })
  }
 
  function highlightSelection(){
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag=>{
        tag.classList.remove('highlight')
    })
     clearBtn()
    if(selectedGenre.length != 0){
    selectedGenre.forEach(id=>{
      const hightlightedTag = document.getElementById(id);
      hightlightedTag.classList.add('highlight');
               })
}
}

function clearBtn(){
    let clearBtn = document.getElementById('clear');
    if(clearBtn){
    clearBtn.classList.add('highlight');
    }else{
    let clear = document.createElement('div');
    clear.classList.add('tag','highlight');
    clear.id = 'clear';
    clear.innerText='clear x';
    clear.addEventListener('click',()=>{
        selectedGenre=[];
        setGenre();
        getNewMovies(API_URL);
    })
    tagsEl.append(clear);
}
}

const newRelease = document.getElementById('movie-list-container');
const movieList = document.getElementsByClassName('movie-list');
getNewMovies(API_URL);
function getNewMovies(url){
    fetch(url).then(res => res.json()).then(data  => {
        //console.log(data);
       if(data.results.length!==0){
        showNewMovies(data.results);
       }else{
        newRelease.innerHTML='<h1>No Results Found</h1>'
       }
      
    });
};
function showNewMovies(data){
      newRelease.innerHTML = '';
  
     data.forEach(movieList => {
         const {title,poster_path, overview,vote_average} = movieList;
         const movieListItem = document.createElement('div');
         movieListItem.classList.add('movie-list-wrapper');
         movieListItem.innerHTML = ` <div class="movie-list">
         <div class="movie-list-item">
             <img class="movie-list-item-img" src="${ IMG_URL+poster_path}" >
             <span class="movie-list-item-title">${title}</span>
             <p class="movie-list-item-desc">${overview}</p>
             <span class=" vote ${getColor(vote_average)}">${vote_average}</span>
             </div>
         </div>`
    
     newRelease.appendChild(movieListItem);
  });
};
function getColor(vote){
       if(vote>=7.5){
           return 'green'
       }else if(vote >= 5.5){
           return 'orange'
       }else{
           return 'red'
       }
    }

    const form = document.getElementById('form');
    const search = document.getElementById('search');

    form.addEventListener('submit',(e)=>{
      e.preventDefault();

      const searchTerm = search.value;
      if(searchTerm){
        getNewMovies(searchURL+'&query='+searchTerm)
      }else{
        getNewMovies(API_URL);
      }
    })

const arrows = document.querySelectorAll(".arrow");
const movieLists = document.querySelectorAll(".movie-list");

arrows.forEach((arrow,i) => {
    const itemNumber = movieLists[i].querySelectorAll("img").length;
    let clickCounter = 0;
    arrow.addEventListener("click",()=>{
        clickCounter++;
        if(itemNumber - (3 + clickCounter) >= 0){
        movieLists[i].style.transform = `translateX(${movieLists[i].computedStyleMap().get("transform")[0].x.value - 300}px)`;
        }else{
            movieLists[i].style.transform = "translateX(0)";
            clickCounter = 0;
        }
    });
});

