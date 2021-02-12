import '../sass/checkout.scss'

import calculateCartQuantity from './lib/calculateCartQuantity'
import { getElementData } from './lib/elementManager'

function setProductsListOnForm () {
  const productsList = getElementData('.js-products-list')
  const productsCart = window.localStorage.getItem('@products_cart') || []

  productsList.element.value = productsCart
}

setProductsListOnForm()
calculateCartQuantity()
