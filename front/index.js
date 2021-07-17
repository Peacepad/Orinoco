//fonction pour récupérer la liste des oursons
function getTeddies() {
  return fetch("http://localhost:3000/api/teddies")
    .then(function (response) {
      console.log("ok");
      return response.json();
    })
    .then(function (teddies) {
      return teddies;
    })
    .catch(function (error) {
      console.log("error in function getTeddies");
    });
}

//

async function main() {
  const teddies = await getTeddies();
  for (teddy of teddies) {
    displayTeddies();
  }
}

function displayTeddies() {
  document.getElementById("product-container").innerHTML += `
  <a href="pages/product.html?id=${teddy._id}">
  <div class="product">
    <div class="product__image">
      <img src="${teddy.imageUrl}" alt="Image de l'ours ${teddy.name}"/>
    </div>
    <div class="product__content">
      <div class="product__name">${teddy.name}</div>
      <div class="product__price">${teddy.price / 100}€</div>  
    </div>
  </div>
</a>`;
}

//Appel de la fonction
main();
