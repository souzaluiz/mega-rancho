import '../sass/shooping-cart.scss'

import Cookie from 'js-cookie'
import calculateCartQuantity from './lib/calculateCartQuantity'
import { getElementData } from './lib/elementManager'
import { numberForMoney, centsForNumber } from './lib/money'

function updateSubtotalOfProducts () {
  const products = document.querySelectorAll('.js-product-card')

  products.forEach((product) => {
    const quantity = getElementData(product.querySelector('.js-product-quantity'))
    const price = getElementData(product.querySelector('.js-product-price'))
    const subtotal = getElementData(product.querySelector('.js-product-subtotal'))

    const subtotalSum = (centsForNumber(price.text) * quantity.value)
    subtotal.element.innerHTML = numberForMoney(subtotalSum)
  })
}

function setQuantityProductsInLocalStorage () {
  const productsCard = [...document.querySelectorAll('.js-product-card')]

  const productsInfo = productsCard.map((product) => {
    const quantity = getElementData(product.querySelector('.js-product-quantity'))
    const id = getElementData(product.querySelector('.js-product-id'))

    return {
      quantity: quantity.value,
      id: id.element.value
    }
  })

  window.localStorage.setItem('@products_cart', JSON.stringify(productsInfo))
}

function setQuantityProducts () {
  const products = JSON.parse(window.localStorage.getItem('@products_cart')) || []

  const productsCard = document.querySelectorAll('.js-product-card')

  productsCard.forEach((product) => {
    const quantity = getElementData(product.querySelector('.js-product-quantity'))
    const id = getElementData(product.querySelector('.js-product-id'))

    products.forEach(productInfo => {
      if (productInfo.id === id.element.value) {
        quantity.element.innerHTML = productInfo.quantity
      }
    })
  })
}

function showCartEmpty () {
  const shoopingCart = getElementData('.js-shooping-cart')
  const cartEmpty = getElementData('.js-cart-empty')

  shoopingCart.element.classList.add('is-hidden')
  cartEmpty.element.classList.add('is-visible')
}

function updateSummary () {
  const subtotalElements = [...document.querySelectorAll('.js-product-subtotal')]
  const { subtotal } = getSummaryData()

  if (!subtotalElements.length) {
    showCartEmpty()
  }

  const subtotalSum = subtotalElements.reduce((prev, { innerHTML }) => {
    return (prev + centsForNumber(innerHTML))
  }, 0)

  subtotal.element.innerHTML = numberForMoney(subtotalSum)
  adjustRate()
  adjustTotalPrice()
  setQuantityProductsInLocalStorage()
}

function getSummaryData () {
  return {
    subtotal: getElementData('.js-subtotal'),
    total: getElementData('.js-total'),
    rate: getElementData('.js-rate')
  }
}

function adjustRate () {
  const { subtotal, rate } = getSummaryData()

  rate.element.innerHTML = centsForNumber(subtotal.text) >= 50
    ? numberForMoney(0)
    : numberForMoney(5)
}

function adjustTotalPrice () {
  const { subtotal, rate, total } = getSummaryData()

  total.element.innerHTML = numberForMoney(
    (centsForNumber(subtotal.text) + centsForNumber(rate.text))
  )
}

function getProductInfo (element) {
  const productElement = element.closest('.js-product-info')

  const subtotalProduct = getElementData(productElement.querySelector('.js-product-subtotal'))
  const productPrice = getElementData(productElement.querySelector('.js-product-price'))
  const productQuantity = getElementData(productElement.querySelector('.js-product-quantity'))

  return {
    subtotalProduct,
    subtotalValue: centsForNumber(subtotalProduct.text),
    productPrice: centsForNumber(productPrice.text),
    productQuantity
  }
}

function decreaseQuantityProducts (event) {
  const {
    productPrice,
    subtotalValue,
    productQuantity,
    subtotalProduct
  } = getProductInfo(event.target)

  if (productQuantity.value > 1) {
    subtotalProduct.element.innerHTML = numberForMoney(subtotalValue - productPrice)
    productQuantity.element.innerHTML = productQuantity.value - 1
    updateSummary()
  }
}

function increaseQuantityProducts (event) {
  const {
    productPrice,
    subtotalValue,
    productQuantity,
    subtotalProduct
  } = getProductInfo(event.target)

  subtotalProduct.element.innerHTML = numberForMoney(subtotalValue + productPrice)
  productQuantity.element.innerHTML = productQuantity.value + 1
  updateSummary()
}

function deleteProductFromCookie (productId) {
  const productsCart = Cookie.getJSON('products_cart') || []

  const remainingProducts = productsCart.filter(product => product !== productId)

  Cookie.set('products_cart', JSON.stringify(remainingProducts), { expires: 2 })
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

document.querySelectorAll('.js-delete-product').forEach((element) => {
  element.addEventListener('click', () => removeProductFromCart(element))
})

// Aumenta a quantidade de um produto da lista
document.querySelectorAll('.js-button-more').forEach((element) => {
  element.addEventListener('click', increaseQuantityProducts)
})

// Diminui a quantidade de um produto da lista
document.querySelectorAll('.js-button-less').forEach((element) => {
  element.addEventListener('click', decreaseQuantityProducts)
})

calculateCartQuantity()
setQuantityProducts()
updateSubtotalOfProducts()
updateSummary()
