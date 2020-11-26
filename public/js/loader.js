window.addEventListener('load', function() {
  fadeOut(document.querySelector('.loader'))
  fadeOut(document.querySelector('#preloder'))

  // Load cart info
  //localStorage.removeItem('cart')
  const productsCart = JSON.parse(localStorage.getItem('cart')) || []
  const quantityProducts = productsCart.length
  let totalProducts = 0

  productsCart.forEach(function (item) {
    totalProducts += Number((item.price * item.quantity).toFixed(2))
  })

  document.querySelector('#cart-quantity').innerHTML = quantityProducts
  document.querySelector('#cart-total-price').innerHTML = (totalProducts).toFixed(2)
  let checkoutTotal = document.querySelector('#checkout_total')
  if(checkoutTotal) {
    checkoutTotal.innerHTML = (totalProducts).toFixed(2)
  }
})