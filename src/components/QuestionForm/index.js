import Input from "../Input";
import Button from "../Button";
import AnswerForm from "../AnswerForm";
import "./question-form.scss"

export default function QuestionForm (props) {
    const {index, setQuizData, question} = props

    const changeQuestionAnswer = (prev, newQuestion) => {
        return {
            ...prev,
            questions_answers: [
                ...prev.questions_answers.slice(0, index),
                newQuestion,
                ...prev.questions_answers.slice(index + 1)
            ]
        }
    }

    const createAnswer = () => {
        const newAnswerData = {
            id: null,
            is_true: false,
            text: ""
        }

        setQuizData(prev => {
            const newQuestion = {...prev.questions_answers[index]};
            newQuestion.answers = [...newQuestion.answers, newAnswerData]
            return changeQuestionAnswer(prev, newQuestion)
        })
    }

    const handleChangeQuestionData = (e) => {
        setQuizData(prev => {
            const newQuestion = {...prev.questions_answers[index]};
            newQuestion[e.target.name] = e.target.value
            return changeQuestionAnswer(prev, newQuestion)
        })
    }


    return (
        <div className={"question-form"}>
            <h3>Question {index + 1}</h3>
            <Input
                label={"Question Title"}
                name={"text"}
                placeholder={"Write Question Title"}
                onChange={handleChangeQuestionData}
                value={question.text || ""}
                required
            />
            <div className="row">
                <div className="col">
                    <Input
                        label={"Feedback True"}
                        name={"feedback_true"}
                        placeholder={"Write Feedback True"}
                        onChange={handleChangeQuestionData}
                        value={question.feedback_true || ""}
                        required
                    />
                </div>
                <div className="col">
                    <Input
                        label={"Feedback False"}
                        name={"feedback_false"}
                        placeholder={"Write Feedback False"}
                        onChange={handleChangeQuestionData}
                        value={question.feedback_false || ""}
                        required
                    />
                </div>
            </div>
            <Button title={"Add Answer"} onClick={createAnswer}/>
            {
                question.answers.map((answer, answerIndex) => (
                    <AnswerForm
                        key={`answer-${answerIndex}`}
                        answer={answer}
                        index={answerIndex}
                        questionIndex={index}
                        setQuizData={setQuizData}
                        changeQuestionAnswer={changeQuestionAnswer}
                    />
                ))
            }

        </div>
    )
}