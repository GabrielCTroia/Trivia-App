import React, { useState } from "react";
import R from 'ramda';
import { View, StyleSheet, ViewProps } from "react-native";
import { Card } from "./Card";

const noop = (...args: any[]) => { };

export type CardStackProps<T extends { [key: string]: any } = {}> = ViewProps & {
  // A collections of components and their ids to be rendered as cards
  items: T[];
  keyExtractor: (item: T) => string;
  renderItem: (item: T) => React.ReactElement | null;

  onSwipeLeft?: (cardId: string) => void;
  onSwipeRight?: (cardId: string) => void;
  onEnd?: () => void;

  // This is here only because CardStack doesn't implement it's own indexing
  totalItemsCount: number;
}

export function CardStack<T>({ onSwipeLeft = noop, onSwipeRight = noop, onEnd = noop, ...props }: CardStackProps<T>) {
  // const [count, setCount] = useState(props.items.length - 1);

  const onSwipe = (dir: 'left' | 'right', id: string) => {
    // setCount((prev) => prev + 1);

    if (dir === 'left') {
      onSwipeLeft(id);
    } else {
      onSwipeRight(id);
    }

    // if (cardsLeftCount === 0) {
    //   onEnd();
    // }


  }

  // Limit the number of items rendered at once
  const firstItems = R.take(2, props.items);

  return (
    <View style={[styles.container, props.style]}>
      {firstItems.reverse().map((item, index) => {
        const key = props.keyExtractor(item);
        const styleName = (index === 0) ? 'backCard' : 'foreCard';
        return (
          <Card
            style={(firstItems.length > 1) ? styles[styleName] : styles['foreCard']}
            key={key}
            onSwipeLeft={() => onSwipe('left', key)}
            onSwipeRight={() => onSwipe('right', key)}
          >
            {props.renderItem(item)}
          </Card>
        )
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  foreCard: {
    shadowColor: '#000',
    shadowOffset: { width: 15, height: 10 },
    shadowRadius: 10,
    shadowOpacity: .1,
  },
  backCard: {
    top: 20,
    width: '86%',
    left: '7%',

    shadowColor: '#F0E7CB',
    shadowOffset: { width: 15, height: 15 },
    shadowRadius: 10,
    shadowOpacity: 1,
  },
});
