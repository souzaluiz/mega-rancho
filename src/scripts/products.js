import Cookie from 'js-cookie'

const products = document.querySelectorAll('.js-product-card')

function addToCart (productId) {
  const cartQuantity = document.querySelector('.js-cart-quantity')

  const productsCart = Cookie.get('products-cart') || []

  const products = typeof productsCart === 'string'
    ? JSON.parse(productsCart)
    : productsCart

  const isProductExists = products.includes(productId)

  if (!isProductExists) {
    products.push(productId)
    Cookie.set('products-cart', JSON.stringify(products), { expires: 2 })
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

addEventInProducts(products)
