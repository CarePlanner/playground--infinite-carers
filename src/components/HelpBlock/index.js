import React from 'react';
import Radium from 'radium';
import styles from './styles';

class HelpBlock extends React.Component {

  render() {

    const { style, text } = this.props;

    return (
      <div style={[styles.helpBlock, style]}>
        {text}
      </div>
    );
  }
}

export default Radium(HelpBlock);
