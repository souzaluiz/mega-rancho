import '../sass/products.scss'

import Cookie from 'js-cookie'
import calculateCartQuantity from './lib/calculateCartQuantity'
import { getElementData } from './lib/elementManager'

const products = document.querySelectorAll('.js-product-card')

function addToCart (productId) {
  const cartQuantity = getElementData('.js-cart-quantity')

  const productsCart = Cookie.getJSON('products_cart') || []
  const producstCartLocal = JSON.parse(window.localStorage.getItem('@products_cart')) || []

  const isProductExists = productsCart.includes(productId)

  if (!isProductExists) {
    const product = {
      id: productId,
      quantity: 1
    }

    productsCart.push(product.id)
    producstCartLocal.push(product)
    Cookie.set('products_cart', JSON.stringify(productsCart), { expires: 1 })
    window.localStorage.setItem('@products_cart', JSON.stringify(producstCartLocal))
    cartQuantity.element.innerHTML = cartQuantity.value + 1
  }
}

function addEventInProducts (products) {
  products.forEach(element => {
    const addToCartButton = element.querySelector('.js-cart-button')
    const productId = element.querySelector('.js-product-id').value

    addToCartButton.addEventListener('click', () => addToCart(productId))
  })
}

calculateCartQuantity()
addEventInProducts(products)
