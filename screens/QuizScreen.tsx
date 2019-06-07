import React from 'react';
import R from 'ramda';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
} from 'react-native';
import { Constants } from 'expo';

import Colors from '../constants/Colors';
import { NavigationScreenProp } from 'react-navigation';
import { QuestionBox } from '../components/QuestionBox';
import { Question } from '../Api/Questions';
import { Title } from '../components/text/Title';
import { CardStack } from '../components/CardStack';
import { Card } from '../components/Card';

export interface QuizScreenParams {
  category: string;

  questions: {
    title: string;
    correctAnswer: boolean;
  }[],
}

interface Answer {
  to: Question;
  correctness: boolean;
}

interface State {
  givenAnswersByIndex: { [k: number]: boolean };
  unansweredQuestions: Question[];
  // currentQuestionIndex: number;
}

export interface QuizScreenProps {
  navigation: NavigationScreenProp<any, QuizScreenParams>;
}


export class QuizScreen extends React.Component<QuizScreenProps, State> {
  static navigationOptions = {
    header: null,
  };

  constructor(props: QuizScreenProps) {
    super(props);

    const { questions = [] } = this.props.navigation.state.params;

    this.state = {
      // currentQuestionIndex: questions.length > 0 ? 0 : -1,
      givenAnswersByIndex: {},
      unansweredQuestions: questions,
    }
  }

  private renderQuestions() {
    const questionCards = this.state.unansweredQuestions.map((q, i) => (
      <Card key={q.id}>
        <QuestionBox question={q} />
      </Card>
    ));

    return <CardStack style={styles.questionsContainer} cards={questionCards} />;
  }

  private answerQuestion(index: number, answer: boolean) {
    const start = this.state.unansweredQuestions.slice(0, index);
    const end = this.state.unansweredQuestions.slice(index + 1);

    this.setState({
      givenAnswersByIndex: R.merge(this.state.givenAnswersByIndex, {
        [index]: answer,
      }),
      unansweredQuestions: start.concat(end),
    }, () => {
      console.log('next state', this.state);
    });
  }

  render() {
    const { category = '' } = this.props.navigation.state.params || {};

    return (
      <View style={styles.container}>
        <Title>{category}</Title>
        {this.renderQuestions()}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.noticeBackground,
    alignContent: "center",
    // justifyContent: 'center',

    // justifyContent: 'space-evenly',
    paddingTop: Constants.statusBarHeight,
  },
  titleText: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: 'bold',
  },
  questionsContainer: {
    // width: '80%',
    // flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
    flex: .5,

    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
  }
});
