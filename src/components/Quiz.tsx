import React from 'react';
import { Question } from './Question';

type QuizProps = {
    questions: Question[]
    renderFunction: (q: Question, index: number) => JSX.Element,
}

type QuizState = {
    currentQuestion: number;
    answers: string[];
}
export class Quiz extends React.Component<QuizProps, QuizState> {
    state: QuizState = {
        answers: [],
        currentQuestion: 0
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