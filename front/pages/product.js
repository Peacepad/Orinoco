let params = new URL(document.location).searchParams;
let justId = params.get("id");

console.log(justId);


const selectForm = document.querySelector("#couleur");
const zoneAffichage = document.getElementById("thearticle-container");
const formProduct = document.querySelector('#form-for-product');

// récupérer les infos en fonction de l'id
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
      console.log("error in function getTheArticle");
    });
}

async function main() {
  //fonction pour avoir tout les oursons dans le tableau donné dans getTeddies
  const teddy = await getTheTeddy();

  const colors = teddy.colors;

  displaytheArticle(teddy);

  for (color of colors) {
    addOption(color);
  }


  goToBasket();
}

function displaytheArticle(teddy) {
  
  zoneAffichage.innerHTML = `
    <div class="thearticle__image">
      <img src="${teddy.imageUrl}" alt="Image de l'ours ${teddy.name}"/>
    </div>
    <div class="thearticle__content">
      <div class="thearticle__name">
        <h1>${teddy.name}</h1>
      </div>
      <div class="thearticle__description">${teddy.description}</div>
      <div class="thearticle__price">${teddy.price/100}<sup>€</sup></div>
    </div>
    `;
}

function addOption() {
  selectForm.add(new Option(`${color}`, `${color}`));
}






async function goToBasket() {
  const teddy = await getTheTeddy();

 
     // Définition d'un article
     let product = {
      teddyName : teddy.name,
      teddyID: teddy._id,
      teddyColor: "",
      teddyPrice: teddy.price,
      };





  // Ecoute de la couleur
  selectForm.addEventListener("change", (e) => {
    product.teddyColor = e.target.value;
    console.log(productInLocalStorage);
  });


  // Comment continuer après avoir choisi un produit

  function howContinue() {
    if (window.confirm(`L'ourson ${teddy.name} a été ajouté au panier avec sa couleur ${product.teddyColor}.
    Cliquez sur Ok pour accéder au panier ou sur annuler pour continuer vos achats`)) {
      window.location.href = "panier.html";
    } else {
      document.location.reload();
    }
  };



  let productInLocalStorage = JSON.parse(localStorage.getItem("produit"));

  function checkLocalStorage() {
    //s'il y a déjà quelque chose
    if(productInLocalStorage) {
      productInLocalStorage.push(product);
      localStorage.setItem("produit", JSON.stringify(productInLocalStorage));
      console.log(productInLocalStorage);
      console.log(product);
      howContinue();
    }
    //s'il n'y a rien
    else {
      productInLocalStorage = [];
      productInLocalStorage.push(product);
      console.log(productInLocalStorage);
      localStorage.setItem("produit", JSON.stringify(productInLocalStorage));
      howContinue();
    }
  }

  formProduct.addEventListener("submit", (e) => {
      
      if (product.teddyColor == "" || product.teddyColor == "choisissez une couleur") {
          alert('Choisissez une couleur');
          e.preventDefault();
      }
      else {
          e.preventDefault();
          checkLocalStorage();
          ;}

  }, false);


  


}

main();



