
export function cleanPrice (price) {
  return Number(
    price
      .replace('R$ ', '')
      .replace(/\./g, '')
      .replace(',', '.')
  )
}
