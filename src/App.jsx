import "./App.css";
import Card from "./components/Card/card";
import { getData } from "./constants/db";
import Cart from "./components/Cart/cart";
import { useCallback, useEffect, useState } from "react";

const movies = getData();

const telegram = window.Telegram.WebApp;

const App = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        telegram.ready();
    });

    const onAddItem = (item) => {
        const existItem = cartItems.find((c) => c.id == item.id);

        if (existItem) {
            const newData = cartItems.map((c) =>
                c.id == item.id
                    ? { ...existItem, quantity: existItem.quantity + 1 }
                    : c
            );
            setCartItems(newData);
        } else {
            const newData = [...cartItems, { ...item, quantity: 1 }];

            setCartItems(newData);
        }
    };

    const onRemoveItem = (item) => {
        const existItem = cartItems.find((c) => c.id == item.id);

        if (existItem.quantity === 1) {
            const newData = cartItems.filter((c) => c.id !== existItem.id);
            setCartItems(newData);
        } else {
            const newData = cartItems.map((c) =>
                c.id === existItem.id
                    ? {
                          ...existItem,
                          quantity: existItem.quantity - 1,
                      }
                    : c
            );
            setCartItems(newData);
        }
    };

    const onCheckout = () => {
        // if (cartItems.length === 0) {
        //     telegram.MainButton.hide();
        // }
        telegram.MainButton.text = "Sotib olish";
        telegram.MainButton.show();
    };

    const onSendData = useCallback(() => {
        const queryId = telegram.initDataUnsafe?.query_id;

        if (queryId) {
            fetch("http://localhost:8000/web-data", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ products: cartItems, queryId: queryId }),
            });
        } else {
            telegram.sendData(JSON.stringify(cartItems));
        }
    }, [cartItems]);

    useEffect(() => {
        telegram.onEvent("mainButtonClicked", onSendData);
        return () => telegram.offEvent("mainButtonClicked", onSendData);
    }, [onSendData]);
    return (
        <>
            <h1 className="heading">Sammi Kinolar</h1>
            <Cart cartItems={cartItems} onCheckout={onCheckout} />
            <div className="cards__container">
                {movies.map((movie) => (
                    <Card
                        key={movie.id}
                        movie={movie}
                        onAddItem={onAddItem}
                        onRemoveItem={onRemoveItem}
                    />
                ))}
            </div>
        </>
    );
};

export default App;
