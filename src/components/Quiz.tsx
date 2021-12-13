import React from 'react';
import { Question } from './Question';

type QuizProps = {
    questions: Question[]
    renderFunction: (q: Question, index: number) => JSX.Element,
}

type QuizState = {
    questionList: Question[]
}
export class Quiz extends React.Component<QuizProps, QuizState> {
    state: QuizState = {
        questionList: this.props.questions
    };

    render(){
        return (
            <div className="quizDiv">
                {this.props.questions.map((q, index) => this.props.renderFunction(q, index))}
            </div>
        )
    }
}


export default Quiz;