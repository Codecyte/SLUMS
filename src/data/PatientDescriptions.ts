import { Question, AnswerType } from "../components/Question";

export const PatientDescriptionQuestions: Question[] = [
  { prompt: "How old are you?",
    answerChoices: [
        {
            answerText: "",
            type: AnswerType.NUMBER,
            pointWorth: 0
        }
    ]
    },
  {
    prompt: "What is your highest level of education?",
    answerChoices: [
      {
        answerText: "Less than high school",
        pointWorth: 0,
      },
      {
          answerText: "Highschool or greater",
          pointWorth: 0,
      },
    ],
  },
];

