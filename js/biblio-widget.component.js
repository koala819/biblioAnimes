let maSuperMemoireJSON;

class StarWarsWidgetElement extends HTMLElement {
    
    constructor() {
        super();
        this.count3Letters = 0;
        
        this.attachShadow({mode: 'open'});
        
        this.shadowRoot.innerHTML = `
        <style>
            img {
                width: 10%;
            }
            
        </style>
        <div class="biblio-widget">
        <p>
        <div id="pictureAnime"></div>
        <span id="charactere">Blabla</span>
        </p>
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
                    maSuperMemoireJSON = res;
                    for (let i=0; i<res.results.length; i++) {
                        //console.log("picture "+res.results[i].image_url);
                        //console.log("title "+res.results[i].image_url);
                        elem[i] = document.getElementById('Suggestion').innerHTML += '<option id="'+res.results[i].mal_id+'" value ="'+res.results[i].title+'">';
                    }
                })
            //Attend que la condition de 3 lettres soient rentrées pour être éxécuté    
            if (this.count3Letters ) {
               recupId();
            }
            }
        });
        this.render();
    }

    connectedCallback() {
        this.fetchAPIData();
    }
    
    render() {
        this.shadowRoot.getElementById('charactere').innerHTML ="bonjour"
    }
}
window.customElements.define('biblio-widget', StarWarsWidgetElement)

 const recupId = function (){
    //ev.target.value : retourne le nom de l'animé
    document.getElementById('mySearch').addEventListener('change', function (ev) {
        /*boucle pour trouver l'id
        test où se trouve nom de l'animé
        retourne la valeur de l'index
        donne la valeur de l'id correspondant*/
        for (let i=0; i<maSuperMemoireJSON.results.length; i++) {
            if (maSuperMemoireJSON.results[i].title === ev.target.value ) {
                console.log("found with i="+i)
                console.log("is it the id ?? "+ maSuperMemoireJSON.results[i].mal_id)
            }
        }
    })
} 