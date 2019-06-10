import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
} from 'react-native';

import R from 'ramda';
import * as Colors from '../styles/Colors';
import { StyledButton, ButtonTypes } from '../components/buttons/StyledButton';
import { NavigationScreenProp } from 'react-navigation';
import { getQuestionsByCategory, Question } from '../Api/Questions';
import * as Typography from '../styles/Typography';
import * as Layout from '../styles/Layout';
import { FlatList } from 'react-native-gesture-handler';
import { TouchableListItem } from '../components/List/TouchableListItem';


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

  private showBeginButton() {
    const categories = R.keys(this.state.questionsByCategories);

    if (categories.length > 0) {
      return null;
    }

    return (
      <StyledButton
        title="Begin"
        buttonType={ButtonTypes.warning}
        buttonFit="full"
        onPress={() => { this.fetchData() }}
      />
    );
  }

  private showCategories() {
    const categories = R.keys(this.state.questionsByCategories);

    if (categories.length === 0) {
      return null;
    }

    return (
      <View>
        <Text style={styles.categoriesListHeader}>Choose Category</Text>
        <FlatList
          style={styles.categoriesList}
          data={categories}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }) => (
            <TouchableListItem
              content={item}
              onPress={() => { this.navigateToQuizScreen(item) }}
            />
          )}
        />
      </View>
    );
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
            <Text style={styles.baseText}>
              Can you score 100%?
            </Text>
          </View>
          {/* <Text style={[styles.baseText, Typography.centeredText]}>

          </Text> */}
        </View>

        <View style={styles.quizIntro}>
          {this.showBeginButton()}
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
    ...Layout.screenLayoutWithoutHeader,
    paddingBottom: Layout.screenVerticalPadding,

    // justifyContent: 'space-between',

    flex: .8,
    height: Layout.screenHeight - 120,
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

  categoriesList: {},

  categoriesListHeader: {
    ...Typography.baseText,

    fontSize: 19,
    paddingBottom: 20,
    color: Colors.baseTextColor,
    fontWeight: 'bold',
  }

});
