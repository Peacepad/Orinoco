let productInLocalStorage = JSON.parse(localStorage.getItem("produit"));

//console.log(productInLocalStorage);
const displayArea = document.querySelector(".basket-product__container");

function displayArticleInLocalStorage() {
  for (i = 0; i < productInLocalStorage.length; i++) {
    displayArea.innerHTML += `
      <div class="basket-product">
          <div class="basket-product__name">${
            productInLocalStorage[i].teddyName
          }</div>
          <div class="basket-product__couleur">${
            productInLocalStorage[i].teddyColor
          }</div>
          <div class="basket-product__prix">${
            productInLocalStorage[i].teddyPrice / 100
          }€</div>
          <div class="basket-product__delete"><button class="delete" id="delete${[
            i,
          ]}">Supprimer l'article</button></div>
        </div>`;
  }
}

function checkProductInLocalStorage() {
  if (productInLocalStorage.length === 0) {
    console.log("le panier est vide");
    displayArea.innerHTML = `<p class="empty-basket">Votre panier est vide<br/>
        <a href="../index.html" title="Revenir à l'accueil">Revenir à l'accueil</a></p>`;
  } else {
    console.log("le panier est rempli");
    displayArticleInLocalStorage();
  }
}

function cart() {
  checkProductInLocalStorage();
}

cart();


// Fonction pour supprimer du panier
function suppr() {
  for (let k = 0; k < productInLocalStorage.length; k++) {
    document.querySelector(`#delete${[k]}`).addEventListener(
      "click",
      (ev) => {
        productInLocalStorage.splice([k], 1);
        console.log(productInLocalStorage);
        localStorage.setItem("produit", JSON.stringify(productInLocalStorage));
        document.location.reload();
      },
      false
    );
  }
}

suppr();


//Faire le total des éléments du panier
function total() {
  let sum = 0
for (let l = 0; l < productInLocalStorage.length; l++) {
  sum = sum + productInLocalStorage[l].teddyPrice;
  document.querySelector('.total').innerHTML = `<p>Total de votre commande: ${sum/100}€</p>`
}}

total();