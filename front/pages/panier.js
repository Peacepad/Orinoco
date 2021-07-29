let productInLocalStorage = JSON.parse(localStorage.getItem("produit"));

const deleteCartButton = document.querySelector(".delete-cart");

const displayArea = document.querySelector(".cart-product__container");

// Afficher le détail des produits dans le panier-----------------------------------------------------

function displayArticleInLocalStorage() {
  displayArea.innerHTML = `
    <div class="cart-product">
          <div class="cart-product__name">Nom</div>
          <div class="cart-product__couleur">Couleur</div>
          <div class="cart-product__prix">Prix</div>
          <div class="cart-product__delete">Supprimer</div>
        </div>`;
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

// Vérifier si le panier est vide-------------------------------------------------------------------

function checkProductInLocalStorage() {
  if (
    localStorage.getItem("produit") === null ||
    productInLocalStorage.length == 0
  ) {
    console.log("le panier est vide");
    displayArea.innerHTML = `<p class="empty-cart">Votre panier est vide.</br>
    N'hésitez pas à le remplir d'oursons en peluches. Continuez à tout moment vos achats sur Orinoco.</br>
        <a href="../index.html" title="Revenir à l'accueil"><button>Revenir à l'accueil</button></a></p>`;
  } else {
    console.log("le panier est rempli");
    displayArticleInLocalStorage();
    document.querySelector(".delete-cart").innerHTML =
      '<button class="delete-all__btn">Vider le panier</button>';
    displayForm();
    suppr();
    total();
    clearCart();
    listenButton();
  }
}

checkProductInLocalStorage();

// Fonction pour supprimer un élément du panier-----------------------------------------------

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

// Faire le total des éléments du panier-------------------------------------------------------

function total() {
  let sum = 0;
  for (let l = 0; l < productInLocalStorage.length; l++) {
    sum = sum + productInLocalStorage[l].teddyPrice;
    document.querySelector(".total").innerHTML = `<p>Total de votre commande: ${
      sum / 100
    }€</p>`;
  }
  sessionStorage.setItem("totalPrice", sum);
}

// Vider le panier-----------------------------------------------------------------------------

function clearCart() {
  let l = productInLocalStorage.length;
  console.log(l);
  deleteCartButton.addEventListener(
    "click",
    (ev) => {
      localStorage.clear();
      console.log(productInLocalStorage);
      sessionStorage.setItem("totalPrice", 0);
      document.location.reload();
    },
    false
  );
}

// Afficher le formulaire-----------------------------------------------------------------------------

function displayForm() {
  document.querySelector("#cart-form").innerHTML = `
                <form id="contact-information">
                  <p>Félicitations, votre commande est presque prête ! Il ne vous reste plus qu'à nous dire où l'envoyer.</p>
                  <fieldset>
                    <legend>Votre identité</legend>
                    <p>
                      <label for="firstname">Prénom</label>
                      <input type="text" id="firstname" required/>
                      <small></small>
                    </p>
                    <p>
                      <label for="lastname">Nom</label>
                      <input type="text" id="lastname" required/>
                      <small></small>
                    </p>
                  </fieldset>
                  <fieldset>
                    <legend>Votre adresse</legend>
                    <p>
                      <label for="number">N°</label>
                      <input type="number" min="0"  max="10000" id="number" onkeydown="return event.keyCode !== 69 && event.keyCode !== 109 && event.keyCode !== 107 && event.keyCode !== 190 && event.keyCode !== 110"/>
                    </p>
                    <p>
                      <label for="voie">Voie</label>
                      <input type="voie" id="voie"  required/>
                    </p>
                    <p>
                      <label for="city">Ville</label>
                      <input type="city" id="city"  required/>
                      <small></small>
                    </p>
                  </fieldset>
                  <fieldset>
                    <legend>Information supplémentaire</legend>
                    <p>
                      <label for="email">Adresse mail</label>
                      <input type="email" id="email" required/>
                      <small></small>
                    </p>
                  </fieldset>
                
                  <input type="submit" value="Envoyer" id="cart-form-button"/>
              
                </form>`;
}

//-----------------------------------Vérification des champs du formulaire-------------------------------

const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const number = document.getElementById("number");
const voie = document.getElementById("voie");
const city = document.getElementById("city");
const email = document.getElementById("email");

// Ecoute de l'input firstname----------------------------------------

firstname.addEventListener("change", function () {
  validFirstName(this);
});

// Fonction avec la regExp pour l'input firstname
const validFirstName = function (inputFirstName) {
  let firstNameRegExp = /^[a-z ,.'-]+$/i;
  // Balise succédant firstname
  let GoodOrNotMessage = firstname.nextElementSibling;

  // S'il est vrai (en adéquation avec la regex)
  if (firstNameRegExp.test(inputFirstName.value)) {
    GoodOrNotMessage.innerHTML = "Prénom Valide";
    GoodOrNotMessage.classList.remove("invalid");
    GoodOrNotMessage.classList.add("valid");
    return true;
  } else {
    GoodOrNotMessage.innerHTML = "Prénom Invalide";
    GoodOrNotMessage.classList.remove("valid");
    GoodOrNotMessage.classList.add("invalid");
    return false;
  }
};

// Ecoute de l'input laststname----------------------------------------

lastname.addEventListener("change", function () {
  validLastName(this);
});

// Fonction avece la regExp pour l'input lastname
const validLastName = function (inputLastName) {
  let lastNameRegExp = /^[a-z ,.'-]+$/i;
  // Balise succédant lastname
  let GoodOrNotMessage = lastname.nextElementSibling;

  // S'il est vrai
  if (lastNameRegExp.test(inputLastName.value)) {
    GoodOrNotMessage.innerHTML = "Nom Valide";
    GoodOrNotMessage.classList.remove("invalid");
    GoodOrNotMessage.classList.add("valid");
    return true;
  } else {
    GoodOrNotMessage.innerHTML = "Nom Invalide";
    GoodOrNotMessage.classList.remove("valid");
    GoodOrNotMessage.classList.add("invalid");
    return false;
  }
};

// Ecoute de l'input city-------------------------------------------------

city.addEventListener("change", function () {
  validCity(this);
});

// Fonction avece la regExp pour l'input city
const validCity = function (inputCity) {
  let cityRegExp = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
  // Balise succédant city
  let GoodOrNotMessage = city.nextElementSibling;

  // S'il est vrai
  if (cityRegExp.test(inputCity.value)) {
    GoodOrNotMessage.innerHTML = "Ville Valide";
    GoodOrNotMessage.classList.remove("invalid");
    GoodOrNotMessage.classList.add("valid");
    return true;
  } else {
    GoodOrNotMessage.innerHTML = "Ville Invalide";
    GoodOrNotMessage.classList.remove("valid");
    GoodOrNotMessage.classList.add("invalid");
    return false;
  }
};

// Ecoute de l'input email-------------------------------------------
email.addEventListener("change", function () {
  validEmail(this);
});

// Fonction avece la regExp pour l'input email
const validEmail = function (inputEmail) {
  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
    "g"
  );
  // Balise succédant email
  let GoodOrNotMessage = email.nextElementSibling;

  // S'il est vrai
  if (emailRegExp.test(inputEmail.value)) {
    GoodOrNotMessage.innerHTML = "Adresse Valide";
    GoodOrNotMessage.classList.remove("invalid");
    GoodOrNotMessage.classList.add("valid");
    return true;
  } else {
    GoodOrNotMessage.innerHTML = "Adresse Invalide";
    GoodOrNotMessage.classList.remove("valid");
    GoodOrNotMessage.classList.add("invalid");
    return false;
  }
};

// Ecouter le bouton d'envoi du formulaire----------------------------------------------------
function listenButton() {
  document.querySelector("#contact-information").addEventListener(
    "submit",
    (e) => {
      // Si les champs du formulaire sont valides--------------
      if (
        validFirstName(firstname) &&
        validLastName(lastname) &&
        validCity(city) &&
        validEmail(email)
      ) {
        // Récupérer la valeur des champs---------------------
        const firstnameValue = document.getElementById("firstname").value;
        const lastnameValue = document.getElementById("lastname").value;
        const numberValue = document.getElementById("number").value;
        const voieValue = document.getElementById("voie").value;
        const cityValue = document.getElementById("city").value;
        const emailValue = document.getElementById("email").value;

        const collectProductsInLocalStorage = JSON.parse(
          localStorage.getItem("produit")
        );

        // Récupérer juste l'iD des produits dans le tableau-----

        const prods = collectProductsInLocalStorage.map(
          (produit) => produit.teddyId
        );

        // Définition de l'objet contact---------------------

        const contact = {
          firstName: firstnameValue,
          lastName: lastnameValue,
          address: numberValue + " " + voieValue,
          city: cityValue,
          email: emailValue,
        };

        // Définition de l'objet order---------------------

        const order = {
          contact,
          products: prods,
        };

        // Envoi des informations aux serveurs-------------------------
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
              sessionStorage.setItem("orderId", data.orderId);

              localStorage.removeItem("produit");
              window.location = "confirmation.html";
            })
            .catch(function (error) {
              console.log("erreur au niveau de la requête envoi serveur");
            });
        }

        sendInfo();

        e.preventDefault();
      } else {
        alert("Les champs du formulaire ne sont pas correctement complété");
        e.preventDefault();
      }
    },

    false
  );
}

// Afficher le nombre de produits présents dans le panier-------------------

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
    if (nb > 9) {
      document.querySelector(".number-cart").style.right = "29px";
    }
    document.querySelector(".number-cart").innerText = `${nb}`;
  }
}

numberProductInLocalStorage();
