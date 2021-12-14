import React from 'react';
import CanvasDraw from 'react-canvas-draw';
import { AnswerChoice, AnswerType, Question } from './Question';


type SlumQProps = {
    question: Question
    index: number
}

type SlumQState = {
    answerRenderJSX: JSX.Element[]
    displayID: number
}

export class SlumQuestion extends React.Component<SlumQProps, SlumQState> {
    state : SlumQState = {
        answerRenderJSX: this.props.question.answerChoices ? this.renderAnswers(this.props.question.answerChoices, this.props.index + 1) : [<></>] ,
        displayID: this.props.index + 1,
    }

    constructor(props: SlumQProps){
        super(props)
    }

    answerHelper(a: AnswerChoice, qIndex: number, aIndex: number){
        let key = "SLUMQ_" + (qIndex + 1) + "Answer_" + aIndex
        if (!a){
            return <div> ERROR, null answer choice given</div>
        }
        switch (a.type) {
            case AnswerType.DRAWING:
                return (
                    <div className='slumCanvasAnswer'>
                        <CanvasDraw canvasWidth={500} canvasHeight={500} gridColor='white' imgSrc={a.canvasBackgroundPath} brushRadius={2} key={key}> </CanvasDraw>
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


    renderAnswers(alist: AnswerChoice[], qIndex: number){
        if (!alist){
            return [<></>]
        }
        let returnJSX : JSX.Element[] = []
        alist.forEach((answer, aIndex) => {
            returnJSX = returnJSX.concat(
                this.answerHelper(answer, qIndex, aIndex )
            )
        });
        return returnJSX
    }

    render() {
        return (
            <div key={'Q' + this.state.displayID} className='slumQDiv'>
                {this.props.question.answerChoices ?  this.renderAnswers(this.props.question.answerChoices, this.state.displayID) : <></>}
                <div className='slumQPrompt'> {'Q' + (this.state.displayID) + ' '} {this.props.question.prompt}</div>
                <div className='slumAChoices'> 
                    {this.state.answerRenderJSX}
                </div>
                <div className="slumNAV">
                    <button> ← </button>
                    <button> → </button>
                </div>
            </div>
        )
    }
}