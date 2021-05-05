import "./input.scss"

export default function Input (props) {

    const {mode, name, label, ...rest} = props;

    let inputComponent = <input id={name} name={name} {...rest}/>

    if (mode === "textarea") {
        inputComponent = <textarea id={name} name={name} {...rest}/>
    }

    return (
        <div className={"input-content"}>
            <label htmlFor={name}>{label}</label>
            {inputComponent}
        </div>
    )
}