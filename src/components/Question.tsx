import React from 'react';

export type Question = {
    prompt: string
    answerOptions?: string[]
    proctorInstruction?: string
    imagePath?: string
    audioPath?: string
    answer?: string
}
