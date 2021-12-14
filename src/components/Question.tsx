/* Defines what a question is and will contain the methods to render the questions in HTML */
import React from 'react';
import CanvasDraw from 'react-canvas-draw';

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
    canvasBackgroundPath?: string
}

type answerRenderState = {
    answer: AnswerChoice
    
} 


function renderAnswer(a: AnswerChoice, index: number, qIndex: number){
    let key = "SLUMQ_" + (qIndex + 1) + "Answer_" + index;

    if (!a){
        return <div> ERROR, null answer choice given</div>
    }
    switch (a.type) {
        case AnswerType.DRAWING:
            return (

                <div className='slumCanvasAnswer'>
                    <CanvasDraw canvasWidth={500} canvasHeight={500} gridColor='white' imgSrc={a.canvasBackgroundPath} brushRadius={2}> </CanvasDraw>
                    </div>
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

export function renderSLUMQuestion(q: Question, qIndex: number) {
    let id = 'slumQ_' + (qIndex + 1)
    let pointTotal = 0
    let answerRenderJSX: JSX.Element[] = []

    if (q.answerChoices){
        q.answerChoices.forEach((answer,aIndex) => {
            pointTotal += answer.pointWorth
            answerRenderJSX.push(renderAnswer(answer,aIndex, qIndex))
        });
    } else {
        answerRenderJSX = [<></>]
    }
    console.log(pointTotal + " total points");
    return (
        <div key={'Q' + qIndex} id={id} className='slumQDiv'>
           
            <div className='slumQPrompt'> {'Q' + (qIndex + 1) + ' '} {q.prompt}</div>

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