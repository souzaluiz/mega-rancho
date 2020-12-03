const Modal = (props) => {
  return (
		<div className="loading" style={{display: props.display}}>
      <div className="loader" style={{display: props.display}}></div>
    </div>
  )
}