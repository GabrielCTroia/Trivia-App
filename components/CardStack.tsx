import React, { FunctionComponent, useState } from "react";
import { ReactNode } from "react";
import { View, StyleSheet, Text, ViewProps } from "react-native";
import { Card } from "./Card";

const noop = (...args: any[]) => { };

export type CardStackProps = ViewProps & {
  // A collections of components and their ids to be rendered as cards
  cardWithIdMaps: {
    id: string;
    card: ReactNode
  }[];

  onSwipeLeft?: (cardId: string) => void,
  onSwipeRight?: (cardId: string) => void,
  onEnd?: () => void,
}

export const CardStack: FunctionComponent<CardStackProps> = ({ onSwipeLeft = noop, onSwipeRight = noop, onEnd = noop, ...props }) => {
  const [cardsLeftCount, setCardsLeftCount] = useState(props.cardWithIdMaps.length - 1);

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

  return (
    <View style={[styles.container, props.style]}>
      {props.cardWithIdMaps.map(({ id, card }) => (
        <Card
          key={id}
          onSwipeLeft={() => onSwipe('left', id)}
          onSwipeRight={() => onSwipe('right', id)}
        >
          {card}
        </Card>)
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
