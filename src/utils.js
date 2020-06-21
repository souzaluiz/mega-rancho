
function formatMessage(data) {
  const { clientInfo, products} = data

  let total = 0
  let message = ''
  message += 'Novo pedido realizado!\n\n'
  message += `Nome: ${clientInfo.name}\n`
  message += `Endereço: ${clientInfo.addres}\n`

  if(clientInfo.complement !== "") {
    message += `Complemento: ${clientInfo.complement}\n`
  }
  message += `Telefone: ${clientInfo.telephone}\n\n`

  message += 'Produtos\n'

  products.forEach(item => {
    message += `- ${item.quantity}x ${item.name}\n`
    total += Number((item.quantity * item.price).toFixed(2))
  })

  message += `\nTotal: R$ ${(total).toFixed(2)}`

  return message
}

module.exports = {
  formatMessage
}