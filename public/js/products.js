const products = document.querySelectorAll('.product__item')

products.forEach(function (element) {
  const buttonAnyLess = element.querySelector('.product__quantity .any__less')
  const buttonMore = element.querySelector('.product__quantity .more')
  const productQuantityElement = element.querySelector('.product__quantity .quantity__value')
  const addToCartButton = element.querySelector('.add__to__cart')
  
  buttonAnyLess.addEventListener('click', function () {
    let quantityValue = Number(productQuantityElement.innerHTML)
    if(quantityValue > 1) {
      productQuantityElement.innerHTML = quantityValue - 1
    }
  })

  buttonMore.addEventListener('click', function () {
    let quantityValue = Number(productQuantityElement.innerHTML)
    productQuantityElement.innerHTML = quantityValue + 1
  })
  
  addToCartButton.addEventListener('click', function () {
    // Informações do carrinho
    const cartQuantityElement = document.querySelector('#cart-quantity')
    const totalPriceElement = document.querySelector('#cart-total-price')
    // Informações do produto
    const productId = element.querySelector('.id__product').innerHTML
    const productName = element.querySelector('.product__item__text h6 a').innerHTML
    const productPrice = Number(element.querySelector('.product__item__text h5 span').innerHTML)
    const productImage = element.querySelector('.product__item .product__item__pic').getAttribute('data-setbg')
    const productQuantityValue = Number(productQuantityElement.innerHTML)

    const cartQuantityValue = Number(cartQuantityElement.innerHTML)
    const totalPriceValue = Number(totalPriceElement.innerHTML)
    const productsCart = JSON.parse(localStorage.getItem('cart')) || []
    let productExists = false

    const updatedProducts = productsCart.map(function (item) {
      if(item.productId == productId) {
        productExists = true
        item.productQuantityValue += productQuantityValue   
      }
      return item
    })

    const priceTotalProduct = Number((productPrice * productQuantityValue).toFixed(2))

    if(productExists) {
      localStorage.setItem('cart', JSON.stringify(updatedProducts))
      totalPriceElement.innerHTML = (totalPriceValue + priceTotalProduct).toFixed(2)
      productQuantityElement.innerHTML = 1
    } else {
      const productInfo = [
        ...productsCart,
        {
          productId,
          productName,
          productPrice,
          productImage,
          productQuantityValue
        }
      ]
  
      localStorage.setItem('cart', JSON.stringify(productInfo))
      cartQuantityElement.innerHTML = cartQuantityValue + 1
      totalPriceElement.innerHTML = (totalPriceValue + priceTotalProduct).toFixed(2)
      productQuantityElement.innerHTML = 1
    }
  })
})