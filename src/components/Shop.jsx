import { useState, useEffect } from "react";
import { API_URL, API_KEY } from "../config";

import { Preloader } from "./Preloader";
import { ItemsList } from "./ItemsList";
import { Cart } from "./Cart";
import { CartList } from "./CartLIst";


function Shop() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);
  const [isCartShow, setCartShow] = useState(false);

  const handleCartShow = () => {
    setCartShow(!isCartShow);
  }

  const addToCart = (item) => {
    const itemIndex = order.findIndex(
      (orderItem) => orderItem.id === item.id
    );

    if (itemIndex < 0) {
      const newItem = {
        ...item,
        quantity: 1,
      };
      setOrder([...order, newItem]);
    } else {
      const newOrder = order.map(
        (orderItem, index) => {
          if (index === itemIndex) {
            return {
              ...orderItem,
              quantity: orderItem.quantity + 1,
            };
          } else {
            return orderItem;
          }
        }
      );
      setOrder(newOrder);
    } 
  };

  const removeFromCart = (itemId) => {
    const newOrder = order.filter(el => el.id !== itemId);
    setOrder(newOrder);
  }

  const incQuantity = (itemId) => {
    const newOrder = order.map(el => {
      if(el.id === itemId) {
        const newQuantity = el.quantity + 1;
        return {
            ...el,
            quantity: newQuantity,
        }
      } else {
        return el;
      }
    });
    setOrder(newOrder);
  }

  const decQuantity = (itemId) => {
    const newOrder = order.map(el => {
      if(el.id === itemId) {
        const newQuantity = el.quantity - 1;
        return {
            ...el,
            quantity: newQuantity >=0 ? newQuantity : 0, 
        }
      } else {
        return el;
      }
    });
    setOrder(newOrder);
  }

  useEffect(function getItems() {
    fetch(API_URL, {
      headers: {
        'Authorization': API_KEY,
      },
    }).then(response => response.json()).then(data => {
      data.featured && setItems(data.featured);
      setLoading(false);
    });
  }, []);

  return (
    <main className="container content">
      <Cart quantity={order.length} handleCartShow={handleCartShow} />
      {
        loading ? <Preloader /> : <ItemsList items={items} addToCart={addToCart} />
      }
      {
        isCartShow && (
          <CartList 
            order={order} 
            handleCartShow={handleCartShow} 
            removeFromCart={removeFromCart}
            incQuantity={incQuantity}
            decQuantity={decQuantity}/>
        )
      }
    </main>
  );
}

export {Shop};