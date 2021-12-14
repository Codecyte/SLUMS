/* Defines what a question is and will contain the methods to render the questions in HTML */
import React from 'react';

export interface Question {
    prompt: string
    answerChoices?: AnswerChoice[]
    proctorInstruction?: string
    audioPath?: string
    imagePath?: string
    canvasBackgroundPath?: string
}
export enum AnswerType{
    TEXT,
    NUMBER,
    DRAWING
}
export interface AnswerChoice{
    type?: AnswerType
    answerText?: string
    audioPath?: string
    pointWorth: number
    pointsEarned?: number
}

function renderAnswer(a: AnswerChoice, index: number){
    let key = "SLUMQ_" + (index + 1);
    if (!a){
        return <div> ERROR, null answer choice given</div>
    }
    switch (a.type) {
        case AnswerType.DRAWING:
            return (
                <div>TODO</div>
            )
        case AnswerType.NUMBER:
            return (
                <input type="number" key={key}></input>
            )
        default:
            return (
            <button className='slumAButton' key={key} > {a.answerText} </button>
            )
    }
}

export function renderSLUMQuestion(q: Question, index: number) {
    let id = 'slumQ_' + (index + 1)
    let pointTotal = 0
    let answerRenderJSX: JSX.Element[] = []

    if (q.answerChoices){
        q.answerChoices.forEach((answer,index) => {
            pointTotal += answer.pointWorth
            answerRenderJSX.push(renderAnswer(answer,index))
        });
    } else {
        answerRenderJSX = [<></>]
    }
    return (
        <div key={'Q' + index} id={id} className='slumQDiv'>
           
            <div className='slumQPrompt'> {'Q' + (index + 1) + ' '} {q.prompt}</div>

            <div className='slumAChoices'> 
                {q.answerChoices ? answerRenderJSX  : <></>}
            </div>

            <div className="slumNAV">
                <button> ← </button>
                <button> → </button>
            </div>
        </div>
    )
}