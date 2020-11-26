const productsCart = JSON.parse(localStorage.getItem('cart')) || [] 

productsCart.forEach(function(product){
  let total = (product.price * product.quantity).toFixed(2)
  document.querySelector('#list_products').innerHTML += `
    <li><span>-${product.quantity}x ${product.name}</span><span>R$ ${total}</span></li>
  `
})
 
function fadeOut(element){
  element.style.opacity = 1;

  (function fade() {
    if ((element.style.opacity -= .1) < 0) {
      element.style.display = "none";
    } else {
      requestAnimationFrame(fade);
    }
  })()
}

function fadeIn(element, display){
  element.style.opacity = 0;
  element.style.display = display || "block";

  (function fade() {
    let val = parseFloat(element.style.opacity);
    if (!((val += .1) > 1)) {
      element.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })()
}

document.querySelector('#order-details-form')
  .addEventListener('submit', function(event) {
    event.preventDefault()
    let clientName = this.querySelector('#client_name').value
    let addres = this.querySelector('#addres').value
    let complement = this.querySelector('#complement').value
    let telephone = this.querySelector('#telephone').value.replace(/\D/g, "")

    const clientInfo = {
      name: clientName,
      addres,
      complement,
      telephone,
    }

    const products = productsCart.map(item => {
      return {
        id: item.id,
        quantity: item.quantity
      }
    })

    let data = {
      clientInfo,
      products
    }

    console.log(data)

    fetch('/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })

    .then(function(response) {
      if(response.status === 200) {
        localStorage.removeItem('cart')      
        fadeOut(document.querySelector('.loader'))
        fadeIn(document.querySelector('.modal__information'), 'flex')
        document.querySelector('.modal__information span').innerHTML = `
          Pedido realizado com sucesso, dentro de alguns minutos seus produtos serão entregues.
        `
      } else {
        fadeOut(document.querySelector('.loader'))
        fadeIn(document.querySelector('.modal__information'), 'flex')
        document.querySelector('.modal__information span').innerHTML = `
          Desculpe, um erro aconteceu, tente novamente dentro de alguns minutos.
        `
      }
    })

    fadeIn(document.querySelector('.loader__checkout'))  
    fadeIn(document.querySelector('.loader'))
})
