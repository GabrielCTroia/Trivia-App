import React, { useState } from 'react';
import R from 'ramda';
import { View, StyleSheet, ViewProps } from 'react-native';
import { Card } from './Card';
import { noop } from '../../util';
import { ProgressBar } from './ProgressBar';
import * as Colors from '../../styles/Colors';


export type CardStackProps<T extends { [key: string]: any } = {}> = ViewProps & {
  items: T[];
  totalItemsCount: number;

  keyExtractor: (item: T) => string;
  renderItem: (item: T, index: number) => React.ReactElement | null;

  onSwipeLeft?: (cardId: string) => void;
  onSwipeRight?: (cardId: string) => void;
  onEnd?: () => void;
}

export function CardStack<T>({ onSwipeLeft = noop, onSwipeRight = noop, onEnd = noop, ...props }: CardStackProps<T>) {
  const [count, setCount] = useState(0);

  const onSwipe = (dir: 'left' | 'right', id: string) => {
    setCount((prev) => prev + 1);

    if (dir === 'left') {
      onSwipeLeft(id);
    } else {
      onSwipeRight(id);
    }
  }

  // Limit the number of items rendered at once
  const firstItems = R.take(2, props.items);

  return (
    <View style={styles.container}>
      <View style={[styles.cardsContainer, props.style]}>
        {firstItems.reverse().map((item, index) => {
          const key = props.keyExtractor(item);
          const styleName = (index === 0) ? 'backCard' : 'foreCard';

          return (
            <Card
              style={[styles.card, (firstItems.length > 1) ? styles[styleName] : styles['foreCard']]}
              key={key}
              onSwipeLeft={() => onSwipe('left', key)}
              onSwipeRight={() => onSwipe('right', key)}
            >
              {props.renderItem(item, count + firstItems.length - index)}
            </Card>
          )
        })}
      </View>
      <ProgressBar
        style={styles.progressBar}
        total={props.totalItemsCount}
        index={count}
        color={Colors.warningColor}
      />
    </View>
  );
}

const shadowStyle = {
  shadowColor: '#ddd',
  shadowOffset: { width: 0, height: 5 },
  shadowRadius: 10,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'center',
  },
  cardsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  card: {
    height: '80%',
  },
  foreCard: {
    ...shadowStyle,
    shadowOpacity: .7,
  },
  backCard: {
    top: 20,
    left: '7%',
    width: '86%',
    opacity: .9,

    ...shadowStyle,
    shadowOpacity: .5,
  },
  progressBar: {
    justifyContent: 'flex-end',
  },
});
