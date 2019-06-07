import { fetch } from "../data/fetch";
import R from 'ramda';
import md5 from "md5";

export type Question = {
  id: string,
  category: string;
  title: string;
  correctAnswer: boolean;
}

const normalize = (raw: any): Question => {
  const title = raw.question as string || '';

  return {
    // Create a uniq id based on the question's content
    // This will make handling UI easier.
    id: md5(title),

    title,
    category: raw.category as string || '',
    correctAnswer: raw.correct_answer as boolean || false,
  }
};

export const getQuestions = () => fetch().then(R.map(normalize))

const groupQuestionsByCategory = (questions: Question[]) => R.groupBy<Question>((q) => q.category, questions)

export const getQuestionsByCategory = () => getQuestions().then(groupQuestionsByCategory);
