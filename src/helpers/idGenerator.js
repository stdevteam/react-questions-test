import {ANSWER, QUESTION, QUIZ} from "../constants";

let quizIdCount = localStorage.getItem('quizIdCount') || 0;
let questionIdCount = localStorage.getItem('questionIdCount') || 99;
let answerIdCount = localStorage.getItem('answerIdCount') || 999;

export const idGenerator = (field) => {
    switch (field) {
        case QUIZ:
            quizIdCount = parseInt(quizIdCount) + 1;
            localStorage.setItem('quizIdCount', `${quizIdCount}`);
            return quizIdCount;
        case QUESTION:
            questionIdCount++;
            localStorage.setItem('questionIdCount', `${questionIdCount}`);
            return questionIdCount;
        case ANSWER:
            answerIdCount++;
            localStorage.setItem('answerIdCount', `${answerIdCount}`);
            return answerIdCount;
        default: return 0;
    }
}