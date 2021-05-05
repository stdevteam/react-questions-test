import {useMemo, useState} from "react";
import Input from "../Input";
import Button from "../Button";
import QuestionForm from "../QuestionForm";
import "./quiz-form.scss";
import SubmitButton from "../SubmitButton";
import {request} from "../../helpers/request";
import {idGenerator} from "../../helpers/idGenerator";
import {ANSWER, QUESTION, QUIZ} from "../../constants";

export default function QuizForm (props) {

    const {editData, editIndex, onClose, setData, data} = props;

    const initialQuizData = useMemo(() => {
        return {
            created: "",
            description: "",
            id: null,
            modified: "",
            score: null,
            title: "",
            url: "",
            questions_answers: []
        }
    }, [])

    const [quizData, setQuizData] = useState(editData || initialQuizData)

    const createQuestion = () => {
        const questionData = {
            id: null,
            answer_id: null,
            feedback_false: "",
            feedback_true: "",
            text: "",
            answers: [
                {
                    id: null,
                    is_true: true,
                    text: ""
                },
                {
                    id: null,
                    is_true: false,
                    text: ""
                },
            ],
        }

        setQuizData(prev => ({
                ...prev,
                questions_answers: [...prev.questions_answers, questionData]
            })
        )
    }

    const handleEditData = async() => {
        const editedData = await request(`/quiz/${editIndex}`, "PUT", JSON.stringify({
            ...quizData,
            modified: new Date()
        }))

        const index = data.findIndex(({id}) => id === editIndex );
        setData(prev => {
            return [...prev.slice(0, index), editedData, ...prev.slice(index + 1)]
        });
        onClose();
    }

    const createData = async() => {
        let quizDataClone = {...quizData}

        quizDataClone.id = idGenerator(QUIZ);
        quizDataClone.questions_answers = quizDataClone.questions_answers.map(question => {
            const newQuestion = {...question};
            newQuestion.id = idGenerator(QUESTION);
            newQuestion.answers = newQuestion.answers.map((answer) => {
                return {
                    ...answer,
                    id: idGenerator(ANSWER)
                }
            })
            return newQuestion
        })

        const createdData = await request("/quiz", "POST", JSON.stringify({
            ...quizDataClone,
            created: new Date(),
            modified: new Date()
        }))

        setData(prev => [...prev, createdData]);
        onClose()
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editIndex !== null) {
            await handleEditData()
        } else {
            await createData()
        }
    }

    const handleChangeQuizData = (e) => {
        setQuizData(prev => {
            return {
                 ...prev,
                 [e.target.name]: e.target.value
            }
        })
    }

    return (
        <form className={"quiz-form"} onSubmit={handleSubmit} >
            <div className={"row"}>
                <div className="col">
                    <Input
                        name={"title"}
                        placeholder={"Write Quiz Title"}
                        label={"Title"}
                        value={quizData.title || ""}
                        onChange={handleChangeQuizData}
                        required
                    />
                </div>
                <div className="col">
                    <Input
                        name={"url"}
                        placeholder={"Write Video Url"}
                        label={"Video url"}
                        value={quizData.url || ""}
                        onChange={handleChangeQuizData}
                        required
                    />
                </div>
            </div>
            <Input
                mode={"textarea"}
                name={"description"}
                placeholder={"Write Description"}
                label={"Description"}
                value={quizData.description || ""}
                onChange={handleChangeQuizData}
            />
            <Button title={"Add Question"} onClick={createQuestion}/>
            {
                quizData.questions_answers.map((question, index) => (
                    <QuestionForm
                        setQuizData={setQuizData}
                        question={question}
                        index={index}
                        key={index}
                    />
                ))
            }

            <SubmitButton title={editIndex !== null ? "Edit" : "Save"}/>

        </form>
    )
}