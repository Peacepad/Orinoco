main(); //appel de la fonction

async function main() {
  //fonction pour avoir tout les oursons dans le tableau donné dans getTeddies
  const articles = await getArticles();
    showArticle(articles);
  
}

function getArticles() {
  //fonction pour récupérer la liste des oursons
  return fetch("http://localhost:3000/api/teddies")
    .then(function (response) {
      return response.json();
    })
    .then(function (articles) {
      return articles;
    })
    .catch(function (error) {
      console.log("error in function getArticles");
    });
}

function showArticle(articles) {
    document.getElementById("product-container").innerHTML = ` ${articles[0].name}`

}
