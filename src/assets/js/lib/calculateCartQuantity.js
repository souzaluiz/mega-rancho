import { getJSON } from 'js-cookie'

export default function calculateCartQuantity () {
  window.addEventListener('load', function () {
    const cartQuantity = document.querySelector('.js-cart-quantity')

    const productsCart = getJSON('products_cart') || []

    cartQuantity.innerHTML = productsCart.length
  })
}
