const products = JSON.parse(localStorage.getItem('cart')) || []

if(products.length === 0) {
  renderDivCartEmpty()
  document.querySelector('.shoping__checkout')
  $('.shoping__checkout').remove()
}

function renderDivCartEmpty() {
  $('.products__cart').append(`
    <div class="cart__empty">
      <span>Seu carrinho de compras está vazio</span>
      <a href="/"><button class="button__black">Ver produtos</button>
    </div>
  `)
}

products.forEach(function(product) {
  let subtotal = (product.quantity * product.price).toFixed(2)

  $('.products__cart').append(`
    <div class="item__cart">
      <span style="display: none;">${product.id}</span>
      <div class="header__item">
        <img src="${product.image}" />
        <span>${product.name}</span>
      </div>
      <div class="item__content">
        <div class="item__price">
          <span>Preço</span>
          <span>R$ <span id="product_price">${(product.price).toFixed(2)}</span></span>
        </div>
        <div class="item__quantity">
          <span>Quantidade</span>
          <div class="quantity_actions">
            <button class="any__less action-btn">-</button>
            <span class="quantity__value">${product.quantity}</span>
            <button class="more action-btn">+</button>
          </div>
        </div>
        <div class="item__subtotal">
          <span>Subtotal</span>
          <span>R$ <span id="subtotal">${subtotal}</span></span>
        </div>
      </div>
      <div class="item__actions">
        <button class="delete button__black">Excluir</button>
      </div>
    </div>
  `) 
})

// Atualiza subtotal e total do carinho
function updateTotalAndSubtotalPrice(element, operation) {
  let productElement = element.parentElement.parentElement.parentElement
  let subtotalElement = productElement.querySelector('#subtotal')
  let quantityElement = productElement.querySelector('.quantity__value')
  let cartTotalPriceElement = document.querySelector('#cart-total-price')
  let checkoutTotalPriceElement = document.querySelector('#checkout_total')

  let cartTotalPriceValue = Number(cartTotalPriceElement.innerHTML)
  let productPrice = Number(productElement.querySelector('#product_price').innerHTML)
  let subtotalValue = Number(subtotalElement.innerHTML)
  let quantityValue = Number(quantityElement.innerHTML)

  switch (operation) {
    case 'subtraction':
      if(quantityValue > 1){
        subtotalElement.innerHTML = (subtotalValue - productPrice).toFixed(2)
        cartTotalPriceElement.innerHTML = (cartTotalPriceValue - productPrice).toFixed(2)
        checkoutTotalPriceElement.innerHTML = (cartTotalPriceValue - productPrice).toFixed(2)
        quantityElement.innerHTML = quantityValue - 1
      }
      break
    case 'addition':
      subtotalElement.innerHTML = (subtotalValue + productPrice).toFixed(2)
      cartTotalPriceElement.innerHTML = (cartTotalPriceValue + productPrice).toFixed(2)
      checkoutTotalPriceElement.innerHTML = (cartTotalPriceValue + productPrice).toFixed(2)
      quantityElement.innerHTML = quantityValue + 1
      break
  }
}

// Atualiza dados do produto no carrinho
function updateLocalStorageCart(element) {
  let productElement = element.parentElement.parentElement.parentElement.parentElement
  let productQuantity = Number(productElement.querySelector('.quantity__value').innerHTML)
  let productsCart = JSON.parse(localStorage.getItem('cart'))
  let productId = productElement.querySelector('span').innerHTML

  let updateProductsCart = productsCart.map(function(product){
    if(productId == product.id) {
      product.quantity = productQuantity
    }
    return product
  })

  localStorage.setItem('cart', JSON.stringify(updateProductsCart))
}

function updatePriceTotalCart(element) {
  let productElement = element.parentElement.parentElement
  let cartTotalPriceElement = document.querySelector('#cart-total-price')
  let checkoutTotalPriceElement = document.querySelector('#checkout_total')

  let cartTotalPriceValue = Number(cartTotalPriceElement.innerHTML)
  let productSubtotal = Number(productElement.querySelector('#subtotal').innerHTML)

  cartTotalPriceElement.innerHTML = (cartTotalPriceValue - productSubtotal).toFixed(2)
  checkoutTotalPriceElement.innerHTML = (cartTotalPriceValue - productSubtotal).toFixed(2) 
}

// Remove produto do carrinho
$('.item__actions .delete').click(function(event) {
  event.preventDefault()
  let products = JSON.parse(localStorage.getItem('cart'))
  let productData = this.parentElement.parentElement
  let productId = productData.querySelector('span').innerHTML
  let cartQuantityElement = document.querySelector('#cart-quantity')
  let cartQuantityValue = Number(cartQuantityElement.innerHTML)
  
  let updatedProducts = products.filter(function(product){
    if (product.id != productId) {
      return product
    }
  })

  localStorage.setItem('cart', JSON.stringify(updatedProducts))
  cartQuantityElement.innerHTML = cartQuantityValue - 1
  updatePriceTotalCart(this)
  productData.remove()
  if(cartQuantityElement.innerHTML == 0) {
    renderDivCartEmpty()
    $('.shoping__checkout').remove()
  }
})

// Aumenta a quantidade de um produto da lista
$('.quantity_actions .more').click(function(event) {
  event.preventDefault()
  updateTotalAndSubtotalPrice(this, 'addition')
  updateLocalStorageCart(this)
})

// Diminui a quantidade de um produto da lista
$('.quantity_actions .any__less').click(function(event) {
  event.preventDefault()
  updateTotalAndSubtotalPrice(this, 'subtraction')
  updateLocalStorageCart(this)
})