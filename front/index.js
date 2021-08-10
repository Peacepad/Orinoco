let productInLocalStorage = JSON.parse(localStorage.getItem("produit"));

// Fonction pour récupérer la liste des oursons---------------------------------------------------------------------------

function getTeddies() {
  return fetch("http://localhost:3000/api/teddies")
    .then(function (response) {
      
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

async function makeALoop() {
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
      <div class="showarticle">Afficher l'article</div>
    </div>
    <div class="product__content">
      <div class="product__name"><span class="classic">${teddy.name}</span></div>
      <div class="product__price">${teddy.price / 100}€</div>  
    </div>
  </div>
</a>`;
}

// Fonction pour afficher le nombre d'article présent dans le panier--------------------------------------------------------

function showHowMuchProductInLocalStorage() {
  if (
    localStorage.getItem("produit") === null ||
    productInLocalStorage.length == 0
  ) {

  } else {
        document.querySelector(".number-cart").style.right = "32px";
    if (productInLocalStorage.length > 9) {
      document.querySelector(".number-cart").style.right = "29px";
    }
    document.querySelector(".number-cart").innerText = `${productInLocalStorage.length}`;
  }
}


// Appel des fonctions-----------------------------------------------------------------------------------------------------

makeALoop();
showHowMuchProductInLocalStorage()
