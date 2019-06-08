import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Colors from '../styles/Colors';
import { H2 } from '../components/text/H2';
import { NavigationScreenProp, FlatList } from 'react-navigation';
import { AnsweredQuestionItem, AnsweredQuestion } from '../components/AnsweredQuestionItem';
import { StyledButton } from '../components/buttons/StyledButton';
import { Constants } from 'expo';


export interface ResultsScreenParams {
  answeredQuestion: AnsweredQuestion[];
}

export interface ResultsScreenProps {
  navigation: NavigationScreenProp<any, ResultsScreenParams>;
}

const calculateScore = (aqs: AnsweredQuestion[]) => {
  const answeredCorrectly = aqs.filter((aq) => aq.correctAnswer === aq.givenAnswer);

  return Math.round(answeredCorrectly.length / aqs.length * 100);
}

export class ResultsScreen extends React.Component<ResultsScreenProps> {
  static navigationOptions = {
    header: null,
  };

  render() {
    // TODO: For some reason the Params are not used/inferred from the react-navigation lib. Investigate further!
    // Temporary solution: Manually annotate for now!
    const answeredQuestions: AnsweredQuestion[] = this.props.navigation.state.params.answeredQuestions || [];

    return (
      <View style={styles.container}>
        {/* <View style={styles.quizOutro}></View> */}

        <View style={styles.main}>
          <H2>You scored {calculateScore(answeredQuestions)}%</H2>

          <FlatList
            style={styles.questionsList}
            data={answeredQuestions}
            keyExtractor={(q) => q.id}
            renderItem={({ item }) => <AnsweredQuestionItem {...item} />}
          />

          <StyledButton
            title="Play Again"
            onPress={() => { this.props.navigation.navigate('Home') }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
    flex: 1,
    alignContent: "center",
    justifyContent: 'space-between',
    paddingTop: Constants.statusBarHeight,
  },
  questionsList: {},
  quizOutro: {
    flex: .2,
    backgroundColor: Colors.foregroundColor,
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,

    alignContent: "center",
    justifyContent: 'space-evenly',
  },
  main: {
    flex: 1,
    justifyContent: 'space-evenly',
  }
});