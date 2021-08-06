let productInLocalStorage = JSON.parse(localStorage.getItem("produit"));

const domButtonClearCart = document.querySelector(".delete-cart");

const domDisplayArea = document.querySelector(".cart-product__container");

// Afficher le détail des produits dans le panier-----------------------------------------------------

function displayArticleInLocalStorage() {
  domDisplayArea.innerHTML = `
    <div class="cart-product cart-product--head">
          <div class="cart-product__name">Nom</div>
          <div class="cart-product__couleur">Couleur</div>
          <div class="cart-product__quantite">Quantité</div>
          <div class="cart-product__prix">Prix</div>
          <div class="cart-product__delete">Supprimer</div>
        </div>`;
  for (i = 0; i < productInLocalStorage.length; i++) {
    domDisplayArea.innerHTML += `
          <div class="cart-product">
          <div class="cart-product__name">${
            productInLocalStorage[i].teddyName
          }</div>
          <div class="cart-product__couleur">${
            productInLocalStorage[i].teddyColor
          }</div>
          <div class="cart-product__quantite">
            <button id="less${i}">-</button><span id="quantity${i}">${
      productInLocalStorage[i].quantity
    }</span><button id="more${i}">+</button></div>
          <div class="cart-product__prix"><span id="price${i}">${
      productInLocalStorage[i].teddyPrice
    }</span>€</div>
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
    domDisplayArea.innerHTML = `<p class="empty-cart">Votre panier est vide.</p>  
                            <p>N'hésitez pas à le remplir d'oursons en peluches.<br>Continuez à tout moment vos achats sur Orinoco.</p>
                            <p><a href="../index.html" title="Revenir à l'accueil"><button>Revenir à l'accueil</button></a></p>`;
  } else {
    console.log("le panier est rempli");
    displayArticleInLocalStorage();
    document.querySelector(".delete-cart").innerHTML =
      '<button class="delete-all__btn">Vider le panier<span><i class="fas fa-trash-alt"></i></span></button>';
    displayForm();
    makeALoopOnProductInLocalStorage()
    calculateTotal();
    clearCart();
    listenSubmitButton();
  }
}

checkProductInLocalStorage();


function makeALoopOnProductInLocalStorage() {
  for (let k = 0; k < productInLocalStorage.length; k++) {
    deleteProduct(k);
    addOrReduceQuantity(k);
  }
}


// Fonction pour supprimer un élément du panier-----------------------------------------------

