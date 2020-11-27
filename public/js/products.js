// const products = document.querySelectorAll('.product__item')

// // Percorre todos os produtos para adicionar eventos de click
// addEventInElements(products)

// function addEventInElements(products) {
//   products.forEach(function(element) {
//     const buttonAnyLess = element.querySelector('.product__quantity .any__less')
//     const buttonMore = element.querySelector('.product__quantity .more')
//     const productQuantityElement = element.querySelector('.product__quantity .quantity__value')
//     const addToCartButton = element.querySelector('#add__product__to__cart')

//     buttonAnyLess.addEventListener('click', function () {
//       let quantityValue = Number(productQuantityElement.innerHTML)
//       if(quantityValue > 1) {
//         productQuantityElement.innerHTML = quantityValue - 1
//       }
//     })

//     buttonMore.addEventListener('click', function () {
//       let quantityValue = Number(productQuantityElement.innerHTML)
//       productQuantityElement.innerHTML = quantityValue + 1
//     })

//     addToCartButton.addEventListener('click', function () {
//       // Informações do carrinho
//       const cartQuantityElement = document.querySelector('#cart-quantity')
//       const totalPriceElement = document.querySelector('#cart-total-price')
//       // Informações do produto
//       const productId = element.querySelector('input[name=product-id]').value
//       const productName = element.querySelector('.product__item__text h6 a').innerHTML
//       const productPrice = Number(element.querySelector('.product__item__text h5 span').innerHTML)
//       const productImage = element.querySelector('.product__item .product__item__pic img').getAttribute('src')
//       const productQuantity = Number(productQuantityElement.innerHTML)

//       const cartQuantity = Number(cartQuantityElement.innerHTML)
//       const totalPrice = Number(totalPriceElement.innerHTML)
//       const productsCart = JSON.parse(localStorage.getItem('cart')) || []
//       let productExists = false

//       const updatedProducts = productsCart.map(function (item) {
//         if(item.id == productId) {
//           productExists = true
//           item.quantity += productQuantity
//         }
//         return item
//       })

//       const priceTotalProduct = Number((productPrice * productQuantity).toFixed(2))

//       if(productExists) {
//         localStorage.setItem('cart', JSON.stringify(updatedProducts))
//         totalPriceElement.innerHTML = (totalPrice + priceTotalProduct).toFixed(2)
//         productQuantityElement.innerHTML = 1
//       } else {
//         const productInfo = [
//           ...productsCart,
//           {
//             id: productId,
//             name: productName,
//             price: productPrice,
//             image: productImage,
//             quantity: productQuantity
//           }
//         ]

//         localStorage.setItem('cart', JSON.stringify(productInfo))
//         cartQuantityElement.innerHTML = cartQuantity + 1
//         totalPriceElement.innerHTML = (totalPrice + priceTotalProduct).toFixed(2)
//         productQuantityElement.innerHTML = 1
//       }
//     })
//   })
// }
