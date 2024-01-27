import "./cart.css";
import Button from "../Button/button";
import { totalPrice } from "../units/total-price";

const Cart = (props) => {
    const { cartItems, onCheckout } = props;
    return (
        <div className="cart__container">
            <p>
                Umumiy narx:{"  "}
                {totalPrice(cartItems).toLocaleString("en-US", {
                    style: "currency",
                    currency: "usd",
                })}
            </p>
            <Button
                title={cartItems.length === 0 ? "Buyurtma Berish" : "To'lov"}
                type={"checkout"}
                disabled={cartItems.length === 0 ? true : false}
                onClick={onCheckout}
            />
        </div>
    );
};

export default Cart;
