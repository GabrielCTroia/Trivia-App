import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Constants } from 'expo';

import Colors from '../constants/Colors';
import CommonStyle from '../styles/CommonStyle';
import { StyledButton } from '../components/StyledButton';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}> */}
          <View>
            <Text style={[CommonStyle.centerText, styles.titleText]}>Welcome to Trivia Challenge!</Text>
          </View>
          <View>
            <Text style={[CommonStyle.centerText]}>You will be presented with 10 True or False questions.</Text>
          </View>
          <View>
            <Text style={[CommonStyle.centerText]}>Can you score 100%?</Text>
          </View>
          <StyledButton 
            title='Begin'
            onPress={(s) => {console.log('begin')}}
          />
        {/* </ScrollView> */}
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
  titleContainer: {
    textAlign: "center",
  },
  titleText: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: 'bold',
  },

  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
