import React, { FunctionComponent } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { QuestionBox } from './QuestionBox';
import { CardStack } from '../../components/SwipeableCards/CardStack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Typography from '../../styles/Typography';
import * as Colors from '../../styles/Colors';
import { Question } from '../../Api/Questions';

export type QuestionsInteraction = {
  questions: Question[];
  onAnswer: (id: string, options: boolean) => void;
  totalQuestions: number,
};

export const QuestionsInteraction: FunctionComponent<QuestionsInteraction> = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.tutorial}>
        <View style={styles.tutorialTextContainer}>
          <Text style={styles.tutorialText}>FALSE</Text>
        </View>
        <View style={styles.swipeTipContainer}>
          <MaterialCommunityIcons
            style={styles.swipeTip}
            name="gesture-swipe-horizontal"
            color={Colors.lightShade}
          />
        </View>
        <View style={styles.tutorialTextContainer}>
          <Text style={styles.tutorialText}>TRUE</Text>
        </View>
      </View>
      <CardStack
        items={props.questions}
        keyExtractor={(item) => item.id}
        renderItem={(item, index) => <QuestionBox question={item} index={index} />}
        onSwipeLeft={(id) => props.onAnswer(id, false)}
        onSwipeRight={(id) => props.onAnswer(id, true)}
        totalItemsCount={props.totalQuestions}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  tutorial: {
    flex: .4,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  swipeTipContainer: {
    justifyContent: 'center',
  },
  swipeTip: {
    fontSize: 80,
  },
  tutorialTextContainer: {
    justifyContent: 'center',
  },
  tutorialText: {
    ...Typography.baseText,
    color: Colors.baseTextColor,
  },
});
