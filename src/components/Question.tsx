/* Defines what a question is and will contain the methods to render the questions in HTML
*/
import React from 'react';

export interface Question {
    prompt: string
    answerOptions?: string[]
    proctorInstruction?: string
    imagePath?: string
    audioPath?: string
    answer?: string
    pointWorth: number
    pointsEarned?: number
}

export function renderSLUMQuestion(q: Question, index: number) {
    return (
        <div key={'Q' + index} id={'Q' + index} className='slumQDiv'>
           
            <div className='slumQPrompt'> {'Q' + (index + 1) + ' '} {q.prompt}</div>
        </div>
    )
}