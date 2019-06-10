import React, { FunctionComponent } from 'react';
import { Question } from '../../Api/Questions';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Colors from '../../styles/Colors';


export type AnsweredQuestion = Question & {
  givenAnswer: boolean;
}

export type AnsweredQuestionItemProps = AnsweredQuestion;

export const AnsweredQuestionItem: FunctionComponent<AnsweredQuestionItemProps> = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconView}>
        {
          (props.givenAnswer === props.correctAnswer)
            ? <Ionicons name="ios-checkmark" color={Colors.successColor} size={32} />
            : <Ionicons name="ios-close" color={Colors.errorColor} size={32} />
        }
      </View>
      <View style={styles.content}>
        <Text style={styles.contentText}>{props.title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.foregroundColor,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    margin: 10,
    borderRadius: 10,

    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  iconView: {
    paddingRight: 16,
    justifyContent: 'center',
    alignContent: 'center',
  },
  content: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  contentText: {
    color: Colors.baseTextColor,
  }
});
