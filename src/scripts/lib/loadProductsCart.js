import { get } from 'js-cookie'

export default function loadProductsCart () {
  window.addEventListener('load', function () {
    const cartQuantity = document.querySelector('.js-cart-quantity')

    const productsCart = get('products_cart') || []

    const quantityProducts = typeof productsCart === 'string'
      ? (JSON.parse(productsCart)).length
      : productsCart.length

    cartQuantity.innerHTML = quantityProducts
  })
}
