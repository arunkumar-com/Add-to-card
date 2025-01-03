
import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [count,setcount]=useState(0);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
    setcount(count+1);
    console.log(count);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
    setcount(count-1);
    console.log(count);
   };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      <div>
        <h2>Cart:{count}</h2>
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.title} - ${item.price}
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
        <h3>Total: ${total.toFixed(2)}</h3>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: "1px solid #ccc", padding: "10px", width: "200px" }}>
            <img src={product.image} alt={product.title} style={{ width: "100%", height: "150px" }} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
