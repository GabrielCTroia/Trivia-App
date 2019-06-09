import React from 'react';
import R from 'ramda';
import { StyleSheet, View, Text, } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { QuestionBox } from '../components/QuestionBox';
import { Question } from '../Api/Questions';
import { CardStack } from '../components/SwipeableCards/CardStack';
import { StyledButton, ButtonTypes } from '../components/buttons/StyledButton';
import { AnsweredQuestion } from '../components/AnsweredQuestionItem';
import { BlockText } from '../components/text/BlockText';
import * as Colors from '../styles/Colors';
import * as Layout from '../styles/Layout';
import * as Typography from '../styles/Typography';
import * as Effects from '../styles/Effects';


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

  // componentDidMount() {
  //   // TODO: For some reason the QuizScreenParams are not used/inferred from the react-navigation lib. Investigate further!
  //   // Temporary solution: Manually annotate for now!
  //   const questions: Question[] = this.props.navigation.state.params.questions || [];

  //   this.setState({
  //     quizEnded: true,

  //     givenAnswersById: R.reduce((prev, next) => ({
  //       ...prev,
  //       [next.id]: true, 
  //     }), {}, questions)
  //   }, () => {
  //     this.props.navigation.navigate('Results', {
  //       answeredQuestions: this.getAnsweredQuestions(),
  //     })
  //   });
  // }

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
    if (this.state.quizEnded) {
      return null;
    }

    // TODO: For some reason the QuizScreenParams are not used/inferred from the react-navigation lib. Investigate further!
    // Temporary solution: Manually annotate for now!
    const questions: Question[] = this.props.navigation.state.params.questions || [];

    const onlyUnanswered = R.filter((q: Question) => this.state.givenAnswersById[q.id] === undefined);

    return <CardStack
      style={styles.questionsContainer}
      items={onlyUnanswered(questions)}
      keyExtractor={(item) => item.id}
      renderItem={(item) => <QuestionBox question={item} />}
      onSwipeLeft={(id) => this.answer(id, false)}
      onSwipeRight={(id) => this.answer(id, true)}
      totalItemsCount={questions.length}
    />;
  }

  private renderResultsButton() {
    if (!this.state.quizEnded) {
      return null;
    }

    return <StyledButton
      title="See Results"
      style={{ backgroundColor: Colors.yellowColor }}
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
        <View style={styles.main}>
          <View>
            <Text style={styles.header}>{topic}</Text>
            <Text style={styles.subheader}>{subtopic}</Text>
          </View>
          <View style={styles.content}>
            {this.renderQuestions()}
            {this.renderResultsButton()}
          </View>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  main: {
    ...Layout.screenLayout,
    flex: .85,

    justifyContent: 'space-around',

    backgroundColor: Colors.foregroundColor,
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,

    ...Effects.shadow,
  },
  header: {
    ...Typography.headerText,
  },
  subheader: {
    ...Typography.subheaderText,
  },
  content: {
    flex: 1,
    justifyContent: 'space-around',
  },
  questionsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: .3,
  }
});
