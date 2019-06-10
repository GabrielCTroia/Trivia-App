import React, { FunctionComponent } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { TouchableListItem } from '../../components/List/TouchableListItem';
import * as Typography from '../../styles/Typography';
import * as Colors from '../../styles/Colors';

export type CategoriesListProps = {
  categories: string[];
  onPress: (category: string) => void;
}

export const CategoriesList: FunctionComponent<CategoriesListProps> = (props) => (
  <View>
    <Text style={styles.categoriesListHeader}>Choose Category</Text>
    <FlatList
      data={props.categories}
      keyExtractor={(_, i) => i.toString()}
      renderItem={({ item }) => (
        <TouchableListItem
          content={item}
          onPress={() => { props.onPress(item) }}
        />
      )}
    />
  </View>
);

const styles = StyleSheet.create({
  categoriesListHeader: {
    ...Typography .baseText,
    ...Typography.boldText,
    fontSize: 19,
    paddingBottom: 20,
    color: Colors.baseTextColor,
    fontWeight: 'bold',
  }
});
