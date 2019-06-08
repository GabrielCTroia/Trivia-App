import React, { FunctionComponent } from "react";
import { Question } from "../Api/Questions";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import { Ionicons } from '@expo/vector-icons';


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
            ? <Ionicons name="ios-checkmark" color={Colors.success} size={32} />
            : <Ionicons name="ios-close" color={Colors.error} size={32} />
        }
      </View>
      <View style={styles.content}>
        <Text>{props.title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.noticeBackground,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    margin: 10,
    borderRadius: 10,

    flex: 1,
    flexDirection: 'row',
    shadowColor: '#D0BD0F',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    shadowOpacity: 1,
  },
  iconView: {
    paddingRight: 16,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  }
});
