import { fetch } from "../data/fetch";
import R from 'ramda';
import hasPath from "ramda/es/hasPath";

export type Question = {
  id: string,
  category: string;
  title: string;
  correctAnswer: boolean;
}

const getUniqueId = () => '_' + Math.random().toString(36).substr(2, 9);

const normalize = (raw: any): Question => ({
  // Generate a unique id to each question to make it easier to handle UI
  id: getUniqueId(),
  category: raw.category as string || '',
  title: raw.question as string || '',
  correctAnswer: raw.correct_answer as boolean || false,
});

const mapWithIndex = R.addIndex(R.map);

export const getQuestions = () => fetch().then(R.map(normalize))

const groupQuestionsByCategory = (questions: Question[]) => R.groupBy<Question>((q) => q.category, questions)

export const getQuestionsByCategory = () => getQuestions().then(groupQuestionsByCategory);
