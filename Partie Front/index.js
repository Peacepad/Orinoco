main(); //appel de la fonction

async function main() {
  //fonction pour avoir tout les oursons dans le tableau donné dans getTeddies
  const articles = await getArticles();
  console.log(articles);
  for (article of articles) {
    showArticle(article);
  }
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
      console.log("error in function getTeddies");
    });
}

function showArticle(article) {
  document.getElementById("product-container").innerHTML += `
  <a href="pages/${article._id}.html">
  <div class="product">
    <div class="product__image">
      <img src="${article.imageUrl}" alt="Image de l'ours ${article.name}"/>
    </div>
    <div class="product__content">

      <div class="product__price">${article.price}<sup>€</sup></div>

      <div class="product__name">${article.name}</div>

    </div>
  </div>
</a>`;

}
