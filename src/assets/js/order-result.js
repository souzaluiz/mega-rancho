import '../sass/order-result.scss'

import Cookie from 'js-cookie'
import calculateCartQuantity from './lib/calculateCartQuantity'

const isSucess = document.querySelector('.js-completed-order').value

if (isSucess === 'true') {
  Cookie.remove('products_cart')
  window.localStorage.removeItem('@products_cart')
} else {
  calculateCartQuantity()
}
