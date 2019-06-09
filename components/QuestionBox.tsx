import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Question } from '../Api/Questions';
import * as Colors from '../styles/Colors';
import * as Effects from '../styles/Effects';
import * as Typography from '../styles/Typography';
import { screenHorizontalPadding } from '../styles/Layout';

export type QuestionBoxProps = {
  index: number,
  question: Question,
};

export const QuestionBox: React.FunctionComponent<QuestionBoxProps> = (props) => {
  return (
    <View style={styles.container} >
      <Text style={styles.tipText}>Q{props.index}</Text>
      <Text style={styles.text}>{props.question.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.whiteColor,

    flex: 1,

    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 26,
    padding: screenHorizontalPadding,
    
    flexDirection: 'row',
  },
  tipText: {
    ...Typography.baseText,
    fontSize: 45,
    fontFamily: 'roboto-black',
    color: Colors.warningColor,
    opacity: .5,
  },
  text: {
    ...Typography.baseText,
    color: Colors.baseTextColor,
    flex: 1,
    paddingLeft: 10,
  }
});
