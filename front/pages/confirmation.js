
    let orderId = sessionStorage.getItem("orderId");

    document.querySelector('.order-id').innerText = `${orderId}`

    let totalPrice = sessionStorage.getItem("totalPrice");

    document.querySelector('.confirmation-price').innerText = `${totalPrice}`;


    localStorage.clear();