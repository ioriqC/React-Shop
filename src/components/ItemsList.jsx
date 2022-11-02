import { Item } from "./Item";
function ItemsList(props) {
  const { items = [], addToCart = Function.prototype } = props;

  if (!items.length) {
    return <h3>Nothing Here!</h3>
  }
  return <div className="items">
    {
      items.map((item) => (
        <Item key={item.id} {...item} addToCart={addToCart} />
      ))
    }
  </div>
}

export { ItemsList };