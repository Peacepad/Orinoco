for (let k = 0; k < productInLocalStorage.length; k++) {
  const realPrice = parseInt(productInLocalStorage[k].teddyPrice, 10);
  const priceForOne =
    parseInt(realPrice, 10) / parseInt(productInLocalStorage[k].quantity);

    let boutonPush ="";

  document.querySelector(`#less${[k]}`).addEventListener(
    "click",
    (ev) => {
      boutonPush = "moins";
      add();
    },
    false
  );

  document.querySelector(`#more${[k]}`).addEventListener(
    "click",
    (ev) => {
        boutonPush = "plus";
        add();
    },
    false
  );

    function add(){
    if (boutonPush == "moins") {
    productInLocalStorage[k].quantity -= 1;
      productInLocalStorage[k].teddyPrice -= priceForOne;
    }   
    else if (boutonPush == "plus") {
        productInLocalStorage[k].quantity += 1;
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
    };