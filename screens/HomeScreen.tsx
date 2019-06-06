import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Constants } from 'expo';

import Colors from '../constants/Colors';
import CommonStyle from '../styles/CommonStyle';
import { StyledButton } from '../components/buttons/StyledButton';
import { Paragraph } from '../components/text/Paragraph';
import { H1 } from '../components/text/H1';
import { H2 } from '../components/text/H2';
import { NavigationScreenProp } from 'react-navigation';
import Layout from '../constants/Layout';
import { getQuestions } from '../Api/Questions';

export interface HomeScreenProps {
  navigation: NavigationScreenProp<any, any>;
}

export class HomeScreen extends React.Component<HomeScreenProps> {
  static navigationOptions = {
    header: null,
  };

  private async loadDatAndNavigate() {
    const { navigate } = this.props.navigation;

  const questions = await getQuestions();

    navigate('Quiz', {
      questions: questions.slice(0, 1),
    });
  }

  render() {


    return (
      <View style={styles.container}>
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

        <View style={styles.roundBox}>
          <StyledButton
            title="Begin"
            onPress={() => { this.loadDatAndNavigate() }}
          />
        </View>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.genericBackground,
    alignContent: "center",
    justifyContent: 'space-between',
    paddingTop: Constants.statusBarHeight,
  },
  titleText: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: 'bold',
  },
  roundBox: {
    backgroundColor: Colors.noticeBackground,
    height: Layout.window.height / 4,
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,

    alignContent: "center",
    justifyContent: 'space-evenly',
  }
});
