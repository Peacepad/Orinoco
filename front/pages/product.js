let productInLocalStorage = JSON.parse(localStorage.getItem("produit"));

const domSelectColor = document.querySelector("#couleur");
const domTheArticle = document.getElementById("thearticle-container");
const domProductForm = document.querySelector("#form-for-product");
const domSelectTheQuantity = document.querySelector("#quantite");
// Récupérer les infos en fonction de l'id-------------------------------------------------------------------------

let params = new URL(document.location).searchParams;
let justId = params.get("id");

function getTheTeddy() {
  return fetch(`http://localhost:3000/api/teddies/${justId}`)
    .then(function (res) {
      console.log("ok");
      return res.json();
    })
    .then(function (teddy) {
      //console.log(theArticle);
      return teddy;
    })
    .catch(function (error) {
      console.log("erreur au niveau de la requête");
    });
}

// Fonction principale qui appelle d'autres fonctions-------------------------------------------------------

async function main() {
  const teddy = await getTheTeddy();

  const colors = teddy.colors;

  displaytheArticle(teddy);

  addOption(colors);

  goToBasket();
}

// Fonction qui affiche les informations sur l'ourson en fonction du tableau obtenu-----------------------------

function displaytheArticle(teddy) {
  domTheArticle.innerHTML = `
    <div class="thearticle__image">
      <img src="${teddy.imageUrl}" alt="Image de l'ours ${teddy.name}"/>
    </div>
    <div class="thearticle__content">
      <div class="thearticle__name">
        <h1>${teddy.name}</h1>
      </div>
      <div class="thearticle__description">"${teddy.description}"</div>
      <div class="thearticle__price">${teddy.price / 100}<sup>€</sup></div>
    </div>
    `;
}

// Ajout des options de quantités--------------------------------

function addQuantityInDom() {
  for (let i = 1; i <= 9; i++) {
    let opt = document.createElement("option");
    opt.value = i;
    opt.innerHTML = i;
    domSelectTheQuantity.appendChild(opt);
  }
}
addQuantityInDom();

//Ecoute de la quantité choisie------------------------------------------------------------

// Fonction qui ajoute les couleurs l'ourson dans le select------------------------------------

function addOption(colors) {
  for (color of colors) {
    domSelectColor.add(new Option(`${color}`, `${color}`));
  }
}

async function goToBasket() {
  const teddy = await getTheTeddy();

  // Ecoute des selections choisies--------------------------------------------------------------

  function listenSelectors() {
    domSelectColor.addEventListener("change", (e) => {
      product.teddyColor = e.target.value;
    });

    domSelectTheQuantity.addEventListener("change", (e) => {
      product.quantity = e.target.value;
      product.teddyPrice = (e.target.value * teddy.price) / 100;
    });
  }
  listenSelectors();

  // Définition d'un product-------------------------------------------------------------------

  let product = {
    teddyName: teddy.name,
    teddyId: teddy._id,
    teddyColor: "",
    quantity: "",
    teddyPrice: "",
  };

  // Comment continuer après avoir choisi un produit------------------------------------------

  function howContinue() {
    const modal = document.querySelector(".window-confirmation");
    modal.style.display = "flex";
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal", "true");
    document.querySelector(
      ".window-confirmation__resume"
    ).innerHTML = `L'article: <span class="classic">${teddy.name}</span> <br/>  
                  Couleur: <span class="classic">${product.teddyColor}</span><br/>
                  a été ajouté au panier.`;
    // Fermer la fenêtre
    document
      .querySelector(".window-confirmation__close")
      .addEventListener("click", (e) => {
        document.location.reload();
      });
  }

  // Fonction qui vérifie si le panier contient déjà un ou des produits--------------------------

  function checkLocalStorage() {
    //s'il y a déjà quelque chose
    if (productInLocalStorage) {
      // Est-ce que l'article en question existe déjà avec la même couleur et le même id

      for (article of productInLocalStorage) {
        if (article.teddyId === product.teddyId) {
          if (article.teddyColor === product.teddyColor) {
            // On ajoute la quantité et le prix
            article.quantity =
              parseInt(article.quantity, 10) + parseInt(product.quantity, 10);
            article.teddyPrice =
              parseInt(article.teddyPrice, 10) +
              parseInt(product.teddyPrice, 10);
          }
        }
      }

      const idLocalStorage = productInLocalStorage.map((el) => el.teddyId);
      const colorLocalStorage = productInLocalStorage.map(
        (el) => el.teddyColor
      );

      productInLocalStorage.push(product);
      localStorage.setItem("produit", JSON.stringify(productInLocalStorage));

      function RemoveDouble() {
      productInLocalStorage = productInLocalStorage.filter(
        (productInLocalStorage, index, self) =>
          index ===
          self.findIndex(
            (double) =>
              double.teddyId === productInLocalStorage.teddyId &&
              double.teddyColor === productInLocalStorage.teddyColor
          )
      );
    }

    RemoveDouble(),
      localStorage.setItem("produit", JSON.stringify(productInLocalStorage));
      showHowMuchProductInLocalStorage();
      console.log(product);
      howContinue();
    }

    // S'il n'y a rien
    else {
      productInLocalStorage = [];
      productInLocalStorage.push(product);
      console.log(productInLocalStorage);
      localStorage.setItem("produit", JSON.stringify(productInLocalStorage));
      showHowMuchProductInLocalStorage();
      howContinue();
    }
  }

  // Ecoute du bouton ajouter au panier-------------------------------------

  domProductForm.addEventListener(
    "submit",
    (e) => {
      if (
        product.teddyColor == "" ||
        product.teddyColor == "Selectionner une couleur"
      ) {
        alert("Selectionnez une couleur pour votre ourson.");

        e.preventDefault();
      } else if (product.quantity == "" || product.quantity == "Quantité") {
        alert("Selectionnez une quantité.");
        e.preventDefault();
      } else {
        e.preventDefault();
        checkLocalStorage();
      }
    },
    false
  );
}

// Fonction pour afficher le nombre d'article présent dans le panier--------------------------------------------------------

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

// Appel des fonctions-----------------------------------------------------------------------------------------------------

main();
showHowMuchProductInLocalStorage();
