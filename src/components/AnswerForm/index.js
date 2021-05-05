import Input from "../Input";
import "./answer-form.scss"

export default function AnswerForm (props) {

    const {index, answer, questionIndex, setQuizData, changeQuestionAnswer} = props;

    const handleChangeAnswerValue = (e, field) => {
        e.stopPropagation();
        setQuizData(prev => {
            const newQuestion = {...prev.questions_answers[questionIndex]};
            newQuestion.answers = [...newQuestion.answers.map((answer, answerIndex) => {
                if (field === "text") {
                    if (answerIndex === index) {
                        return {
                            ...answer,
                            text: e.target.value
                        }
                    }
                    return answer
                } else {
                    return {
                        ...answer,
                        is_true: answerIndex === index
                    }
                }
            })]
            return changeQuestionAnswer(prev, newQuestion)
        })
    }


    return (
        <div className={"answer-form"}>
            <Input
                name={`answer-${questionIndex}-${index}`}
                className={"answer-form-input"}
                label={`Answer ${index + 1}`}
                placeholder={"Write Answer"}
                onChange={(e) => handleChangeAnswerValue(e, "text")}
                value={answer.text}
                required
            />
            <div className={"answer-form-is_true"} onClick={(e) => handleChangeAnswerValue(e, "is_true")}>
                <label htmlFor={`answer-${questionIndex}-${index}`}>Is True</label>
                <input
                    id={`answer-is-true-${questionIndex}-${index}`}
                    name={`answer-is-true-${questionIndex}-${index}`}
                    type="checkbox" checked={answer.is_true}
                    onChange={(e) => handleChangeAnswerValue(e, "is_true")}
                />
            </div>
        </div>
    )
}