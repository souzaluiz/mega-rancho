const totalPages = Number(document.querySelector('input[name=total_pages]').value)

function fadeOut(element){
  element.style.opacity = 1;

  (function fade() {
    if ((element.style.opacity -= .1) < 0) {
      element.style.display = "none";
    } else {
      requestAnimationFrame(fade);
    }
  })()
}

function fadeIn(element, display){
  element.style.opacity = 0;
  element.style.display = display || "block";

  (function fade() {
    let val = parseFloat(element.style.opacity);
    if (!((val += .1) > 1)) {
      element.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })()
}

const Products = () => {
  const [currentPage, setCurrentPage] = React.useState(1)
  const [products, setProducts] = React.useState([])
  const [more, setMore] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    fetch(`/products?page=${currentPage}`)
      .then(response => {
        response.json().then(data => {
          setProducts(data)
          if(totalPages > 1) {
            setMore(true)
            setCurrentPage(currentPage + 1)
          }
        })
      })
  }, [])

  function getMoreProducts() {    
    fetch(`/products?page=${currentPage}`)
      .then(response => {
        response.json().then(data => {
          if(currentPage <= totalPages) {
            if(currentPage === totalPages) {
              setMore(false)
            } else {
              setCurrentPage(currentPage + 1)
            }
          }
          setProducts([...products, ...data])
        })
      })
  }

  function deleteProduct(id) {
    fetch(`/products/${id}`, { method: 'DELETE' })
      .then((response) => {
        if(response.status === 200) {
          const productsFiltered = products.filter(item => {
            if (item._id !== id) {
              return item
            }
          })
          setTimeout(() => {
            setLoading(false)
            setProducts(productsFiltered)
          }, 200)
        } else {
          alert('Falha ao excluir produto.')
        }
      })
    setLoading(true) 
  }

  return (
    <>
      {
        products.map(product => (
          <div className="product__content">
            <input type="hidden" name="product-id" value={product._id}/>
            
            <div className="product__image">
              <img src={`/uploads/${product.image}`} />
            </div>

            <div className="product__information">
              <span className="name">{product.name}</span>
              <span className="price">R$ {(product.price).toFixed(2)}</span>

              <div className="information__actions">
                <button 
                  className="actions__edit" 
                  onClick={() => {location.href = `/edit-product/${product._id}`}}
                >Editar</button>
                <button 
                  className="actions__delete"
                  onClick={() => deleteProduct(product._id)}
                >Excluir</button>
              </div>
            </div>
          </div>
        ))
      }
      {(more)? (
        <div className="more-products">
          <button 
            className="button__black" 
            onClick={getMoreProducts}
          >Mais produtos</button>
        </div>
      ): null} 

      {(loading) ? (
        <div className="loading">
          <div className="loader"></div>
        </div>
      ): null}     
    </>
  )
}

ReactDOM.render(<Products/>, document.querySelector('#list-products'))