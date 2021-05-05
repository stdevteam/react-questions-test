import "./button.scss"

export default function Button (props) {

    const {title, className = "", ...rest} = props;

    return (
        <button type={"button"} className={`button ${className}`} {...rest}>
            {title}
        </button>
    )
}