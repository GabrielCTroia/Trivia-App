import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Constants } from 'expo';

import Colors from '../constants/Colors';
import CommonStyle from '../styles/CommonStyle';
import { StyledButton } from '../components/buttons/StyledButton';
import { Title } from '../components/text/Title';
import { Paragraph } from '../components/text/Paragraph';
import { NavigationScreenProp } from 'react-navigation';

// enum QuestionDiffuculty {
//   easy,
//   hard,
// }

// export class Question {
//   public title: string;
//   public difficulty: QuestionDiffuculty;
//   public correctAnswer: boolean;

//   constructor({}) {

//   }
// }

// export class Answer {
//   public isCorrect: boolean;

//   constructor(public question: Question, answered: boolean) {
//     this.isCorrect = question.
//   }
// }

export interface QuizScreenParams {
  category: string;
  topic: string;

  questions: {
    title: string;
    correctAnswer: boolean;
  }[],
}

export interface QuizScreenProps {
  navigation: NavigationScreenProp<any, QuizScreenParams>;
}



// const passedProps: QuizScreenProps = {
//   category: 'Entertainment',
//   topic: 'Video Games',

//   questions: [
//     {
//       title: 'Is that you Mario?',
//       correctAnswer: true,
//     }
//   ]
// }


export class QuizScreen extends React.Component<QuizScreenProps> {
  static navigationOptions = {
    header: null,
  };

  render() {
    // const x = this.props.navigation.state
    console.log('navigation', this.props.navigation);

    return (
      <View style={styles.container}>
        <Title>Welcome to Trivia Challenge!</Title>
        <Paragraph style={CommonStyle.centerText}>
          You will be presented with 10 True or False questions.
        </Paragraph>
        <Paragraph style={CommonStyle.centerText}>
          Can you score 100%?
        </Paragraph>
        <StyledButton
          title="Begin"
          onPress={(s) => { console.log(s) }}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.noticeBackground,
    alignContent: "center",
    justifyContent: 'space-between',
    paddingTop: Constants.statusBarHeight,
  },
  titleText: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: 'bold',
  },
});
