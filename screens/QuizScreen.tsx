import React from 'react';
import R from 'ramda';
import { StyleSheet, View, } from 'react-native';
import { Constants } from 'expo';

import Colors from '../constants/Colors';
import { NavigationScreenProp } from 'react-navigation';
import { QuestionBox } from '../components/QuestionBox';
import { Question } from '../Api/Questions';
import { Title } from '../components/text/Title';
import { CardStack } from '../components/CardStack';

export interface QuizScreenParams {
  category: string;
  questions: Question[],
}

interface Answer {
  to: Question;
  correctness: boolean;
}

interface State {
  givenAnswersById: { [k: string]: boolean };
  // unansweredQuestions: Question[];
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

    this.state = {
      // currentQuestionIndex: questions.length > 0 ? 0 : -1,
      givenAnswersById: {},
      // unansweredQuestions: questions,
    }
  }

  private renderQuestions() {
    // TODO: For some reason the QuizScreenParams are not used/inferred from the react-navigation lib. Investigate further!
    // Temporary solution: Manually annotate for now!
    const questions: Question[] = this.props.navigation.state.params.questions || [];

    const mapCardsToIds = R.map((q) => ({
      id: q.id,
      card: <QuestionBox question={q} />,
    }), questions);

    return <CardStack
      style={styles.questionsContainer}
      cardWithIdMaps={mapCardsToIds}
    />;
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
