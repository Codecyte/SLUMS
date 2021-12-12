/* Defines what a question is and will contain the methods to render the questions in HTML
*/
import React from 'react';

export interface Question {
    prompt: string
    answerOptions?: AnswerChoice[]
    proctorInstruction?: string
    audioPath?: string
}
export enum AnswerType{
    TEXT,
    DRAWING
}
export interface AnswerChoice{
    type?: AnswerType
    answerText?: string
    imagePath?: string
    audioPath?: string
    pointWorth: number
    pointsEarned?: number
}

function renderAnswer(a: AnswerChoice, index: number){
    switch (a.type) {
        case AnswerType.DRAWING:
            break;
        default:
            <button className='slumAButton'> {a.answerText} </button>
    }
}
export function renderSLUMQuestion(q: Question, index: number) {
    let id = 'slumQ_' + (index + 1) 

    let answerRender = null

    if (q.answerOptions){
        answerRender = q.answerOptions.map(
            (text,index) => <button key={id + "_" + index} className='slumAButton'> {text} </button>)
    }
    return (
        <div key={'Q' + index} id={id} className='slumQDiv'>
           
            <div className='slumQPrompt'> {'Q' + (index + 1) + ' '} {q.prompt}</div>

            <div className='slumAChoices'> 
                {q.answerOptions ? 
                (
                    q.answerOptions.map(
                        (text,index) => <button key={id + "_" + index} className='slumAButton'> {text} </button>)
                ) : (
                    <input type='text' id={id + "_answerText"} /> 
                )}
            </div>
        </div>
    )
}