const APIKEY = '4c48e10ab72d4baa8feff20c49cac921'
// Querying main tag


window.addEventListener('load', data => {
    updateNews()
})


async function updateNews(){
    const res = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${APIKEY}`)
    const json = await res.json()
    const main = document.querySelector("main")
    
    main.innerHTML = json.articles.map(createArticle).join('\n')
}

function createArticle(article){

    return `
        <div class= 'article'> 
            <a href = "${article.url}">
                <h2>${article.title}</h2>
                <image src = "${article.urlToImage}">
                <p>"${article.description}"</p>
            </a>
        </div>
    `
}