function deleteProduct(k) {
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

// Gérer la quantité

function addOrReduceQuantity(k) {
  let boutonPush = "";

  document.querySelector(`#less${[k]}`).addEventListener(
    "click",
    (ev) => {
      boutonPush = "moins";
      ApplyAddOrReduceQuantity();
    },
    false
  );

  document.querySelector(`#more${[k]}`).addEventListener(
    "click",
    (ev) => {
      boutonPush = "plus";
      ApplyAddOrReduceQuantity();
    },
    false
  );

  // Fonction qui écoute les boutons + et - pour ajouter ou diminuer la quantité
  function ApplyAddOrReduceQuantity() {
    const realPrice = parseInt(productInLocalStorage[k].teddyPrice, 10);
    const priceForOne =
      parseInt(realPrice, 10) / parseInt(productInLocalStorage[k].quantity);
    if (boutonPush == "moins") {
      productInLocalStorage[k].quantity--;
      productInLocalStorage[k].teddyPrice -= priceForOne;
      if (productInLocalStorage[k].quantity == 0) {
        productInLocalStorage.splice([k], 1);

        localStorage.setItem("produit", JSON.stringify(productInLocalStorage));
        document.location.reload();
      }
    } else if (boutonPush == "plus") {
      productInLocalStorage[k].quantity++;
      productInLocalStorage[k].teddyPrice += priceForOne;
    }
    localStorage.setItem("produit", JSON.stringify(productInLocalStorage));
    document.querySelector(
      `#quantity${[k]}`
    ).innerText = `${productInLocalStorage[k].quantity}`;
    document.querySelector(
      `#price${[k]}`
    ).innerText = `${productInLocalStorage[k].teddyPrice}`;
    calculateTotal();
  }
}

// Faire le total des éléments du panier-------------------------------------------------------

function calculateTotal() {
  let sum = 0;
  for (let l = 0; l < productInLocalStorage.length; l++) {
    sum = sum + productInLocalStorage[l].teddyPrice;
    document.querySelector(
      ".total"
    ).innerHTML = `<p>Total de votre commande: ${sum}€</p>`;
  }
  sessionStorage.setItem("totalPrice", sum);
}

// Vider le panier-----------------------------------------------------------------------------

function clearCart() {
  let l = productInLocalStorage.length;
  console.log(l);
  domButtonClearCart.addEventListener(
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
                      <input type="text" name="firstname" id="firstname" required/>
                   
                    </p>
                    <p>
                      <label for="lastname">Nom</label>
                      <input type="text" name="lastname" id="lastname" required/>
                     
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
                      <input type="city" name="city" id="city"  required/>
                      
                    </p>
                  </fieldset>
                  <fieldset>
                    <legend>Information supplémentaire</legend>
                    <p>
                      <label for="email">Adresse mail</label>
                      <input type="email" name="email" id="email" required/>
                      
                    </p>
                  </fieldset>
                
                  <input type="submit" value="Envoyer" id="cart-form-button"/>
              
                </form>`;
}

//-----------------------------------Vérification des champs du formulaire-------------------------------

const domFirstname = document.getElementById("firstname");
const domLastname = document.getElementById("lastname");
const domNumber = document.getElementById("number");
const domVoie = document.getElementById("voie");
const domCity = document.getElementById("city");
const domEmail = document.getElementById("email");

let firstnameRegExp = /^[a-z '-]+$/i;
let lastnameRegExp = /^[a-z '-]+$/i;
let numberRegExp = /^[0-9]{1,4}/;
let voieRegExp = /^[ A-Za-zÀ-ÿ0-9\-]+$/;
let cityRegExp = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
let emailRegExp = /.+\@.+\..+/;

const domNeedVerification = [
  domFirstname,
  domLastname,
  domNumber,
  domVoie,
  domCity,
  domEmail,
];

const regex = [
  firstnameRegExp,
  lastnameRegExp,
  numberRegExp,
  voieRegExp,
  cityRegExp,
  emailRegExp,
];

for (let i = 0; i <= domNeedVerification.length; i++) {
domNeedVerification[i].addEventListener("change", (e) => {
  if (regex[i].test(domNeedVerification[i].value)) {
    domNeedVerification[i].classList.remove("invalid");
    domNeedVerification[i].classList.add("valid");

  } else {
    domNeedVerification[i].classList.remove("valid");
    domNeedVerification[i].classList.add("invalid");
  }
})
}

// Ecouter le bouton d'envoi du formulaire----------------------------------------------------
function listenSubmitButton() {
  document.querySelector("#contact-information").addEventListener(
    "submit",
    (e) => {
      console.log('envoyé )')
      const firstnameValue = domFirstname.value;
        const lastnameValue = domLastname.value;
        const numberValue = domNumber.value;
        const voieValue = domVoie.value;
        const cityValue = domCity.value;
        const emailValue = domEmail.value;

      // Si les champs du formulaire sont valides--------------
      if (firstnameRegExp.test(firstnameValue) &&
      lastnameRegExp.test(lastnameValue) && numberRegExp.test(numberValue) && voieRegExp.test(voieValue) && cityRegExp.test(cityValue) && emailRegExp.test(emailValue)
      ) {
        // Récupérer la valeur des champs---------------------
        

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

function showHowMuchProductInLocalStorage() {
  if (
    localStorage.getItem("produit") === null ||
    productInLocalStorage.length == 0
  ) {
    console.log("0");
  } else {
    document.querySelector(".number-cart").style.right = "32px";
    if (productInLocalStorage.length > 9) {
      document.querySelector(".number-cart").style.right = "29px";
    }
    document.querySelector(
      ".number-cart"
    ).innerText = `${productInLocalStorage.length}`;
  }
}

showHowMuchProductInLocalStorage();










