export function numberForString (number) {
  return Intl.NumberFormat('pt-BR',
    { style: 'currency', currency: 'BRL' }
  ).format(number)
}
