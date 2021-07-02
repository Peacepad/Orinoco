// const urlProduct = window.location.search; //récupération de l'id dans l'uRL de la page

// const justId = urlProduct.slice(1); //retrait du point d'interrogation

let params = (new URL(document.location)).searchParams;
let justId = params.get('id');

console.log(justId);

async function main() {
  //fonction pour avoir tout les oursons dans le tableau donné dans getTeddies
  const theArticle = await getTheArticle();

  showtheArticle(theArticle);

  const colors = theArticle.colors;
 console.log(colors);

  for (color of colors) {

    addOption(color);
  }
    //faire une action pour le nombre d'élement dans le tableau
 

    
  }


function getTheArticle() {
  return fetch(`http://localhost:3000/api/teddies/${justId}`)
    .then(function (res) {
      console.log("ok");
      return res.json();
    })
    .then(function (theArticle) {
      console.log(theArticle);
      return theArticle;
    })
    .catch(function (error) {
      console.log("error in function getTeddies");
    });
}

function showtheArticle(theArticle) {
  console.log(theArticle);
  document.getElementById("thearticle-container").innerHTML = `
  <div class="thearticle__image">
    <img src="${theArticle.imageUrl}" alt="Image de l'ours ${theArticle.name}"/>
  </div>
  <div class="thearticle__content>
    <div class="thearticle__name">
      <h1>${theArticle.name}</h1>
    </div>
    <div class="thearticle__description">${theArticle.description}</div>
      <div class="thearticle__price">${theArticle.price}<sup>€</sup></div>
    </div>
  `;
}

function addOption(colors) {

  document.getElementById("couleur").innerHTML += `<option value="${color}">${color}</option>`;
}

main();


