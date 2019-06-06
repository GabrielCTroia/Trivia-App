import { fetch } from "../data/fetch";

export type Question = {
  title: string;
  correctAnswer: boolean;
}

const normalize = (raw: any): Question => ({
  title: raw.question as string || '',
  correctAnswer: raw.correct_answer as boolean || false,
});

export const getQuestions = () => fetch().then((results) => results.map(normalize));
