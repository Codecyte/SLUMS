import React, { MouseEventHandler } from 'react';
import './App.css';
import Quiz from './components/Quiz';
import { PatientDescriptionQuestions } from './data/PatientDescriptions';
import { renderSLUMQuestion } from './components/Question'

function App() {
  return (
    <div className="App">
      {/* <h1 className = "text-header"> SLUMS Exam</h1> */}
      <div className="btn-group">
        <button>Give SLUMS</button>
      </div>
      <Quiz questions = {PatientDescriptionQuestions} renderFunction={renderSLUMQuestion} ></Quiz>
    </div>
  );
}


export default App;
