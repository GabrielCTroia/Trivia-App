import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Constants } from 'expo';

import Colors from '../constants/Colors';
import { NavigationScreenProp } from 'react-navigation';
import { QuestionBox } from '../components/QuestionBox';
import { Question } from '../Api/Questions';

export interface QuizScreenParams {
  category: string;

  questions: {
    title: string;
    correctAnswer: boolean;
  }[],
}

export interface QuizScreenProps {
  navigation: NavigationScreenProp<any, QuizScreenParams>;
}


export class QuizScreen extends React.Component<QuizScreenProps> {
  static navigationOptions = {
    header: null,
  };

  render() {
    const { questions = [] } = this.props.navigation.state.params || {};

    return (
      <View style={styles.container}>
        {this.renderQuestions(questions)}
      </View>
    );
  }

  private renderQuestions(questions: Question[]) {
    return questions.map((q, i) => <QuestionBox question={q} key={i}/>)
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.noticeBackground,
    alignContent: "center",
    justifyContent: 'space-between',
    paddingTop: Constants.statusBarHeight,
  },
  titleText: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: 'bold',
  },
});
