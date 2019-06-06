import { fetch } from "../data/fetch";
import R from 'ramda';

export type Question = {
  category: string;
  title: string;
  correctAnswer: boolean;
}

const normalize = (raw: any): Question => ({
  category: raw.category as string || '',
  title: raw.question as string || '',
  correctAnswer: raw.correct_answer as boolean || false,
});

export const getQuestions = () => fetch().then(R.map(normalize))

const groupQuestionsByCategory = (questions: Question[]) => R.groupBy<Question>((q) => q.category, questions)

export const getQuestionsByCategory = () => getQuestions().then(groupQuestionsByCategory);
