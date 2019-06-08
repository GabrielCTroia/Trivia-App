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

  onSwipeLeft?: (cardId: string) => void,
  onSwipeRight?: (cardId: string) => void,
  onEnd?: () => void,
}

export function CardStack<T>({ onSwipeLeft = noop, onSwipeRight = noop, onEnd = noop, ...props }: CardStackProps<T>) {
  const [cardsLeftCount, setCardsLeftCount] = useState(props.items.length - 1);

  const onSwipe = (dir: 'left' | 'right', id: string) => {
    setCardsLeftCount((prev) => prev - 1);

    if (dir === 'left') {
      onSwipeLeft(id);
    } else {
      onSwipeRight(id);
    }

    if (cardsLeftCount === 0) {
      onEnd();
    }
  }

  // Limit the number of items rendered at once
  const firstItems = R.take(2, props.items);

  return (
    <View style={[styles.container, props.style]}>
      {firstItems.reverse().map((item) => {
        const key = props.keyExtractor(item);
        return (
          <Card
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
});
