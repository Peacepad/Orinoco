let productInLocalStorage = JSON.parse(localStorage.getItem("produit"));
const deleteCartButton = document.querySelector(".delete-cart");
//console.log(productInLocalStorage);
const displayArea = document.querySelector(".cart-product__container");

function displayArticleInLocalStorage() {
  for (i = 0; i < productInLocalStorage.length; i++) {
    displayArea.innerHTML += `
      <div class="cart-product">
          <div class="cart-product__name">${
            productInLocalStorage[i].teddyName
          }</div>
          <div class="cart-product__couleur">${
            productInLocalStorage[i].teddyColor
          }</div>
          <div class="cart-product__prix">${
            productInLocalStorage[i].teddyPrice / 100
          }€</div>
          <div class="cart-product__delete"><button class="delete" id="delete${[
            i,
          ]}"><i class="fas fa-trash-alt"></i></button></div>
        </div>`;
  }
}

function checkProductInLocalStorage() {
  if (
    localStorage.getItem("produit") === null ||
    productInLocalStorage.length == 0
  ) {
    console.log("le panier est vide");
    displayArea.innerHTML = `<p class="empty-cart">Votre panier est vide<br/>
        <a href="../index.html" title="Revenir à l'accueil">Revenir à l'accueil</a></p>`;
  } else {
    console.log("le panier est rempli");
    displayArticleInLocalStorage();
    document.querySelector(".delete-cart").innerHTML =
      '<button class="delete-all__btn">Vider le panier</button>';
    displayForm();
    suppr();
    total();
    deleteCart();
    listenButton()
  }
}

checkProductInLocalStorage();

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

//Faire le total des éléments du panier
function total() {
  let sum = 0;
  for (let l = 0; l < productInLocalStorage.length; l++) {
    sum = sum + productInLocalStorage[l].teddyPrice;
    document.querySelector(".total").innerHTML = `<p>Total de votre commande: ${
      sum / 100
    }€</p>`;
  }
}



function deleteCart() {
  let l = productInLocalStorage.length;
  console.log(l);
  deleteCartButton.addEventListener(
    "click",
    (ev) => {
      productInLocalStorage.splice(0, [l]);
      console.log(productInLocalStorage);
      localStorage.setItem("produit", JSON.stringify(productInLocalStorage));
      document.location.reload();
    },
    false
  );
}

function displayForm() {
  document.querySelector(
    "#cart-form"
  ).innerHTML = `<form id="contact-information">
  <p>Félicitations, votre commande est presque prête ! Il ne vous reste plus qu'à nous dire où l'envoyer.</p>
    
  <fieldset>
    <legend>Votre identité</legend>
  <label for="firstname">Votre Prénom</label>
    <input type="text" id="firstname" pattern="[a-zA-Z-]*" minlength="1"  required/>
    <label for="lastname" >Votre nom</label>
    <input type="text" id="lastname"  minlength="1" pattern="[a-zA-Z-]*" required/>
    </fieldset>
    <fieldset>
        <legend>Votre adresse</legend>
    <label for="number">N°</label>
    <input type="number" min="0" id="number" onkeydown="return event.keyCode !== 69 && event.keyCode !== 109 && event.keyCode !== 107 && event.keyCode !== 190 && event.keyCode !== 110"/>
    <label for="voie">Voie</label>
    <input type="voie" id="voie"  required/>
    <label for="city">Ville</label>
    <input type="city" id="city"  required/>
  </fieldset>


  <fieldset>
    <legend>Information supplémentaire</legend>
  <label for="email">Votre adresse mail</label>
  <input type="email" id="email" required/>
</fieldset>
  
    <input type="submit" value="Envoyer" />
  
</form>`;
}

async function sendOrder() {
  fetch(": http://localhost:3000/get/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });
}
function listenButton() {
  document.querySelector("#contact-information").addEventListener(
    "submit",
    (e) => {
      //Récupérer la valeur des champs
      const firstname = document.getElementById("firstname").value;
      const lastname = document.getElementById("lastname").value;
      const number = document.getElementById("number").value;
      const voie = document.getElementById("voie").value;
      const city = document.getElementById("city").value;
      const mail = document.getElementById("email").value;

      const collectProductsInLocalStorage = JSON.parse(
        localStorage.getItem("produit")
      );
      //Récupérer juste l'iD des produits dans le tableau
      const prods = collectProductsInLocalStorage.map(
        (produit) => produit.teddyId
      );

      const contact = {
        firstName: firstname,
        lastName: lastname,
        address: number + " " + voie,
        city: city,
        email: mail,
      };

      const order = {
        contact,
        products: prods,
      };

      function sendInfo() {
        fetch("http://localhost:3000/api/teddies/order", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(order),
        })
          .then(function (response) {
            console.log("ok");
            return response.json();
          })
          .then(function (data) {
            console.log(data.orderId);
            localStorage.setItem("orderId", data.orderId);
            localStorage.removeItem("produit");
            window.location = "confirmation.html";
          })
          .catch(function (error) {
            console.log("error in function sendInfo !");
          });
      }

      sendInfo();

      e.preventDefault();
    },

    false
  );
}


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
  document.querySelector(".number-cart").innerText = `${nb}`
}
}

numberProductInLocalStorage()