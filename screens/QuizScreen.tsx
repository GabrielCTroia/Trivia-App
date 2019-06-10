import React from 'react';
import R from 'ramda';
import { StyleSheet, View, Text, StatusBar, } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { QuestionBox } from '../components/QuestionBox';
import { Question } from '../Api/Questions';
import { CardStack } from '../components/SwipeableCards/CardStack';
import { StyledButton, ButtonTypes } from '../components/buttons/StyledButton';
import { AnsweredQuestion } from '../components/AnsweredQuestionItem';
import { HeaderBar } from '../components/HeaderBar/HeaderBar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Colors from '../styles/Colors';
import * as Layout from '../styles/Layout';
import * as Typography from '../styles/Typography';


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
    if (this.state.quizEnded) {
      return null;
    }

    // TODO: For some reason the QuizScreenParams are not used/inferred from the react-navigation lib. Investigate further!
    // Temporary solution: Manually annotate for now!
    const questions: Question[] = this.props.navigation.state.params.questions || [];

    const onlyUnanswered = R.filter((q: Question) => this.state.givenAnswersById[q.id] === undefined);

    return (
      <View style={styles.questionsContainer}>
        <View style={styles.tutorial}>
          <View style={styles.tutorialTextContainer}>
            <Text style={styles.tutorialText}>FALSE</Text>
          </View>
          <View style={styles.swipeTipContainer}>
            <MaterialCommunityIcons
              style={styles.swipeTip}
              name="gesture-swipe-horizontal"
              color={Colors.lightShade}
            />
          </View>
          <View style={styles.tutorialTextContainer}>
            <Text style={styles.tutorialText}>TRUE</Text>
          </View>
        </View>
        <CardStack
          items={onlyUnanswered(questions)}
          keyExtractor={(item) => item.id}
          renderItem={(item, index) => <QuestionBox question={item} index={index} />}
          onSwipeLeft={(id) => this.answer(id, false)}
          onSwipeRight={(id) => this.answer(id, true)}
          totalItemsCount={questions.length}
        />
      </View>
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
    flex: .92,

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
  questionsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  tutorial: {
    flex: .4,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  swipeTipContainer: {
    justifyContent: 'center',
  },
  swipeTip: {
    fontSize: 80,
  },
  tutorialTextContainer: {
    justifyContent: 'center',
  },
  tutorialText: {
    ...Typography.baseText,
    color: Colors.baseTextColor,
  },
});
