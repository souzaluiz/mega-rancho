export function numberForString (number) {
  return Intl.NumberFormat('pt-BR',
    { style: 'currency', currency: 'BRL' }
  ).format(number)
}

export function centsForNumber (number) {
  const cents = number.toString().replace(/(?!^-)[^0-9]/g, '')
  return parseInt(cents) / 100
}
