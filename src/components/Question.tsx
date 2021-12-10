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

export function renderSLUMQuestion(q: Question) {
    return (
        <div></div>
    )
}