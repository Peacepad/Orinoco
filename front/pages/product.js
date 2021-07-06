let params = new URL(document.location).searchParams;
let justId = params.get("id");

console.log(justId);

async function goToBasket() {

  const theArticle = await getTheArticle();

  // Définition du bouton Ajouter au panier
  boutonFormulaire = document.querySelector('#submit');

// ce que doit contenir un objet ajouté au panier
  function Products(prix, nom, couleur, quantite, identifiant) {
    this.prix = prix,
    this.nom = nom,
    this.couleur = couleur, 
    this.quantite = quantite,
    this.identifiant = identifiant
  };



  // Ecoute du bouton formulaire
  
  selectForm.addEventListener ("change", (e) => {

    colorSelected(colorChoice);
    
    

    //Définition d'un article
    let product = new Products(
    theArticle.price,
    theArticle.price,
    colorChoice,
    1,
    theArticle._id,
    );
    
    let products = [];

    //ce qu'il se passe lorsqu'on appuie sur le bouton
    boutonFormulaire.addEventListener ("click", (event) => {
    //Annule l'effet par défaut du bouton
    event.preventDefault();
      //ajoute le produit choisis à la liste des produits
    products.push(product);
    console.log(products);
    //
    localStorage.setItem("Produit(s) dans le panier", JSON.stringify(products));
  })
    
  
  })


 




};


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
      console.log("error in function getTeddies");
    });
}

async function main() {
  //fonction pour avoir tout les oursons dans le tableau donné dans getTeddies
  const theArticle = await getTheArticle();

  showtheArticle(theArticle);

  const colors = theArticle.colors;
  //console.log(colors);

  for (color of colors) {
    addOption(color);
  }

  goToBasket();
}

function showtheArticle(theArticle) {
  //console.log(theArticle);
  document.getElementById("thearticle-container").innerHTML = `
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

main();






const selectForm = document.querySelector('#couleur');
let colorChoice = selectForm.value;


// fonction colorSelected
function colorSelected() {

colorChoice = selectForm.options[selectForm.selectedIndex].value;

return colorChoice;
}
