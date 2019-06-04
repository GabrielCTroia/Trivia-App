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

export class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
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
});
