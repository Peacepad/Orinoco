let productInLocalStorage = JSON.parse(localStorage.getItem("produit"));

const selectColor = document.querySelector("#couleur");
const zoneAffichage = document.getElementById("thearticle-container");
const formProduct = document.querySelector("#form-for-product");

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
  zoneAffichage.innerHTML = `
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
selectQuantity = document.querySelector("#quantite");

for (let i = 1; i <= 9; i++) {
  let opt = document.createElement("option");
  opt.value = i;
  opt.innerHTML = i;
  selectQuantity.appendChild(opt);
}

//Ecoute de la quantité choisie------------------------------------------------------------

// Fonction qui ajoute les couleurs l'ourson dans le select------------------------------------

function addOption(colors) {
  for (color of colors) {
    selectColor.add(new Option(`${color}`, `${color}`));
  }
}

async function goToBasket() {
  const teddy = await getTheTeddy();

  // Ecoute de la couleur choisie--------------------------------------------------------------

  selectColor.addEventListener("change", (e) => {
    product.teddyColor = e.target.value;
  });

  selectQuantity.addEventListener("change", (e) => {
    product.quantity = e.target.value;
    product.teddyPrice = (e.target.value * teddy.price)/100;
  });

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
        console.log("click");
        modal.style.display = "none";
        modal.removeAttribute("aria-modal");
        modal.setAttribute("aria-hidden", "true");
      });
  }

  // Fonction qui vérifie si le panier contient déjà un ou des produits--------------------------

  function checkLocalStorage() {
    //s'il y a déjà quelque chose
    if (productInLocalStorage) {
      // Est-ce que l'article en question existe déjà
      console.log("coucou");
      for (article of productInLocalStorage) {
        if (article.teddyId === product.teddyId && article.teddyColor === product.teddyColor) {
          article.quantity =
            parseInt(article.quantity, 10) + parseInt(product.quantity, 10);
            article.teddyPrice =
            parseInt(article.teddyPrice, 10) + parseInt(product.teddyPrice, 10);
        }
      }
      // Il faut vérifier que pour chaque ours déjà dans le panier son id n'est pas déjà présent

      
        const idLocalStorage = productInLocalStorage.map(el => el.teddyId)
        const colorLocalStorage = productInLocalStorage.map(el => el.teddyColor)
        if (idLocalStorage.includes(product.teddyId) == false || colorLocalStorage.includes(product.teddyColor) == false)  
        {productInLocalStorage.push(product);}
     
        
         
          
      
     
      localStorage.setItem("produit", JSON.stringify(productInLocalStorage));
      numberProductInLocalStorage();
      console.log(product);
      howContinue();
    }

    //s'il n'y a rien
    else {
      productInLocalStorage = [];
      productInLocalStorage.push(product);
      console.log(productInLocalStorage);
      localStorage.setItem("produit", JSON.stringify(productInLocalStorage));
      numberProductInLocalStorage();
      howContinue();
    }
  }

  // Ecoute du bouton ajouter au panier-------------------------------------

  formProduct.addEventListener(
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

function numberProductInLocalStorage() {
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
numberProductInLocalStorage();

function quantityManager() {}
