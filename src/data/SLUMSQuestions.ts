import { type } from "os";
import { AnswerType, Question } from "../components/Question";
import blankClock from "../assets/Circle.png";
import shapes from "../assets/SquareTriangleRect.png";

export const SLUMSQuestions: Question[] = [
  {
    prompt: "What day of the week is it?",
    answerChoices: [
      {
        type: AnswerType.CORRECT,
        answerText: "Correct",
        pointWorth: 1,
      },
      {
        type: AnswerType.INCORRECT,
        answerText: "Incorrect",
        pointWorth: 0,
      },
    ],
  },
  {
    prompt: "What is the year?",
    answerChoices: [
      {
        type: AnswerType.CORRECT,
        answerText: "Correct",
        pointWorth: 1,
      },
      {
        type: AnswerType.INCORRECT,
        answerText: "Incorrect",
        pointWorth: 0,
      },
    ],
  },
  {
    prompt: "What state are we in?",
    answerChoices: [
      {
        type: AnswerType.CORRECT,
        answerText: "Correct",
        pointWorth: 1,
      },
      {
        type: AnswerType.INCORRECT,
        answerText: "Incorrect",
        pointWorth: 0,
      },
    ],
  },
  {
    prompt:
      "Please remember these five objects: </br>Apple, Pen, Tie, House, Car",
    answerChoices: [
      {
        type: AnswerType.NOANSWER,
        answerText: "",
        pointWorth: 0,
      },
    ],
  },
  {
    prompt:
      "You have $100 and you go to the store and buy a dozen apples for $3 and a tricycle for $20. </br> How much did you spend?",
    answerChoices: [
      {
        answerText: "$23",
        pointWorth: 1,
      },
      {
        answerText: "Other",
        pointWorth: 0,
      },
    ],
  },
  {
    prompt:
      "You have $100 and you go to the store and buy a dozen apples for $3 and a tricycle for $20. </br>How much do you have left?",
    answerChoices: [
      {
        answerText: "$77",
        pointWorth: 2,
      },
      {
        answerText: "Other",
        pointWorth: 0,
      },
    ],
  },
  {
    prompt: "Please name as many animals as you can in one minute", // Insert Timer Potentially TODO
    answerChoices: [
      {
        answerText: "0-4 animals",
        pointWorth: 0,
      },
      {
        answerText: "5-9 animals",
        pointWorth: 1,
      },
      {
        answerText: "10-14 animals",
        pointWorth: 2,
      },
      {
        answerText: "15+ animals",
        pointWorth: 3,
      },
    ],
  },
  {
    prompt:
      "What were the 5 things I asked you? (1 for every correct answer) [Apple, Pen, Tie, House, Car]",
    answerChoices: [
      {
        answerText: "0 Correct",
        pointWorth: 0,
      },
      {
        answerText: "1 Correct",
        pointWorth: 1,
      },
      {
        answerText: "2 Correct",
        pointWorth: 2,
      },
      {
        answerText: "3 Correct",
        pointWorth: 3,
      },
      {
        answerText: "4 Correct",
        pointWorth: 4,
      },
      {
        answerText: "5 Correct",
        pointWorth: 5,
      },
    ],
  },
  {
    prompt:
      "I am going to give you a series of numbers and I would like you to give them to me backwards. For example, if I say 42, you would say 24. </br> </br>87",
    answerChoices: [
      {
        type: AnswerType.CORRECT,
        answerText: "Correct",
        pointWorth: 0,
      },
      {
        type: AnswerType.INCORRECT,
        answerText: "Incorrect",
        pointWorth: 0,
      },
    ],
  },
  {
    prompt:
      "I am going to give you a series of numbers and I would like you to give them to me backwards. For example, if I say 42, you would say 24. </br> </br>648",
    answerChoices: [
      {
        type: AnswerType.CORRECT,
        answerText: "Correct",
        pointWorth: 1,
      },
      {
        type: AnswerType.INCORRECT,
        answerText: "Incorrect",
        pointWorth: 0,
      },
    ],
  },
  {
    prompt:
      "I am going to give you a series of numbers and I would like you to give them to me backwards. For example, if I say 42, you would say 24. </br> </br> 8537",
    answerChoices: [
      {
        type: AnswerType.CORRECT,
        answerText: "Correct",
        pointWorth: 1,
      },
      {
        type: AnswerType.INCORRECT,
        answerText: "Incorrect",
        pointWorth: 0,
      },
    ],
  },
  {
    prompt:
      "This is a clock face. Please put in the hour markers and the time at ten minutes to eleven o’clock.",
    answerChoices: [
      {
        answerText: "",
        pointWorth: 0,
        type: AnswerType.DRAWING,
        canvasBackgroundPath: blankClock,
      },
    ],
  },
  {
    prompt: "Based on the drawing, are the hour markers (numbers) okay?",
    answerChoices: [
      {
        type: AnswerType.RENDER,
        canvasRenderIndex: -1,
        answerText: "",
        pointWorth: 0,
        canvasBackgroundPath: blankClock,
      },
      {
        type: AnswerType.CORRECT,
        answerText: "Correct",
        pointWorth: 2,
      },
      {
        type: AnswerType.INCORRECT,
        answerText: "Incorrect",
        pointWorth: 0,
      },
    ],
  },
  {
    prompt: "Based on the drawing, is the time correct?",
    answerChoices: [
      {
        type: AnswerType.RENDER,
        canvasRenderIndex: -2,
        answerText: "Correct",
        pointWorth: 0,
        canvasBackgroundPath: blankClock,
      },
      {
        type: AnswerType.CORRECT,
        answerText: "Correct",
        pointWorth: 2,
      },
      {
        type: AnswerType.INCORRECT,
        answerText: "Incorrect",
        pointWorth: 0,
      },
    ],
  },
  {
    prompt: "Please place an X in the triangle",
    answerChoices: [
      {
        type: AnswerType.DRAWING,
        canvasBackgroundPath: shapes,
        pointWorth: 0,
      },
      {
        type: AnswerType.CORRECT,
        answerText: "Correct",
        pointWorth: 1,
      },
      {
        type: AnswerType.INCORRECT,
        answerText: "Incorrect",
        pointWorth: 0,
      },
    ],
  },
  {
    prompt: "Which of the figures is the largest?",
    answerChoices: [
      {
        type: AnswerType.RENDER,
        canvasRenderIndex: -1,
        answerText: "Correct",
        pointWorth: 0,
        canvasBackgroundPath: shapes,
      },
      {
        type: AnswerType.CORRECT,
        answerText: "Correct",
        pointWorth: 1,
      },
      {
        type: AnswerType.INCORRECT,
        answerText: "Incorrect",
        pointWorth: 0,
      },
    ],
  },
  {
    prompt:
      "I am going to tell you a story. Please listen carefully because afterwards, I’m going to ask you some questions about it. </br> </br> Jill was a very successful stockbroker. She made a lot of money on the stock market. She then met Jack, a devastatingly handsome man. She married him and had three children. They lived in Chicago. She then stopped work and stayed at home to bring up her children. When they were teenagers, she went back to work. She and Jack lived happily ever after </br> </br> <b> What was the female’s name? </b>",
    answerChoices: [
      {
        type: AnswerType.CORRECT,
        answerText: "Correct",
        pointWorth: 2,
      },
      {
        type: AnswerType.INCORRECT,
        answerText: "Incorrect",
        pointWorth: 0,
      },
    ],
  },
  {
    prompt:
      "I am going to tell you a story. Please listen carefully because afterwards, I’m going to ask you some questions about it. </br> </br> Jill was a very successful stockbroker. She made a lot of money on the stock market. She then met Jack, a devastatingly handsome man. She married him and had three children. They lived in Chicago. She then stopped work and stayed at home to bring up her children. When they were teenagers, she went back to work. She and Jack lived happily ever after </br> </br> <b> What work did she do? </b>",
    answerChoices: [
      {
        type: AnswerType.CORRECT,
        answerText: "Correct",
        pointWorth: 2,
      },
      {
        type: AnswerType.INCORRECT,
        answerText: "Incorrect",
        pointWorth: 0,
      },
    ],
  },
  {
    prompt:
      "I am going to tell you a story. Please listen carefully because afterwards, I’m going to ask you some questions about it. </br> </br> Jill was a very successful stockbroker. She made a lot of money on the stock market. She then met Jack, a devastatingly handsome man. She married him and had three children. They lived in Chicago. She then stopped work and stayed at home to bring up her children. When they were teenagers, she went back to work. She and Jack lived happily ever after </br> </br> <b> When did she go back to work? </b>",
    answerChoices: [
      {
        type: AnswerType.CORRECT,
        answerText: "Correct",
        pointWorth: 2,
      },
      {
        type: AnswerType.INCORRECT,
        answerText: "Incorrect",
        pointWorth: 0,
      },
    ],
  },
  {
    prompt:
      "I am going to tell you a story. Please listen carefully because afterwards, I’m going to ask you some questions about it. </br> </br> Jill was a very successful stockbroker. She made a lot of money on the stock market. She then met Jack, a devastatingly handsome man. She married him and had three children. They lived in Chicago. She then stopped work and stayed at home to bring up her children. When they were teenagers, she went back to work. She and Jack lived happily ever after </br> </br> <b> What state did she live in? </b>",
    answerChoices: [
      {
        type: AnswerType.CORRECT,
        answerText: "Correct",
        pointWorth: 2,
      },
      {
        type: AnswerType.INCORRECT,
        answerText: "Incorrect",
        pointWorth: 0,
      },
    ],
  },
];
