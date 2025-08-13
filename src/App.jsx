import { useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [desserts, setDesserts] = useState([]);
  useEffect(() => {
    fetch("https://json-api.uz/api/project/dessertss/desserts")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          setDesserts(data.data);
          console.log(data);
        } else {
          console.error("API formati kutilganidek emas:", data);
        }
      })
      .catch((err) => console.error("Xato:", err));
  }, []);

  let handleAdd = (id) => {
    setCount((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  let handleMinus = (id) => {
    setCount((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0),
    }));
  };

  return (
    <div className="container two">
      <div className="cards-container">
        <h1 className="title">Dessert</h1>
        <div className="cards">
          {desserts.map((dessert) => (
            <div key={dessert.id} className="card">
              <img
                className="card_img"
                src={dessert.image.desktop}
                alt={dessert.name}
              />
              {!count[dessert.id] ? (
                <button className="btn" onClick={() => handleAdd(dessert.id)}>
                  <img src="/images/icon-add-to-cart.svg" alt="" /> Add to Cart
                </button>
              ) : (
                <div className="btn btn-secend">
                  <button onClick={() => handleMinus(dessert.id)}>
                    &#8722;
                  </button>
                  <span>{count[dessert.id]}</span>
                  <button onClick={() => handleAdd(dessert.id)}> &#43;</button>
                </div>
              )}
              <p className="card_description">{dessert.category}</p>
              <h3 className="card_name"> {dessert.name}</h3>

              <p className="card_price">
                <b>{dessert.price} </b>
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="your-cart">
        <h2 className="your-cart_title">
          {" "}
          Your Cart ({Object.values(count).reduce((a, b) => a + b, 0)} items)
        </h2>

        {Object.keys(count).length === 0 ? (
          <div className="preper">
            <img
              className="your-cart_img"
              src="/images/illustration-empty-cart.svg"
              alt=""
            />
            <p className="your-cart_description">
              Your added items will appear here
            </p>
          </div>
        ) : (
          <div className="cart-items">
            {desserts
              .filter((dessert) => count[dessert.id])
              .map((dessert) => (
                <div key={dessert.id} className="cart-item">
                  <p className="cart-item-name">{dessert.name}</p>
                  <p className="cart-item-details">
                    <span className="count">{count[dessert.id]}x</span>
                    <span className="singlePrice">@{dessert.price}</span>
                    <span className="pricee">
                      ${dessert.price * count[dessert.id]}
                    </span>
                  </p>
                  <hr className="hr" />
                </div>
              ))}

            <div className="cart-total">
              <div>
                <h4>Order Total</h4>
              </div>
              <div>
                {desserts
                  .filter((dessert) => count[dessert.id])
                  .reduce(
                    (sum, dessert) => sum + dessert.price * count[dessert.id],
                    0
                  )}
                $
              </div>
            </div>
            <p className="bottom"><img src="/images/icon-carbon-neutral.svg" alt="" /> This is a carbon-neutral delivery</p>
            <button className="last">Confirm Order</button>
          </div>
          
        )}
      </div>
    </div>
  );
}

export default App;
