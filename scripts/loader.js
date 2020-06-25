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
})	

//Humberger Menu
document.querySelector('.humberger__open').addEventListener('click', function() {
  document.querySelector('.humberger__menu__wrapper').classList.add('show__humberger__menu__wrapper')
  document.querySelector('.humberger__menu__overlay').classList.add('active')
  document.querySelector('body').classList.add('over_hid')
})

document.querySelector('.humberger__menu__overlay').addEventListener('click', function() {
  document.querySelector('.humberger__menu__wrapper').classList.remove('show__humberger__menu__wrapper')
  document.querySelector('.humberger__menu__overlay').classList.remove('active')
  document.querySelector('body').classList.add('over_hid')
})

function fadeOut(element){
  element.style.opacity = 1;

  (function fade() {
    if ((element.style.opacity -= .1) < 0) {
      element.style.display = "none";
    } else {
      requestAnimationFrame(fade);
    }
  })();
}