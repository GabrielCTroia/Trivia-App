import React from 'react';
import R from 'ramda';
import { StyleSheet, View, } from 'react-native';
import { Constants } from 'expo';
import * as Colors from '../styles/Colors';
import { NavigationScreenProp } from 'react-navigation';
import { QuestionBox } from '../components/QuestionBox';
import { Question } from '../Api/Questions';
import { CardStack } from '../components/CardStack';
import { StyledButton } from '../components/buttons/StyledButton';
import { AnsweredQuestion } from '../components/AnsweredQuestionItem';
import { BlockText } from '../components/text/BlockText';


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

    const [topic, subtopic] = category.split(':');

    return (
      <View style={styles.container}>
        <View style={styles.quiz}>
          <BlockText style={styles.header}>{topic}</BlockText>
          <BlockText style={styles.subheader}>{subtopic}</BlockText>
          {this.renderQuestions()}
          {this.renderResultsButton()}
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    alignContent: "center",
  },
  quiz: {
    flex: .9,
    backgroundColor: Colors.foregroundColor,
    paddingTop: Constants.statusBarHeight,
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,
  },
  header: {
    // textAlign: "center",
    fontSize: 40,
    fontWeight: 'bold',
    color: '#F2C94C',
  },
  subheader: {
    // textAlign: "center",
    fontSize: 25,
    fontWeight: 'bold',
    color: '#21357C',
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
