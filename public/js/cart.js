const products = JSON.parse(localStorage.getItem('cart')) || []

products.forEach(function(product) {
    $('.products__cart') .append(`
    <div class="item__cart">
      <span style="display: none;">${product.productId}</span>
      <div class="header__item">
        <img src="${product.productImage}" alt="">
        <span>${product.productName}</span>
      </div>
      <div class="item__content">
        <div class="item__price">
          <span>Preço</span>
          <span>R$ ${(product.productPrice).toFixed(2)}</span>
        </div>
        <div class="item__quantity">
          <span>Quantidade</span>
          <input type="number" value="${product.productQuantityValue}">
        </div>
        <div class="item__subtotal">
          <span>Subtotal</span>
          <span>R$ 34.56</span>
        </div>
      </div>
      <div class="item__actions">
        <button class="edit">Editar</button>
        <button class="delete">Excluir</button>
      </div>
    </div>
  `) 
})

// Remove produto do carrinho
$('.item__actions .delete').click(function(event) {
  event.preventDefault()
  let products = JSON.parse(localStorage.getItem('cart')) || []
  let productData = this.parentElement.parentElement
  let productId = productData.querySelector('span').innerHTML
  
  let updatedProducts = products.filter(function(product){
    if (product.productId != productId) {
      return product
    }
  })

  localStorage.setItem('cart', JSON.stringify(updatedProducts))
  productData.remove()
})