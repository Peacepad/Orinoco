
    let orderId = localStorage.getItem("orderId");
    console.log(orderId);
    document.querySelector('#order-id').innerText = `${orderId}`


    localStorage.clear();