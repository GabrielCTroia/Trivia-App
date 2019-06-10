import React from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import { StyledButton, ButtonTypes } from '../../components/buttons/StyledButton';
import { NavigationScreenProp } from 'react-navigation';
import { getQuestionsByCategory, Question } from '../../Api/Questions';
import { CategoriesList } from './CategoriesList';
import * as Colors from '../../styles/Colors';
import * as Typography from '../../styles/Typography';
import * as Layout from '../../styles/Layout';


export interface HomeScreenProps {
  navigation: NavigationScreenProp<any, any>;
}

interface State {
  questionsByCategories: { [k: string]: Question[] },
  fetching: boolean;
  fetchError: boolean;
}

export class HomeScreen extends React.Component<HomeScreenProps, State> {
  static navigationOptions = {
    header: null,
  };

  constructor(props: HomeScreenProps) {
    super(props);

    this.state = {
      questionsByCategories: {},
      fetching: false,
      fetchError: false,
    };
  }

  private async fetchData() {
    await this.setState({ fetching: true });

    getQuestionsByCategory()
      .then((questionsByCategories) => {
        this.setState({
          fetching: false,
          questionsByCategories,
          fetchError: false,
        });
      })
      .catch(() => {
        this.setState({
          fetching: false,
          fetchError: true,
        });
      });
  }

  private navigateToQuizScreen(category: string) {
    const { navigate } = this.props.navigation;

    navigate('Quiz', {
      category,
      questions: this.state.questionsByCategories[category],
    });
  }

  private showBeginButton() {
    const categories = Object.keys(this.state.questionsByCategories);

    if (categories.length > 0) {
      return null;
    }

    return (
      <StyledButton
        title="Begin"
        buttonType={ButtonTypes.warning}
        buttonFit="full"
        onPress={() => { this.state.fetching || this.fetchData() }}
      />
    );
  }

  private showCategories() {
    const categories = Object.keys(this.state.questionsByCategories);

    if (categories.length === 0) {
      return null;
    }

    return (
      <CategoriesList
        categories={categories.map((c) => c.toString())}
        onPress={(item) => this.navigateToQuizScreen(item)}
      />
    );
  }

  private showFetchError() {
    if (!this.state.fetchError || this.state.fetching) {
      return null;
    }

    return (
      <View style={styles.error}>
        <Text style={styles.errorText}>
          There was a Network Error. Please try again!
        </Text>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.main}>
          <View>
            <Text style={styles.header}>Welcome to</Text>
            <Text style={styles.subheader}>Trivia Challenge</Text>
          </View>

          <View style={styles.tagLines}>
            <Text style={styles.baseText}>
              You will be presented with 10 True or False questions.
              </Text>
            <Text style={[styles.baseText, Typography.boldText]}>
              Can you score 100%?
            </Text>
          </View>
        </View>

        <View style={styles.quizIntro}>
          {this.showBeginButton()}
          {this.showCategories()}
          {this.showFetchError()}
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
    ...Layout.screenLayoutWithoutHeader,
    flex: .8,
    height: Layout.screenHeight - 120,
    paddingBottom: Layout.screenVerticalPadding,
  },
  tagLines: {
    paddingTop: 100,
  },
  header: {
    ...Typography.headerText,
    color: Colors.baseTextColorInverted,
    fontSize: Typography.largestFontSize,
  },
  subheader: {
    ...Typography.subheaderText,
    color: Colors.subheaderTextColorInverted,
    fontSize: Typography.extraLargeFontSize,
  },
  baseText: {
    ...Typography.baseText,
    color: Colors.baseTextColorInverted,
    fontSize: 24,
  },
  quizIntro: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,

    paddingTop: Layout.insetPadding * 2,
    paddingBottom: Layout.insetPadding * 2,
    paddingLeft: Layout.insetPadding,
    paddingRight: Layout.insetPadding,

    backgroundColor: Colors.foregroundColor,
    borderTopLeftRadius: Layout.screenBorderRadius,
    borderTopRightRadius: Layout.screenBorderRadius,

    alignContent: "center",
    justifyContent: 'space-evenly',
  },
  error: {
    paddingTop: 20,
  },
  errorText: {
    ...Typography.errorText,
    textAlign: 'center',
  }
});
