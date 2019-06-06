import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Constants } from 'expo';

import R from 'ramda';
import Colors from '../constants/Colors';
import CommonStyle from '../styles/CommonStyle';
import { StyledButton } from '../components/buttons/StyledButton';
import { Paragraph } from '../components/text/Paragraph';
import { H1 } from '../components/text/H1';
import { H2 } from '../components/text/H2';
import { NavigationScreenProp } from 'react-navigation';
import Layout from '../constants/Layout';
import { getQuestionsByCategory, Question } from '../Api/Questions';

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

  private showCategoryList() {
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
            <H1 style={{ color: Colors.noticeTextInverted }}>Welcome to</H1>
            <H2 style={{ color: Colors.noticeText }}>Trivia Challenge</H2>
          </View>
          <Paragraph style={CommonStyle.centerText}>
            You will be presented with 10 True or False questions.
        </Paragraph>
          <Paragraph style={CommonStyle.centerText}>
            Can you score 100%?
        </Paragraph>
        </View>

        <View style={styles.quizIntro}>
          <StyledButton
            title="Begin"
            onPress={() => { this.fetchData() }}
          />
          {this.showCategoryList()}
        </View>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.genericBackground,
    paddingTop: Constants.statusBarHeight,
  },

  main: {
    // flex: 1,
    alignContent: "center",
    justifyContent: 'space-between',
    height: (Layout.window.height / 4) * 3,

  },

  titleText: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: 'bold',
  },


  quizIntro: {
    position: 'absolute',
    // top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.noticeBackground,
    // height: Layout.window.height / 4,
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,

    alignContent: "center",
    justifyContent: 'space-evenly',
  }
});
