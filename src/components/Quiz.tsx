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

    constructor(props: QuizProps){
        super(props)
        this.updateSaveDataAtIndex.bind(this)
        this.updateAnswerPoints.bind(this)
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
                        updateAnswer={this.updateAnswerPoints}></SlumQuestion>)}
            </div>
        )
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
        console.log(this.state.imageData)
    }

    updateAnswerPoints = (qIndex: number, aIndex: number, newPointsValue: number) => {
        console.log('Updating: Q' + qIndex + this.state.questionList[qIndex].prompt + 'with Aindex of ' + aIndex + ' with point value of ' + newPointsValue)
        let temp = this.state.questionList
        let tempQ = temp[qIndex] // make copy of Question
        let tempA = tempQ.answerChoices![aIndex] // make copy of new anwer
        tempA.pointsEarned = newPointsValue // asign new value to answer
        let oldActiveStatus = tempA.active ? true : false // set it to active or not based on if it has earned points or not
        tempA.active = !oldActiveStatus
        tempQ.answerChoices![aIndex] = tempA // Assign new answer to copy of question
        temp[qIndex] = tempQ // Assign new question to question list
        this.setState((prevState) => ({
            questionList: temp
        }))
        this.calculateTotalPoints()
        
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