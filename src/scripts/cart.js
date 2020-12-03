import Cookie from 'js-cookie'
import loadProductsCart from './lib/loadProductsCart'

// const localInfoProducts = JSON.parse(window.localStorage.getItem('@products_cart')) || []

function updateSubtotalOfProducts () {
  const products = document.querySelectorAll('.js-product-card')

  products.forEach((product) => {
    const quantity = Number(product.querySelector('.js-product-quantity').innerText)
    const price = Number(product.querySelector('.js-product-price').innerText)
    const subtotalElement = product.querySelector('.js-product-subtotal')

    const subtotal = (quantity * price).toFixed(2)
    subtotalElement.innerText = subtotal
  })
}

function updateSummary () {
  const subtotalElements = [...document.querySelectorAll('.js-product-subtotal')]
  const { subtotal } = getSumaryData()

  const subtotalSum = subtotalElements.reduce((prev, { innerHTML }) => {
    return prev + Number(innerHTML)
  }, 0)

  subtotal.element.innerHTML = (subtotalSum).toFixed(2)
  adjustRate()
  adjustTotalPrice()
}

function getSumaryData () {
  return {
    subtotal: {
      element: document.querySelector('.js-subtotal'),
      value: Number(document.querySelector('.js-subtotal').innerHTML)
    },
    total: {
      element: document.querySelector('.js-total'),
      value: Number(document.querySelector('.js-total').innerHTML)
    },
    rate: {
      element: document.querySelector('.js-rate'),
      value: Number(document.querySelector('.js-rate').innerHTML)
    }
  }
}

function getElementData (selector) {
  return {
    element: document.querySelector(selector),
    value: Number(document.querySelector(selector).innerHTML)
  }
}

function adjustRate () {
  const { subtotal, rate } = getSumaryData()

  rate.element.innerHTML = subtotal.value >= 50
    ? (0).toFixed(2)
    : (5).toFixed(2)
}

function adjustTotalPrice () {
  const { subtotal, rate, total } = getSumaryData()

  total.element.innerHTML = (subtotal.value + rate.value).toFixed(2)
}

function updateTotalAndSubtotalPrice (element, operation) {
  const productElement = element.closest('.js-product-info')
  const { subtotal } = getSumaryData()

  const subtotalProductELement = productElement.querySelector('.js-product-subtotal')
  const productPriceElement = productElement.querySelector('.js-product-price')
  const productQuantityElement = productElement.querySelector('.js-product-quantity')

  const subtotalProduct = Number(subtotalProductELement.innerText)
  const productPrice = Number(productPriceElement.innerText)
  const productQuantity = Number(productQuantityElement.innerText)

  switch (operation) {
    case 'subtraction':
      if (productQuantity > 1) {
        subtotalProductELement.innerText = (subtotalProduct - productPrice).toFixed(2)
        subtotal.element.innerHTML = (subtotal.value - productPrice).toFixed(2)
        adjustRate()
        adjustTotalPrice()
        productQuantityElement.innerText = productQuantity - 1
      }
      break
    case 'addition':
      subtotalProductELement.innerText = (subtotalProduct + productPrice).toFixed(2)
      subtotal.element.innerHTML = (subtotal.value + productPrice).toFixed(2)
      adjustRate()
      adjustTotalPrice()
      productQuantityElement.innerText = productQuantity + 1
      break
  }
}

function deleteProductFromCookie (productId) {
  const productsCart = Cookie.get('products_cart') || []

  const products = typeof productsCart === 'string'
    ? JSON.parse(productsCart)
    : productsCart

  const remainingProducts = products.filter(product => product !== productId)

  Cookie.set('products_cart', JSON.stringify(remainingProducts))
}

function removeProductFromCart (element) {
  const productCard = element.closest('.js-product-card')
  const productId = productCard.querySelector('.js-product-id').value
  const cartQuantity = getElementData('.js-cart-quantity')

  deleteProductFromCookie(productId)
  cartQuantity.element.innerHTML = cartQuantity.value - 1
  productCard.remove()
}

// // Atualiza dados do produto no carrinho
// function updateLocalStorageCart(element) {
//   let productElement = element.parentElement.parentElement.parentElement.parentElement
//   let productQuantity = Number(productElement.querySelector('.quantity__value').innerHTML)
//   let productsCart = JSON.parse(localStorage.getItem('cart'))
//   let productId = productElement.querySelector('input[name=product-id]').value

//   let updateProductsCart = productsCart.map(function(product){
//     if(productId == product.id) {
//       product.quantity = productQuantity
//     }
//     return product
//   })

//   localStorage.setItem('cart', JSON.stringify(updateProductsCart))
// }

// function updatePriceTotalCart(element) {
//   let productElement = element.parentElement.parentElement
//   let cartTotalPriceElement = document.querySelector('#cart-total-price')
//   let checkoutTotalPriceElement = document.querySelector('#checkout_total')

//   let cartTotalPriceValue = Number(cartTotalPriceElement.innerHTML)
//   let productSubtotal = Number(productElement.querySelector('#subtotal').innerHTML)

//   cartTotalPriceElement.innerHTML = (cartTotalPriceValue - productSubtotal).toFixed(2)
//   checkoutTotalPriceElement.innerHTML = (cartTotalPriceValue - productSubtotal).toFixed(2)
// }

// // Remove produto do carrinho
// document.querySelectorAll('.item__actions .delete').forEach(function(element) {
//   element.addEventListener('click', function(event) {
//     event.preventDefault()
//     let products = JSON.parse(localStorage.getItem('cart'))
//     let productData = this.parentElement.parentElement
//     let productId = productData.querySelector('input[name=product-id]').value
//     let cartQuantityElement = document.querySelector('#cart-quantity')
//     let cartQuantityValue = Number(cartQuantityElement.innerHTML)

//     let updatedProducts = products.filter(function(product){
//       if (product.id != productId) {
//         return product
//       }
//     })

//     localStorage.setItem('cart', JSON.stringify(updatedProducts))
//     cartQuantityElement.innerHTML = cartQuantityValue - 1
//     updatePriceTotalCart(this)
//     productData.remove()
//     if(cartQuantityElement.innerHTML == 0) {
//       renderDivCartEmpty()
//       document.querySelector('.shoping__checkout').remove()
//     }
//   })
// })
document.querySelectorAll('.js-delete-product').forEach((element) => {
  element.addEventListener('click', () => removeProductFromCart(element))
})

// // Aumenta a quantidade de um produto da lista
document.querySelectorAll('.js-button-more').forEach((element) => {
  element.addEventListener('click', () => {
    updateTotalAndSubtotalPrice(element, 'addition')
    // updateLocalStorageCart(this)
  })
})

// Diminui a quantidade de um produto da lista
document.querySelectorAll('.js-button-less').forEach((element) => {
  element.addEventListener('click', () => {
    updateTotalAndSubtotalPrice(element, 'subtraction')
    // updateLocalStorageCart(this)
  })
})

loadProductsCart()
updateSubtotalOfProducts()
updateSummary()
