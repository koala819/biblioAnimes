let maSuperMemoireJSON;
let monID;

class StarWarsWidgetElement extends HTMLElement {
    
    constructor() {
        super();
        this.attachShadow({mode: 'open'})
        this.count3Letters = 0;
    
    this.shadowRoot.innerHTML = `
    <div class="biblio-widget row">
    <!-- Element dynamique -->
    <div class="col-sm-6 col-md-4 col-xl-2" id="myAnime">
        <div class="card mb-4 box-shadow">
            <div class="card-body">
                <img class="card-img" alt="Fate Zero" src="https://cdn.myanimelist.net/images/anime/2/73249.jpg" id="pictureAnime">

                <p class="h6" id ="titleAnime">
                    
                    <span class="badge badge-info">8.6</span>
                </p>

                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-outline-secondary" data-toggle="modal" data-target="#modal-detail-anime">
                            Info
                        </button>
                    </div>

                    <small class="text-muted" id="nbEpisodes">13 Ep.</small>
                </div>
            </div>
        </div>
    </div>
    <!-- /Element dynamique -->
</div>
        `
    }

    fetchAPIData() {
        document.getElementById('mySearch').addEventListener('input', function () {
        if (this.value.length == 3) {
            this.count3Letters = 1;
            fetch (`https://api.jikan.moe/v3/search/anime?q=${this.value}`)
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    maSuperMemoireJSON = res;
                    for (let i=0; i<res.results.length; i++) {
                        //console.log("picture "+res.results[i].image_url);
                        //console.log("title "+res.results[i].image_url);
                        document.getElementById('Suggestion').innerHTML += '<option id="'+res.results[i].mal_id+'" value ="'+res.results[i].title+'">';
                    }
                    
                })
                recupId();
            }
            
    })
    this.render()
    }
    connectedCallback() {
        this.fetchAPIData();
    }

    render() {
        this.shadowRoot.querySelector('#titleAnime').textContent = "pouet "

    }

}

const recupId = function (){
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
        const biblio = new BiblioWidgetElement();
        biblio.render();
    })
}

window.customElements.define('biblio-widget', StarWarsWidgetElement)