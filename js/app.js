
document.querySelector('#mySearch').addEventListener('input', function () {
    if (this.value.length == 3) {
        const url = `https://api.jikan.moe/v3/anime/${this.value}`;
        fetch (url).then(response => 
            response.json().then((data) => {
                console.log(data);
                console.log("picture "+data.image_url);
                let image = `${data.image_url}`;
                console.log("title "+data.title);
                let title = `${data.title}`;
                console.log("nb episodes "+data.episodes);
                let episodes = `${data.episodes}`;
                document.getElementById('pictureAnime').src = image;
                document.querySelector('#titleAnime').innerHTML = title;
                document.querySelector('#nbEpisodes').innerHTML = episodes;
            })

    );
        }
});