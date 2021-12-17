import React, { createRef, Ref } from 'react';
import { Question } from './Question';
import { SlumQuestion } from './SlumQuestion';

type QuizProps = {
    questions: Question[]
}

type QuizState = {
    questionList: Question[]
    height: number
    width: number
    imageData: string[]
    totalPoints: number
}
export class Quiz extends React.Component<QuizProps, QuizState> {
    state: QuizState = {
        questionList: this.props.questions,
        height: window.innerHeight,
        width: window.innerWidth,
        imageData: this.props.questions.map(() => ""),
        totalPoints: 0
    };

    private questionRefs:React.RefObject<any>[]
    private startRef:React.RefObject<HTMLInputElement>
    private endRef:React.RefObject<HTMLInputElement>
    constructor(props: QuizProps){
        super(props)
        this.updateSaveDataAtIndex.bind(this)
        this.updateAnswerPoints.bind(this)
        this.questionRefs = []
        for (let i = 0; i < this.props.questions.length; i++){
            this.questionRefs.push(createRef())
        }
        this.startRef = createRef()
        this.endRef = createRef()
        // this.calculateTotalPoints.bind(this)
    }

    render(){
        return (
            <div className="quizDiv">
                {this.props.questions.map((q, index) => 
                    <SlumQuestion 
                        question={q} 
                        index={index} 
                        sharedSavedCanvasData={this.state.imageData} 
                        updateDataFunction={this.updateSaveDataAtIndex} 
                        updateAnswer={this.updateAnswerPoints}
                        prevRef={index != 0 ? this.questionRefs[index-1] : this.questionRefs[0]}
                        ref={this.questionRefs[index]}
                        nextRef={index != this.questionRefs.length - 1 ? this.questionRefs[index+1] : this.questionRefs[this.questionRefs.length - 1]}>

                        </SlumQuestion>)}
                {this.finalScore()}
            </div>
        )
    }

    finalScore = () => {
        return  (
            <div className='slumQDiv' ref={this.endRef}> 
                <h1 className='scoreText'> {this.state.totalPoints} / 30</h1>

            </div>
        )
    }

    getRef(qIndex: number){
        return this.questionRefs
    }

    // updateSaveDataAtIndex(saveData: string, index: number){
    //     let temp = this.state.imageData
    //     temp[index] = saveData
    //     this.setState(() => ({
    //         imageData: temp
    //     }))
    // }
    updateSaveDataAtIndex = (saveData: string, index: number) => {
        let temp = this.state.imageData
        temp[index] = saveData
        this.setState(() => ({
            imageData: temp
        }))
    }

    updateAnswerPoints = (qIndex: number, aIndex: number, newPointsValue: number) => {
        console.log('Updating: Q' + qIndex + this.state.questionList[qIndex].prompt + 'with Aindex of ' + aIndex + ' with point value of ' + newPointsValue)
        this.activateOneAnswerDeactivateRest(qIndex, aIndex)
    }

    activateOneAnswerDeactivateRest = (qIndex: number, aIndex: number) => {
        console.log("activating qindex: " + qIndex)
        let temp = this.state.questionList
        let tempQ = temp[qIndex] // make copy of Question
        tempQ.answerChoices.forEach((answer, index) => {
            console.log("resetting qIndex " + index)
            let tempA = answer
            tempA.pointsEarned = 0
            tempA.active = false
            tempQ.answerChoices[index] = tempA
        });
        tempQ.answerChoices![aIndex].pointsEarned = tempQ.answerChoices![aIndex].pointWorth
        tempQ.answerChoices![aIndex].active = true
        temp[qIndex] = tempQ
        this.setState((p) => ({
            questionList: temp
        }), this.calculateTotalPoints)
    }
    deactivateAllAnswers = (qIndex: number) => {
        console.log("Deativating all on qIndex" + qIndex)
        let temp = this.state.questionList
        let tempQ = temp[qIndex] // make copy of Question
        tempQ.answerChoices.forEach((answer, index) => {
            let tempA = answer
            tempA.pointsEarned = 0
            tempQ.answerChoices[index] = tempA
        });

        temp[qIndex] = tempQ
        this.setState((p) => ({
            questionList: temp
        }), this.calculateTotalPoints)
    }

    calculateTotalPoints() {
        let total = 0
            this.state.questionList.map( (q) => {
                if(q.answerChoices){
                    q.answerChoices!.map( (a) => {
                    total += a.pointsEarned ? a.pointsEarned : 0
                })
                }
                
            })
            console.log("total points: " + total)
            this.setState( () => ({totalPoints: total}))
        }
}


export default Quiz;