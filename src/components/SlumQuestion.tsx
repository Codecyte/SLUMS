import React, {Fragment, useRef} from 'react';
import CanvasDraw from 'react-canvas-draw';
import { AnswerChoice, AnswerType, Question } from './Question';
import ReactHtmlParser from 'react-html-parser';


type SlumQProps = {
    question: Question
    index: number
    updateDataFunction: (s: string, index: number) => void
    updateAnswer: (qIndex: number, aIndex: number, newPointsValue: number) => void
    sharedSavedCanvasData: string[]
}

type SlumQState = {
    
}

export class SlumQuestion extends React.Component<SlumQProps, SlumQState> {
    private saveableCanvas: CanvasDraw | null = null
    private answerRenderJSX: JSX.Element[] =  this.props.question.answerChoices ? this.renderAnswers(this.props.question.answerChoices, this.props.index) : [<></>] 
    private displayID: number =  this.props.index + 1

    constructor(props: SlumQProps){
        super(props)
        this.answerHelper.bind(this)
        this.renderAnswers.bind(this)
    }

    

    answerHelper(a: AnswerChoice, qIndex: number, aIndex: number){
        let key = "SLUMQIndex_" + qIndex + "Answer_" + aIndex + " text: " + a.answerText + this.props.sharedSavedCanvasData[qIndex] + a.active
        // console.log(key)
        if (!a){
            return <div> ERROR, null answer choice given</div>
        }
        switch (a.type) {
            case AnswerType.DRAWING:
                return (
                    <div className='slumCanvasAnswer'>
                        <button 
                            onClick={
                                () => this.saveableCanvas?.clear()}
                                className='SLUMPromptButton'> RESET
                        </button>
                        <button 
                            onClick={
                                () => {
                                    this.props.updateDataFunction(this.saveableCanvas!.getSaveData(), qIndex)
                                }}
                                className='SLUMPromptButton'> DONE
                        </button>
                        <CanvasDraw 
                            ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
                            canvasWidth={500} 
                            canvasHeight={500} 
                            gridColor='white' 
                            imgSrc={a.canvasBackgroundPath} 
                            brushRadius={2} 
                            key={key} 
                            lazyRadius={0}> </CanvasDraw>
                            <br></br>
                    </div>
                )

            case AnswerType.RENDER:
                // console.log("Rendering: SLUMQ" + (qIndex + 1) + " based on array index " + (qIndex + a.canvasRenderIndex!) )
                // console.log(this.props.sharedSavedCanvasData[qIndex + a.canvasRenderIndex!])
                let shouldupdate = this.props.sharedSavedCanvasData[qIndex + a.canvasRenderIndex!] != ""
                let doNothing = () => {}
                return (
                    <div className='slumCanvasAnswer'>
                        <CanvasDraw 
                            disabled
                            ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
                            canvasWidth={500} 
                            canvasHeight={500} 
                            gridColor='white' 
                            imgSrc={a.canvasBackgroundPath} 
                                brushRadius={2} 
                            key={this.props.sharedSavedCanvasData[qIndex + a.canvasRenderIndex!]} 
                            lazyRadius={0}> </CanvasDraw>
                        {shouldupdate ? this.saveableCanvas?.loadSaveData(this.props.sharedSavedCanvasData[qIndex + a.canvasRenderIndex!]) : doNothing() }
                        <br></br>
                    </div>
                )
            case AnswerType.NUMBER:
                return (
                    <input type="number" key={key}></input>
                )
            case AnswerType.NOANSWER:
                return (
                    <></>
                )
            default:
                
                let defaultClassName = "slumAButton"
                let buttonOn = a.active ? true : false // if the points earned is > 0, then the button is on
                let newClassName = buttonOn ? defaultClassName + " activeButton" : defaultClassName 
                // console.log("rendering qIndex" + (qIndex) + " and set active to " + buttonOn + " and class should be " + newClassName)
                return (
                    <button className={newClassName} key={key} aria-pressed={buttonOn} onClick={() => {
                        if( a.active ){ // If answer has already been clicked
                            this.props.updateAnswer(qIndex, aIndex, 0)
                        } else {  // else, answer has not been clicked, add the points in
                            this.props.updateAnswer(qIndex, aIndex, a.pointWorth)
                        }
                    }} > {a.answerText} </button>
                )
            }
        }


    renderAnswers(alist: AnswerChoice[], qIndex: number){
        if (!alist){
            return [<></>]
        }
        let returnJSX : JSX.Element[] = []
        // console.log("rendering: Qindex:" + qIndex)
        alist.forEach((answer, aIndex) => {
            returnJSX = returnJSX.concat(
                this.answerHelper(answer, qIndex, aIndex )
            )
        });
        return returnJSX
    }

    render() {
        this.renderAnswers(this.props.question.answerChoices, this.props.index)
        return (
            <div key={'Q' + this.displayID} className='slumQDiv'>
                <div className='slumQPrompt'>
                    {'Q' + (this.displayID) + ' '}{ ReactHtmlParser(this.props.question.prompt)}
                </div>
                <div className='slumAChoices'> 
                    {this.answerRenderJSX}
                </div>
                <div className="slumNAV">
                    <button> ← </button>
                    <button> → </button>
                </div>
            </div>
        )
    }
}