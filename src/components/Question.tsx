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
