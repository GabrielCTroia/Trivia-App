import * as React from 'react';
import { BlockText } from './BlockText';

export class Title extends React.Component {
  render() {
    return <BlockText {...this.props} style={{
      textAlign: "center",
      fontSize: 25,
      fontWeight: 'bold',
    }} />
  }
}
