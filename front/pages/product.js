let params = new URL(document.location).searchParams;
let justId = params.get("id");

console.log(justId);

let products = [];
const selectForm = document.querySelector("#couleur");
let colorChoice = selectForm.options[selectForm.selectedIndex].value;
const zoneAffichage = document.getElementById("thearticle-container");
boutonFormulaire = document.querySelector("#submit");
const formProduct = document.querySelector('#form-for-product');

// récupérer les infos en fonction de l'id
function getTheArticle() {
  return fetch(`http://localhost:3000/api/teddies/${justId}`)
    .then(function (res) {
      console.log("ok");
      return res.json();
    })
    .then(function (theArticle) {
      //console.log(theArticle);
      return theArticle;
    })
    .catch(function (error) {
      console.log("error in function getTheArticle");
    });
}

async function main() {
  //fonction pour avoir tout les oursons dans le tableau donné dans getTeddies
  const theArticle = await getTheArticle();
  const colors = theArticle.colors;

  showtheArticle(theArticle);

  for (color of colors) {
    addOption(color);
  }

  goToBasket();
}

function showtheArticle(theArticle) {
  //console.log(theArticle);
  zoneAffichage.innerHTML = `
    <div class="thearticle__image">
      <img src="${theArticle.imageUrl}" alt="Image de l'ours ${theArticle.name}"/>
    </div>
    <div class="thearticle__content">
      <div class="thearticle__name">
        <h1>${theArticle.name}</h1>
      </div>
      <div class="thearticle__description">${theArticle.description}</div>
      <div class="thearticle__price">${theArticle.price}<sup>€</sup></div>
    </div>
    `;
}

function addOption(colors) {
  selectForm.add(new Option(`${color}`, `${color}`));
}

// fonction pour ressortir la couleur selectionnée dans le select
function colorSelected() {
  colorChoice = selectForm.options[selectForm.selectedIndex].value;

  return colorChoice;
}

async function goToBasket() {
  const theArticle = await getTheArticle();

  // Définition du bouton Ajouter au panier

  // ce que doit contenir un objet ajouté au panier
  function Products(prix, nom, couleur, quantite, identifiant) {
    (this.prix = prix),
      (this.nom = nom),
      (this.couleur = couleur),
      (this.quantite = quantite),
      (this.identifiant = identifiant);
  }

  //Définition d'un article
  let product = new Products(
    theArticle.price,
    theArticle.name,
    colorChoice,
    1,
    theArticle._id
  );

  // Ecoute du formulaire
  selectForm.addEventListener("change", (e) => {
    product.couleur = colorSelected(colorChoice);
    console.log(product);
  });

  console.log(colorChoice);

  formProduct.addEventListener("submit", (e) => {
      console.log(colorChoice);
      if (colorChoice == 'choisissez une couleur') {
          alert('choisissez une couleur');
          e.preventDefault();
      }
      else {
        e.preventDefault();
          alert("L'article a été ajouté au panier")
          products.push(product);
          console.log(colorChoice);
          // Permet d'envoyer dans le local storage le contenu en format JSON
          localStorage.setItem("article", JSON.stringify(products));}
  }, false);


  


}

main();



