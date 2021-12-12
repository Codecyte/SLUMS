import { Question, AnswerChoice } from "../components/Question";

export const PatientDescriptionQuestions: Question[] = [
  { prompt: "How old are you?" },
  {
    prompt: "What is your highest level of education?",
    answerOptions: [
      {
        answerText: "Less than high school",
        pointWorth: 0,
      },
    ],
  },
];

export function getPatientDescriptionQuestions(): Question[] {
  return PatientDescriptionQuestions;
}
