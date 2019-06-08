import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import R from 'ramda';
import * as Colors from '../styles/Colors';
import { StyledButton } from '../components/buttons/StyledButton';
import { NavigationScreenProp } from 'react-navigation';
import { getQuestionsByCategory, Question } from '../Api/Questions';
import * as Typography from '../styles/Typography';
import { screenLayout, screenVerticalPadding } from '../styles/Layout';

export interface HomeScreenProps {
  navigation: NavigationScreenProp<any, any>;
}

interface State {
  questionsByCategories: { [k: string]: Question[] },
}

export class HomeScreen extends React.Component<HomeScreenProps, State> {
  static navigationOptions = {
    header: null,
  };

  constructor(props: HomeScreenProps) {
    super(props);

    this.state = {
      questionsByCategories: {},
    };
  }

  // async componentDidMount() {
  //   await this.fetchData();

  //   this.navigateToQuizScreen(R.keys(this.state.questionsByCategories)[0].toString())
  // }

  private async fetchData() {
    this.setState({
      questionsByCategories: await getQuestionsByCategory(),
    });
  }

  private navigateToQuizScreen(category: string) {
    const { navigate } = this.props.navigation;

    navigate('Quiz', {
      category,
      questions: this.state.questionsByCategories[category],
    });
  }

  private showCategories() {
    const categories = R.keys(this.state.questionsByCategories);

    if (categories.length === 0) {
      return null;
    }

    return (
      <View>
        {categories.map((c, i) => (
          <StyledButton
            key={i}
            title={c.toString()}
            onPress={() => this.navigateToQuizScreen(c.toString())}
          />
        ))}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.main}>
          <View>
            <Text style={styles.header}>Welcome to</Text>
            <Text style={styles.subheader}>Trivia Challenge</Text>
          </View>
          <Text style={styles.baseText}>
            You will be presented with 10 True or False questions.
          </Text>
          <Text style={[styles.baseText, Typography.centeredText]}>
            Can you score 100%?
          </Text>
        </View>

        <View style={styles.quizIntro}>
          <StyledButton
            title="Begin"
            onPress={() => { this.fetchData() }}
          />
          {this.showCategories()}
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
    ...screenLayout,
    paddingBottom: screenVerticalPadding,

    justifyContent: 'space-between',

    flex: .85,
  },
  header: {
    ...Typography.headerText,
    color: Colors.baseTextInvertedColor,
  },
  subheader: {
    ...Typography.subheaderText,
    color: Colors.subheaderTextColor,
  },
  baseText: {
    ...Typography.baseText,
    color: Colors.baseTextInvertedColor,
    fontSize: 24,
  },

  quizIntro: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,

    backgroundColor: Colors.foregroundColor,
    padding: 20,
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,

    alignContent: "center",
    justifyContent: 'space-evenly',

    shadowColor: '#D0BD0F',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    shadowOpacity: 1,
  }
});
