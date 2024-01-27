import "./button.css";
const Button = (props) => {
    const { type, title, disabled, onClick } = props;

    return (
        <button
            className={`btn ${type} ${disabled ? "disabled" : ""}`}
            onClick={onClick}
            disabled={disabled}
        >
            {title}
        </button>
    );
};

export default Button;
