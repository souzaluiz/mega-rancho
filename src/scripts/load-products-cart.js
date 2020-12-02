import Cookie from 'js-cookie'

window.addEventListener('load', function () {
  const cartQuantity = document.querySelector('.js-cart-quantity')

  const productsCart = Cookie.get('products-cart') || []

  const quantityProducts = typeof productsCart === 'string'
    ? (JSON.parse(productsCart)).length
    : productsCart.length

  cartQuantity.innerHTML = quantityProducts
})
