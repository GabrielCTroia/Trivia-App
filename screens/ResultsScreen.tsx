import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationScreenProp, FlatList } from 'react-navigation';
import { AnsweredQuestionItem, AnsweredQuestion } from '../components/AnsweredQuestionItem';
import { StyledButton, ButtonTypes } from '../components/buttons/StyledButton';
import * as Typography from '../styles/Typography';
import * as Colors from '../styles/Colors';
import * as Layout from '../styles/Layout';


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
        <View style={styles.main}>
          <Text style={Typography.headerTextInverted}>You scored {calculateScore(answeredQuestions)}%</Text>

          <FlatList
            data={answeredQuestions}
            keyExtractor={(q) => q.id}
            renderItem={({ item }) => <AnsweredQuestionItem {...item} />}
            ListFooterComponent={
              <StyledButton
                textStyle={styles.playAgainButtonText}
                buttonType={ButtonTypes.clear}
                title="Play Again"
                onPress={() => { this.props.navigation.navigate('Home') }}
              />
            }
          />


        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...Layout.screenLayout,
    backgroundColor: Colors.backgroundColor,
  },
  main: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  playAgainButtonText: {
    color: Colors.baseTextInvertedColor,
  }
});