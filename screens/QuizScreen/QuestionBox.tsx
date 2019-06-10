import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Question } from '../../Api/Questions';
import { screenHorizontalPadding } from '../../styles/Layout';
import * as Typography from '../../styles/Typography';
import * as Colors from '../../styles/Colors';


export type QuestionBoxProps = {
  index: number,
  question: Question,
};

export const QuestionBox: React.FunctionComponent<QuestionBoxProps> = (props) => {
  return (
    <View style={styles.container} >
      <Text style={styles.tipText}>{props.index}</Text>
      <Text style={styles.text}>{props.question.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.whiteColor,
    borderRadius: 26,
    padding: screenHorizontalPadding,
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
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
