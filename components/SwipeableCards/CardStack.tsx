import React, { useState } from "react";
import R from 'ramda';
import { View, StyleSheet, ViewProps } from "react-native";
import { Card } from "./Card";
import { noop } from "../../util";


export type CardStackProps<T extends { [key: string]: any } = {}> = ViewProps & {
  // A collections of components and their ids to be rendered as cards
  items: T[];
  keyExtractor: (item: T) => string;
  renderItem: (item: T, index: number) => React.ReactElement | null;

  onSwipeLeft?: (cardId: string) => void;
  onSwipeRight?: (cardId: string) => void;
  onEnd?: () => void;

  // This is here only because CardStack doesn't implement it's own indexing
  totalItemsCount: number;
}

export function CardStack<T>({ onSwipeLeft = noop, onSwipeRight = noop, onEnd = noop, ...props }: CardStackProps<T>) {
  const [count, setCount] = useState(props.items.length - 1);

  const onSwipe = (dir: 'left' | 'right', id: string) => {
    setCount((prev) => prev - 1);

    if (dir === 'left') {
      onSwipeLeft(id);
    } else {
      onSwipeRight(id);
    }
  }

  // Limit the number of items rendered at once
  const firstItems = R.take(2, props.items);

  return (
    <View style={[styles.container, props.style]}>
      {firstItems.reverse().map((item, index) => {
        const key = props.keyExtractor(item);
        const styleName = (index === 0) ? 'backCard' : 'foreCard';

        const getCurrentCardIndex = props.totalItemsCount - (count && count - 1) - index;
        return (
          <Card
            style={(firstItems.length > 1) ? styles[styleName] : styles['foreCard']}
            key={key}
            onSwipeLeft={() => onSwipe('left', key)}
            onSwipeRight={() => onSwipe('right', key)}
          >
            {props.renderItem(item, getCurrentCardIndex)}
          </Card>
        )
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  foreCard: {
    shadowColor: '#ddd',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: .7,
  },
  backCard: {
    top: 20,
    width: '86%',
    left: '7%',
    opacity: .9,

    shadowColor: '#ddd',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: .5,
  },
});
