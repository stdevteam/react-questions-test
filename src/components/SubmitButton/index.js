import "./submit-button.scss"

export default function SubmitButton (props) {

    const {title, rest} = props;

    return (
        <button className={"submit-button"} type={"submit"} {...rest}>
            {title}
        </button>
    )
}