import Cookie from 'js-cookie'
import calculateCartQuantity from './lib/calculateCartQuantity'

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
  const { subtotal } = getSummaryData()

  // verficar se tem produtos

  const subtotalSum = subtotalElements.reduce((prev, { innerHTML }) => {
    return prev + Number(innerHTML)
  }, 0)

  subtotal.element.innerHTML = (subtotalSum).toFixed(2)
  adjustRate()
  adjustTotalPrice()
}

function getSummaryData () {
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
  // Somente para elementos do tipo Number
  if (typeof selector === 'string') {
    return {
      element: document.querySelector(selector),
      value: Number(document.querySelector(selector).innerHTML)
    }
  } else if (selector instanceof window.HTMLElement) {
    return {
      element: selector,
      value: Number(selector.innerHTML)
    }
  }
}

function adjustRate () {
  const { subtotal, rate } = getSummaryData()

  rate.element.innerHTML = subtotal.value >= 50
    ? (0).toFixed(2)
    : (5).toFixed(2)
}

function adjustTotalPrice () {
  const { subtotal, rate, total } = getSummaryData()

  total.element.innerHTML = (subtotal.value + rate.value).toFixed(2)
}

function updateTotalAndSubtotalPrice (element, operation) {
  const productElement = element.closest('.js-product-info')

  const subtotalProduct = getElementData(productElement.querySelector('.js-product-subtotal'))
  const productPrice = getElementData(productElement.querySelector('.js-product-price'))
  const productQuantity = getElementData(productElement.querySelector('.js-product-quantity'))

  const { subtotal } = getSummaryData()

  switch (operation) {
    case 'subtraction':
      if (productQuantity.value > 1) {
        subtotalProduct.element.innerHTML = (subtotalProduct.value - productPrice.value).toFixed(2)
        subtotal.element.innerHTML = (subtotal.value - productPrice.value).toFixed(2)
        adjustRate()
        adjustTotalPrice()
        productQuantity.element.innerHTML = productQuantity.value - 1
      }
      break
    case 'addition':
      subtotalProduct.element.innerHTML = (subtotalProduct.value + productPrice.value).toFixed(2)
      subtotal.element.innerHTML = (subtotal.value + productPrice.value).toFixed(2)
      adjustRate()
      adjustTotalPrice()
      productQuantity.element.innerHTML = productQuantity.value + 1
      break
  }
}

function deleteProductFromCookie (productId) {
  const productsCart = Cookie.getJSON('products_cart') || []

  const remainingProducts = productsCart.filter(product => product !== productId)

  Cookie.set('products_cart', JSON.stringify(remainingProducts))
}

function removeProductFromCart (element) {
  const productCard = element.closest('.js-product-card')
  const productId = productCard.querySelector('.js-product-id').value
  const cartQuantity = getElementData('.js-cart-quantity')

  deleteProductFromCookie(productId)
  cartQuantity.element.innerHTML = cartQuantity.value - 1
  productCard.remove()
  updateSummary()
}

// Listeners
document.querySelectorAll('.js-delete-product').forEach((element) => {
  element.addEventListener('click', () => removeProductFromCart(element))
})

// Aumenta a quantidade de um produto da lista
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

calculateCartQuantity()
updateSubtotalOfProducts()
updateSummary()
