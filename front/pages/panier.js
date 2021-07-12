let productInLocalStorage = JSON.parse(localStorage.getItem("produit"));

console.log(productInLocalStorage);
const displayArea = document.querySelector(".basket-product__container");

function displayArticleInLocalStorage() {
    for (i = 0; i < productInLocalStorage.length; i++) {
      displayArea.innerHTML += `
      <div class="basket-product">
          <div class="basket-product__name">${productInLocalStorage[i].teddyName}</div>
          <div class="basket-product__couleur">${productInLocalStorage[i].teddyColor}</div>
          <div class="basket-product__prix">${productInLocalStorage[i].teddyPrice/100}€</div>
          <div class="basket-product__delete"><button class="delete" id="delete${[i]}">Supprimer l'article</button></div>
        </div>`;
    }
  }


function checkProductInLocalStorage() {
  if (productInLocalStorage === null) {
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

console.log(productInLocalStorage.length);







let buttonDelete = document.querySelectorAll('.delete');
// Dans LocalStorage : suppression de l'article sélectionné //
for (i=0; i < buttonDelete.length; i++) {
  buttonDelete[i].addEventListener("click", e => {
    
    productInLocalStorage.splice([i],1);
  })
}

