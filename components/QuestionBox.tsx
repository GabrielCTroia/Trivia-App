import * as React from 'react';
import { Text, StyleSheet, View, TextProperties } from 'react-native';
import { H2 } from './text/H2';
import { Paragraph } from './text/Paragraph';
import { Question } from '../Api/Questions';


// export interface AnsweredQuestion extends Question {
//   answer: boolean;
// }

export interface QuestionBoxProps { 
  question: Question,
};

export function QuestionBox(props: QuestionBoxProps) {
  console.log(props.question)

  return (
    <View>
      <H2>Question</H2>
      <Paragraph>
        {props.question.title}
      </Paragraph>
    </View>
  );
} 

// export class QuestionBox extends React.Component<QuestionBoxProps> {
//   render() {
//     return (
//       <View>
//         <h3>Question</h3>
//       </View>
//     );
//   }
// }

const styles = StyleSheet.create({
  text: {
    // custom styles
  }
});
