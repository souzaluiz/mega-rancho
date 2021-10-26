export default function formatMessage (clientInfo, products) {
  let total = 0
  let message = ''

  message += 'CNPJ: 99.999999/9999-99\n'
  message += 'SEU ENDEREÇO - CIDADE/UF\n'
  message += 'TEL/WHATSAPP (92) 9 99999-9999\n'
  message += 'SITE: URL-SITE\n\n'

  message += 'Informações do cliente\n\n'
  message += `Nome: ${clientInfo.name}\n`
  message += `Endereço: ${clientInfo.addres}\n`

  if (clientInfo.complement.trim()) {
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
