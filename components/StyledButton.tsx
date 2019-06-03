import React from 'react';
import { Button, ButtonProps, StyleSheet } from 'react-native';

// export class Button extends React.Component {
//   render() {
//     return <Text {...this.props} style={[this.props.style, { fontFamily: 'space-mono' }]} />;
//   }
// }

export const StyledButton = (props: ButtonProps) => (
    <Button  {...props} />
)

const styles = StyleSheet.create({
   container: {

   },
});