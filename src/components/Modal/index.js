import close from "../../assets/close.svg"
import "./modal.scss"

export default function Modal(props) {
    const {show, onClose, title, children} = props;

    if (!show) {
        return null
    }

    return (
        <div className={"modal"}>
            <div className="black-window" onClick={onClose} />
            <div className="modal-content">
                <div className="modal-container">
                    <div className="modal-wrapper">
                        <div className="modal-wrapper-header">
                            <h3 className={"modal-wrapper-header-title"}>{title}</h3>
                            <div className={"close-button"} onClick={onClose}>
                                <img src={close} alt="close"/>
                            </div>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}