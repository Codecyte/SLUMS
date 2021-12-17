/* Defines what a question is and will contain the methods to render the questions in HTML */
import React from 'react';
import CanvasDraw from 'react-canvas-draw';

export interface Question {
    prompt: string
    answerChoices: AnswerChoice[]
    proctorInstruction?: string
    audioPath?: string
    imagePath?: string
    canvasBackgroundPath?: string
}
export enum AnswerType{
    TEXT,
    NUMBER,
    RENDER,
    DRAWING,
    NOANSWER
}
export interface AnswerChoice{
    type?: AnswerType
    active?: boolean
    answerText?: string
    audioPath?: string
    pointWorth: number
    pointsEarned?: number
    canvasBackgroundPath?: string
    canvasRenderIndex?: number // How many questions ago should I render? 
}

type answerRenderState = {
    answer: AnswerChoice
    
} 


