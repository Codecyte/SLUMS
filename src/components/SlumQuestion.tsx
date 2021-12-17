import React, { Ref, RefObject, useRef } from 'react';
import CanvasDraw from 'react-canvas-draw';
import { AnswerChoice, AnswerType, Question } from './Question';
import ReactHtmlParser from 'react-html-parser';
import { ReactComponent as CheckmarkIcon } from "../assets/Checkmark.svg";
import { ReactComponent as XMark } from "../assets/XMark.svg";
import { ReactComponent as LeftArrowIcon } from "../assets/LeftArrow.svg";
import { ReactComponent as RightArrowIcon } from "../assets/RightArrow.svg";

type SlumQProps = {
    question: Question
    index: number
    updateDataFunction: (s: string, index: number) => void
    updateAnswer: (qIndex: number, aIndex: number, newPointsValue: number) => void
    sharedSavedCanvasData: string[]
    prevRef: RefObject<HTMLInputElement>
    ref: RefObject<HTMLInputElement>
    nextRef: RefObject<HTMLInputElement>
}

type SlumQState = {
    
}

export class SlumQuestion extends React.Component<SlumQProps, SlumQState> {
    private saveableCanvas: CanvasDraw | null = null
    private answerRenderJSX: JSX.Element[] =  this.props.question.answerChoices ? this.renderAnswers(this.props.question.answerChoices, this.props.index) : [<></>] 
    
    constructor(props: SlumQProps){
        super(props)
        this.answerHelper.bind(this)
        this.renderAnswers.bind(this)
    }

    

    answerHelper(a: AnswerChoice, qIndex: number, aIndex: number){
        let key = "SLUMQIndex_" + qIndex + "Answer_" + aIndex + " text: " + a.answerText + this.props.sharedSavedCanvasData[qIndex] + a.active
        // console.log(key)
        
        let doNothing = () => {console.log("Did nothign!")}
        const loadRenderCallback = (update : boolean) => {update ? this.saveableCanvas?.loadSaveData(this.props.sharedSavedCanvasData[qIndex + a.canvasRenderIndex!]) : doNothing()} // hackey problem with async canvas
        const loadDrawCallback = (update : boolean) => {update ? this.saveableCanvas?.loadSaveData(this.props.sharedSavedCanvasData[qIndex]) : doNothing()}
        const answerFunction = () => {
                        if( a.active ){ // If answer has already been clicked
                            this.props.updateAnswer(qIndex, aIndex, 0)
                        } else {  // else, answer has not been clicked, add the points in
                            this.props.updateAnswer(qIndex, aIndex, a.pointWorth)
                        }
                    }
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
                        <p>
                        <CanvasDraw 
                            ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
                            className='canvasDraw'
                            canvasWidth={500} 
                            canvasHeight={500} 
                            gridColor='white' 
                            imgSrc={a.canvasBackgroundPath} 
                            brushRadius={2} 
                            immediateLoading={true}
                            key={key} 
                            loadTimeOffset={0}
                            lazyRadius={0}> </CanvasDraw>
                            </p>
                            <br></br>
                        
                        {/* Really bad code follows to deal with async canvas and to consume output */}
                        {console.log(setTimeout( () => loadDrawCallback( this.props.sharedSavedCanvasData[qIndex] !== "") ,500))} 
                        {console.log("Current qIndex: " + qIndex + this.props.sharedSavedCanvasData[qIndex])}
                    </div>
                )

            case AnswerType.RENDER:
                let shouldupdate = this.props.sharedSavedCanvasData[qIndex + a.canvasRenderIndex!] !== ""
                console.log("Rendering: Canvas of Q" + qIndex +  this.props.sharedSavedCanvasData[qIndex + a.canvasRenderIndex!])
                console.log(shouldupdate)
                return (
                    <div className='slumCanvasAnswer'>
                        <CanvasDraw 
                            disabled
                            className='canvasDraw'
                            ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
                            canvasWidth={500} 
                            canvasHeight={500} 
                            gridColor='white' 
                            imgSrc={a.canvasBackgroundPath} 
                            immediateLoading={true}
                            loadTimeOffset={0}
                            brushRadius={2} 
                            key={this.props.sharedSavedCanvasData[qIndex + a.canvasRenderIndex!]} 
                            lazyRadius={0}> </CanvasDraw>
                        {console.log(setTimeout( () => loadRenderCallback(shouldupdate) ,500))}
                        {/* {shouldupdate ? this.saveableCanvas?.loadSaveData(this.props.sharedSavedCanvasData[qIndex + a.canvasRenderIndex!]) : doNothing() } */}
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
            case AnswerType.CORRECT:
                let cCheckName = "slumCorrectBtn"
                let cButtonOn = a.active ? true : false // if the points earned is > 0, then the button is on
                let cnewClassName = cButtonOn ? cCheckName + " activeButton" : cCheckName 
                console.log("rendering qIndex" + (qIndex) + "class should be " + cnewClassName)
                return (
                    <button className={cnewClassName} key={key} onClick={answerFunction}> 
                        <CheckmarkIcon className='svgCheck'></CheckmarkIcon>
                    </button>
                )
            case AnswerType.INCORRECT:
                let iName = "slumIncorrectBtn"
                let iButtonOn = a.active ? true : false // if the points earned is > 0, then the button is on
                let inewClassName = iButtonOn ? iName + " activeButton" : iName
                return (
                    <button className={inewClassName} key={key} onClick={answerFunction} > 
                        <XMark className='svgCheck'></XMark>
                    </button>
                )
            default:
                
                let defaultClassName = "slumAButton"
                let buttonOn = a.active ? true : false // if the points earned is > 0, then the button is on
                let newClassName = buttonOn ? defaultClassName + " activeButton" : defaultClassName 
                
                return (
                    <button className={newClassName} key={key} aria-pressed={buttonOn} onClick={answerFunction} > {a.answerText} </button>
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
        this.answerRenderJSX = this.renderAnswers(this.props.question.answerChoices, this.props.index)
        const scrollLeft = () => {
            let x = window.innerWidth
            document.getElementById("AppBody")!.scrollBy({
                behavior: 'smooth',
                left: -x
            })
        }
        const scrollRight = () => {
            let x = window.innerWidth
            document.getElementById("AppBody")!.scrollBy({
                behavior: 'smooth',
                left: x
            })
        }
        return (
            <div key={'Q' + this.props.index} className='slumQDiv' ref={this.props.ref}>
                <div className='slumQPrompt' key={'Q' + this.props.index + "inner Div"}>
                    {'Q' + (this.props.index + 1) + ' '}{ ReactHtmlParser(this.props.question.prompt)}
                </div>
                <div className='slumAChoices' key={"As" + this.props.index + "choicesDiv"}> 
                    {this.answerRenderJSX}
                </div>
                <div className="slumNAV">
                    <button onClick={scrollLeft}> <LeftArrowIcon></LeftArrowIcon> </button>
                    <button onClick={scrollRight}> <RightArrowIcon></RightArrowIcon> </button>
                </div>
            </div>
        )
    }
}