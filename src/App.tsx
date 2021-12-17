import React from 'react';
import './App.css';
import Quiz from './components/Quiz';
import { PatientDescriptionQuestions } from './data/PatientDescriptions';
import { SLUMSQuestions } from './data/SLUMSQuestions';
import Header from './components/Header';

function App() {
  return (
    <div className="headerContainer"> 
      <Header />
      <div className="App" id='AppBody'>
        {/* <h1 className = "text-header"> SLUMS Exam</h1> */}
        {/* <div className='btn-group-container'>
          <div className="btn-group">
            <button>Give SLUMS</button>
          </div>
        </div> */}
        <Quiz questions={SLUMSQuestions}/>
      </div>
    </div>
  );
}


export default App;
