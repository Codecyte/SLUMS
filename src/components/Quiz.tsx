import React from 'react';
import { Question } from './Question';
import { SlumQuestion } from './SlumQuestion';

type QuizProps = {
    questions: Question[]
}

type QuizState = {
    questionList: Question[]
    height: number
    width: number
}
export class Quiz extends React.Component<QuizProps, QuizState> {
    state: QuizState = {
        questionList: this.props.questions,
        height: window.innerHeight,
        width: window.innerWidth
    };

    render(){
        return (
            <div className="quizDiv">
                {this.props.questions.map((q, index) => 
                   <SlumQuestion question={q} index={index}></SlumQuestion>)}
            </div>
        )
    }
}


export default Quiz;