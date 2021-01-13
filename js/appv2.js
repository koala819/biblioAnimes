
document.getElementById('mySearch').addEventListener('input', function () {
    if (this.value.length == 3) {
        fetch (`https://api.jikan.moe/v3/search/anime?q=${this.value}`)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                for (let i=0; i<res.results.length; i++) {
                    //console.log("picture "+res.results[i].image_url);
                    console.log("title "+res.results[i].image_url);
                    document.getElementById('Suggestion').innerHTML += '<option value ="'+res.results[i].title+'">';
                }
                whichSelected();
                
                //document.querySelector('#Suggestion').innerHTML = '<a class="dropdown-item" href="#">' + viewTitle + '</a>';
               /*  let image = `${data.image_url}`;
                console.log("title "+data.title);
                let title = `${data.title}`;
                console.log("nb episodes "+data.episodes);
                let episodes = `${data.episodes}`;
                document.getElementById('pictureAnime').src = image;
                document.querySelector('#titleAnime').innerHTML = title;
                document.querySelector('#nbEpisodes').innerHTML = episodes; */
            })

    }
});


function whichSelected() {
    document.getElementById('mySearch').addEventListener('input', function (ev) {
        const saisie = document.querySelector( "#Suggestion" ).value = ev.target.value;
        console.log("resultat du click :: " + saisie);
    })
  }