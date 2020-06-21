let cartProducts = JSON.parse(localStorage.getItem('cart')) || []

cartProducts.forEach(function(product){
  let total = (product.price * product.quantity).toFixed(2)

  $('#list_products').append(`
    <li>- ${product.quantity}x ${product.name}   <span>R$ ${total}</span></li>
  `)
})

$("#order-details-form").submit(function(event) {
  event.preventDefault()
  let clientName = this.querySelector('#client_name').value
  let addres = this.querySelector('#addres').value
  let complement = this.querySelector('#complement').value
  let telephone = this.querySelector('#telephone').value.replace(/[^\d]/g, "")

  const clientInfo = {
    name: clientName,
    addres,
    complement,
    telephone,
  }

  let data = {
    clientInfo,
    products: cartProducts,
  }

  $.ajax({
    url: '/order',
    type: 'post',
    data: data
  }).done(function(data, statusText, xhr){
    let status = xhr.status

    if(status === 200) {
      localStorage.removeItem('cart')
      $(".loader").fadeOut()
      $(".modal__information").fadeIn()
      $(".modal__information span").text('Pedido realizado com sucesso, dentro de alguns minutos seus produtos serão entregues.')
    }      
  }).fail(function(){
    $(".loader").fadeOut()
    $(".modal__information").fadeIn()
    $(".modal__information span").text('Desculpe, um erro aconteceu, tente novamente dentro de alguns minutos')
  })

  $(".loader").fadeIn()
	$(".loader__checkout").delay(200).fadeIn("slow")  
})

function maskTelephone(input) {
  let cpf = input.value.replace(/[^\d]/g, "")

  switch (cpf.length) {
    case 2:
      return input.value = cpf.replace(/(\d{2})/g, "(\$1)")
    case 3:
      return input.value = cpf.replace(/(\d{2})(\d{1})/g, "(\$1) \$2")
    case 7:
      return input.value = cpf.replace(/(\d{2})(\d{1})(\d{4})/g, "(\$1) \$2 \$3-")
    case 11:
      return input.value = cpf.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/g, "(\$1) \$2 \$3-\$4")
  }
}
