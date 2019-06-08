import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { H2 } from './text/H2';
import { Paragraph } from './text/Paragraph';
import { Question } from '../Api/Questions';

export type QuestionBoxProps = {
  question: Question,
};

export const QuestionBox: React.FunctionComponent<QuestionBoxProps> = (props) => {
  return (
    <View style={styles.container} >
      <H2>Question</H2>
      <Paragraph>
        {props.question.title}
      </Paragraph>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',

    shadowColor: '#ededed',
    shadowOffset: { width: 10, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 1,

    flex: 1,

    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
