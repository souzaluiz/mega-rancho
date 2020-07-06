module.exports = {
  formatMessage(data) {
    const { clientInfo, products} = data

    let total = 0
    let message = ''
    message += 'CNPJ: 36.936718/0001-31\n'
    message += 'END: AV CEL GARCIA 90 - SILVEZ/AM\n'
    message += 'TEL/WHATSAPP (92) 99370-1488\n'
    message += 'SITE: RANCHO-ONLINE.UMBLER.NET\n\n'

    message += 'Informações do cliente\n\n'
    message += `Nome: ${clientInfo.name}\n`
    message += `Endereço: ${clientInfo.addres}\n`

    if(clientInfo.complement !== "") {
      message += `Complemento: ${clientInfo.complement}\n`
    }
    message += `Telefone: ${clientInfo.telephone}\n\n`

    message += 'Produtos\n'

    products.forEach(item => {
      const subtotal = Number((item.quantity * item.price).toFixed(2))
      message += `- ${item.quantity}x ${item.name}\n`
      total += Number((item.quantity * item.price).toFixed(2))
      message += `  - VL Unit: ${(item.price).toFixed(2)} | VL Total: R$ ${(subtotal).toFixed(2)}\n\n`
    })

    message += `Total a pagar: R$ ${(total).toFixed(2)}`

    return message
  }
}