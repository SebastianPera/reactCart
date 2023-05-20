import { useId } from "react";
import { ClearCartIcon, TrushIcon, CartIcon } from "./Icons";
import "./Cart.css";
import { useCart } from "../hooks/useCart";

function CartItem({
  thumbnail,
  price,
  title,
  quantity,
  addToCart,
  removeFromCart,
}) {
  return (
    <li className="cart-item">
      <img src={thumbnail} alt={title} />
      <div>
        <strong>{title}</strong> - ${price}
      </div>
      <footer>
        <small>
          Qty: <strong>{quantity}</strong>
        </small>
        <button onClick={addToCart}>+</button>
        <button onClick={removeFromCart}>
          <TrushIcon />
        </button>
      </footer>
    </li>
  )
}

const Cart = () => {
  const cartCheckboxId = useId();
  const { cart, clearCart, addToCart, removeFromCart } = useCart();

  return (
    <>
      <label htmlFor={cartCheckboxId} className="cart-button">
        <CartIcon />
      </label>
      <input type="checkbox" id={cartCheckboxId} hidden />
      {cart.length ? (
        <aside className="cart">
          <ul>
            {cart.map((product) => (
              <CartItem
                key={product.id}
                addToCart={() => addToCart(product)}
                removeFromCart={() => removeFromCart(product)}
                {...product}
              />
            ))}
          </ul>
          {cart.length > 0 && (
            <button onClick={clearCart}>
              <ClearCartIcon />
            </button>
          )}
        </aside>
      ) : (
        <></>
      )}
    </>
  );
};

export default Cart;
