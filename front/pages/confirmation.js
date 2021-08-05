
    let orderId = sessionStorage.getItem("orderId");
    console.log(orderId);
    document.querySelector('.order-id').innerText = `${orderId}`

    let totalPrice = sessionStorage.getItem("totalPrice");
    console.log(totalPrice);
    document.querySelector('.confirmation-price').innerText = `${totalPrice}`;


    localStorage.clear();