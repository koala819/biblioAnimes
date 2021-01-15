

let maSuperMemoireJSON;
let monID;
let count3Letters = 0;


document.getElementById('mySearch').addEventListener('input', function () {
    if (this.value.length == 3) {
    count3Letters = 1;
    fetch (`https://api.jikan.moe/v3/search/anime?q=${this.value}`)
        .then(res => res.json())
        .then(res => {
            maSuperMemoireJSON = res;
            for (let i=0; i<res.results.length; i++) {
                //console.log("picture "+res.results[i].image_url);
                //console.log("title "+res.results[i].image_url);
                document.getElementById('Suggestion').innerHTML += '<option id="'+res.results[i].mal_id+'" value ="'+res.results[i].title+'">';
            }
        })
    //Attend que la condition de 3 lettres soient rentrées pour être éxécuté    
    if (count3Letters ) { recupId(); }
    }
});




function recupId () {
    //ev.target.value : retourne le nom de l'animé
    document.getElementById('mySearch').addEventListener('change', function (ev) {
        /*boucle pour trouver l'id
        test où se trouve nom de l'animé
        retourne la valeur de l'index
        donne la valeur de l'id correspondant*/
        for (let i=0; i<maSuperMemoireJSON.results.length; i++) {
            if (maSuperMemoireJSON.results[i].title === ev.target.value ) {
                monID = maSuperMemoireJSON.results[i].mal_id;
            }
        }
        render();
    })
}

function render() {
    fetch (`https://api.jikan.moe/v3/anime/${monID}`)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                document.getElementById('pictureAnime').src = `${res.image_url}`;
                document.getElementById('titleAnime').textContent = `${res.title}`;
                document.getElementById('score').textContent = `${res.score}`;
                document.getElementById('nbEpisodes').textContent = `${res.episodes}`;
                document.getElementById('titleAnimePopUp').textContent = `${res.title}`;
                document.getElementById('sourcePopUp').textContent = `${res.source}`;
                document.getElementById('durationPopUp').textContent = `${res.duration}`;
                document.getElementById('synopsisPopUp').textContent = `${res.synopsis}`;
                for (let i=0; i<res.genres.length; i++) {
                    document.getElementById('genrePopUp').innerHTML += '<span class="badge badge-info">'+res.genres[i].name+'</span>&nbsp;';
                }

                
                
            })
            
    
}