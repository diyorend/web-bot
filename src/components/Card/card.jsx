import "./card.css";
import Button from "../Button/button";
import { useState } from "react";

const Card = (props) => {
    const [count, setCount] = useState(0);
    const { movie, onAddItem, onRemoveItem } = props;
    const { title, Image, id, price } = movie;

    const handleIncrement = () => {
        setCount((p) => p + 1);
        onAddItem(movie);
    };
    const handleDecrement = () => {
        setCount((p) => p - 1);
        onRemoveItem(movie);
    };

    return (
        <div className="card">
            <span
                className={`${
                    count !== 0 ? "card__badge" : "card__badge-hidden"
                }`}
            >
                {count}
            </span>
            <div className="image__container">
                <img src={Image} alt={title} width={"100%"} height={"350px"} />
            </div>

            <div className="card__body">
                <h2 className="card__title">{title}</h2>
                <div className="card__price">
                    {price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                    })}
                </div>
            </div>

            <div className="hr"></div>

            <div className="btn__container">
                <Button title={"+"} type={"add"} onClick={handleIncrement} />
                {count !== 0 && (
                    <Button
                        title={"-"}
                        type={"remove"}
                        onClick={handleDecrement}
                    />
                )}
            </div>
        </div>
    );
};

export default Card;
