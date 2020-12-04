import Cookie from 'js-cookie'
import calculateCartQuantity from './lib/calculateCartQuantity'

const products = document.querySelectorAll('.js-product-card')

function addToCart (productId) {
  const cartQuantity = document.querySelector('.js-cart-quantity')

  const productsCart = Cookie.getJSON('products_cart') || []

  const isProductExists = productsCart.includes(productId)

  if (!isProductExists) {
    productsCart.push(productId)
    Cookie.set('products_cart', JSON.stringify(productsCart), { expires: 2 })
    cartQuantity.innerHTML = Number(cartQuantity.innerText) + 1
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
