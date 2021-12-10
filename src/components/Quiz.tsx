import React, { FunctionComponent } from 'react';
import { Question } from './Question';

type QuizProps = {
    questions: Question[]
    renderFunction: (q: Question) => any, // question to JSX
}
function Quiz (qprop: QuizProps) {
    return (
        <div className="quizDiv">
            {qprop.questions.map(q => renderQuestion)}
        </div>
    )
}

function renderQuestion(q: Question) {
    return (
        <div>{q.prompt}</div>
    )
}


export default Quiz;