import React from 'react';
import R from 'ramda';
import { StyleSheet, View, Text, StatusBar, } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { Question } from '../../Api/Questions';
import { StyledButton, ButtonTypes } from '../../components/buttons/StyledButton';
import { AnsweredQuestion } from '../ResultsScreen/AnsweredQuestionItem';
import { HeaderBar } from '../../components/HeaderBar/HeaderBar';
import * as Colors from '../../styles/Colors';
import * as Layout from '../../styles/Layout';
import * as Typography from '../../styles/Typography';
import { QuestionsInteraction } from './QuestionsInteration';


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

// TODO: For some reason the QuizScreenParams are not used/inferred from the react-navigation lib. Investigate further!
// Temporary solution: Use a function that specializes in extracting and annotating the questions.
const getQuestionsFromNavParams = (props: QuizScreenProps): Question[] => {
  return props.navigation.state.params.questions || [];
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


    const nextAnsweresById = R.merge(this.state.givenAnswersById, {
      [questionId]: option,
    });

    this.setState({
      givenAnswersById: nextAnsweresById,
      quizEnded: R.keys(nextAnsweresById).length === getQuestionsFromNavParams(this.props).length,
    });
  }

  private getAnsweredQuestions(): AnsweredQuestion[] {
    return getQuestionsFromNavParams(this.props)
      .map((q) => ({ ...q, givenAnswer: this.state.givenAnswersById[q.id] }))
  }

  private renderQuestions() {
    if (this.state.quizEnded) {
      return null;
    }

    const questions = getQuestionsFromNavParams(this.props);

    // Only render the unanswered questions.
    // In the future the QuestionInterction (CardStack) could do it's own optimization
    //  but for now this is enough. 
    const onlyUnanswered = questions.filter((q) => this.state.givenAnswersById[q.id] === undefined);

    return (
      <QuestionsInteraction
        questions={onlyUnanswered}
        onAnswer={(id, opt) => this.answer(id, opt)}
        totalQuestions={questions.length}
      />
    );
  }

  private renderResultsButton() {
    if (!this.state.quizEnded) {
      return null;
    }

    return <StyledButton
      title="See Results"
      buttonType={ButtonTypes.warning}
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
        <StatusBar barStyle="dark-content" />
        <View style={styles.screen}>
          <View>
            <HeaderBar />
            <Text style={styles.header}>{topic}</Text>
            <Text style={styles.subheader}>{subtopic}</Text>
          </View>
          <View style={styles.main}>
            <View style={styles.content}>
              {this.renderQuestions()}
              {this.renderResultsButton()}
            </View>
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
  screen: {
    ...Layout.screenLayout,
    flex: .87,

    backgroundColor: Colors.foregroundColor,
    borderBottomLeftRadius: Layout.screenBorderRadius,
    borderBottomRightRadius: Layout.screenBorderRadius,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    ...Typography.headerText,
  },
  subheader: {
    ...Typography.subheaderText,
  },
  content: {
    height: Layout.screenHeight / 2,
    justifyContent: 'space-around',
  },
});
