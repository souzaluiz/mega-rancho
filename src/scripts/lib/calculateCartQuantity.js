import { getJSON } from 'js-cookie'

export default function calculateCartQuantity () {
  window.addEventListener('load', function () {
    const cartQuantity = document.querySelector('.js-cart-quantity')

    const productsCart = getJSON('products_cart') || []
    console.log(productsCart)

    cartQuantity.innerHTML = productsCart.length
  })
}
