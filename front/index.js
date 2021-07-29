let productInLocalStorage = JSON.parse(localStorage.getItem("produit"));

// Fonction pour récupérer la liste des oursons---------------------------------------------------------------------------

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
      console.log("erreur au niveau de la requête");
    });
}

// Fonction qui execute displayTeddies autant de fois qu'il y a d'ours dans le tableau reçu-------------------------------

async function main() {
  const teddies = await getTeddies();
  for (teddy of teddies) {
    displayTeddies();
  }
}

// Fonction qui affiche les ours en fonction du tableau reçu-------------------------------------------------------------

function displayTeddies() {
  document.getElementById("product-container").innerHTML += `
  <a href="pages/product.html?id=${teddy._id}">
  <div class="product">
    <div class="product__image">
      <img src="${teddy.imageUrl}" alt="Image de l'ours ${teddy.name}"/>
    </div>
    <div class="product__content">
      <div class="product__name"><span class="classic">${teddy.name}</span></div>
      <div class="product__price">${teddy.price / 100}€</div>  
    </div>
  </div>
</a>`;
}

// Fonction pour afficher le nombre d'article présent dans le panier--------------------------------------------------------

function numberProductInLocalStorage() {
  if (
    localStorage.getItem("produit") === null ||
    productInLocalStorage.length == 0
  ) {
    console.log("0");
  } else {
    nb = 0;
    for (let m = 0; m < productInLocalStorage.length; m++) {
      nb++;
    }
    document.querySelector(".number-cart").style.right = "32px";
    if(nb > 9) {document.querySelector(".number-cart").style.right = "29px";};
    document.querySelector(".number-cart").innerText = `${nb}`;
  }
}


// Appel des fonctions-----------------------------------------------------------------------------------------------------

main();
numberProductInLocalStorage()
