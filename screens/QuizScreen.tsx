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
import { StyledButton } from '../components/buttons/StyledButton';
import { AnsweredQuestion } from '../components/AnsweredQuestionItem';


export interface QuizScreenParams {
  category: string;
  questions: Question[],
}

export interface QuizScreenProps {
  navigation: NavigationScreenProp<any, QuizScreenParams>;
}

interface State {
  givenAnswersById: { [k: string]: boolean };
  quizEnded: boolean;
}

export class QuizScreen extends React.Component<QuizScreenProps, State> {
  static navigationOptions = {
    header: null,
  };

  constructor(props: QuizScreenProps) {
    super(props);

    this.state = {
      givenAnswersById: {},
      quizEnded: false,
    }
  }

  private answer(questionId: string, option: boolean) {
    // TODO: For some reason the QuizScreenParams are not used/inferred from the react-navigation lib. Investigate further!
    // Temporary solution: Manually annotate for now!
    const questions: Question[] = this.props.navigation.state.params.questions || [];

    const nextAnsweresById = R.merge(this.state.givenAnswersById, {
      [questionId]: option,
    });

    this.setState({
      givenAnswersById: nextAnsweresById,
      quizEnded: R.keys(nextAnsweresById).length === questions.length,
    });
  }

  private getAnsweredQuestions(): AnsweredQuestion[] {
    // TODO: For some reason the QuizScreenParams are not used/inferred from the react-navigation lib. Investigate further!
    // Temporary solution: Manually annotate for now!
    const questions: Question[] = this.props.navigation.state.params.questions || [];

    return questions.map((q) => ({ ...q, givenAnswer: this.state.givenAnswersById[q.id] }))
  }

  private renderQuestions() {
    // TODO: For some reason the QuizScreenParams are not used/inferred from the react-navigation lib. Investigate further!
    // Temporary solution: Manually annotate for now!
    const questions: Question[] = this.props.navigation.state.params.questions || [];

    const onlyUnanswered = R.filter((q: Question) => this.state.givenAnswersById[q.id] === undefined);

    const mapCardsToIds = R.map((q) => ({
      id: q.id,
      card: <QuestionBox question={q} />,
    }), onlyUnanswered(questions));


    return <CardStack
      style={styles.questionsContainer}
      cardWithIdMaps={mapCardsToIds}
      onSwipeLeft={(id) => this.answer(id, false)}
      onSwipeRight={(id) => this.answer(id, true)}
    />;
  }

  private renderResultsButton() {
    if (!this.state.quizEnded) {
      return null;
    }

    return <StyledButton
      title="See Results"
      onPress={() => this.props.navigation.navigate('Results', {
        answeredQuestions: this.getAnsweredQuestions(),
      })}
    />
  }

  render() {
    const { category = '' } = this.props.navigation.state.params || {};

    return (
      <View style={styles.container}>
        <Title>{category}</Title>
        {this.renderQuestions()}
        {this.renderResultsButton()}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.noticeBackground,
    alignContent: "center",
    paddingTop: Constants.statusBarHeight,
  },
  titleText: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: 'bold',
  },
  questionsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: .5,

    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
  }
});
