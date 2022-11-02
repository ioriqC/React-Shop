
function CartItem(props) {
  const {
    id,
    name,
    price,
    quantity,
    removeFromCart = Function.prototype,
    incQuantity = Function.prototype,
    decQuantity = Function.prototype,
  } = props;

  return <li className="collection-item">
    
    {name} 
    <i className="material-icons cart-quantity" onClick={()=> decQuantity(id)}>remove</i> 
    x 
    {quantity} 
    <i className="material-icons cart-quantity" onClick={()=> incQuantity(id)}>add</i> 
    = {price * quantity} $
    
    <span className="secondary-content" onClick={() => removeFromCart(id)}>
      <i className="material-icons cart-clear" >clear</i>
    </span>
    </li>
  
}

export {CartItem};