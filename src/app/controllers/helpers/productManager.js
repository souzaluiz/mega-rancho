import { numberForString } from './money'

function productManager () {
  function toClean ({ id, name, price, imageId, imageUrl }) {
    return { id, name, price: numberForString(price), imageId, imageUrl }
  }

  return { toClean }
}

export default productManager()
