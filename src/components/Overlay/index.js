import React from 'react';
import Radium from 'radium';
import styles from './styles';

import { H3 } from '../Text';

class Overlay extends React.Component {

  render() {

    const { children, onClose, title } = this.props;

    return (
      <div>
        <div style={styles.background} />
        <div style={styles.container}>
          <div style={styles.closeButtonContainer} onClick={(onClose) ? onClose : null}>
            <img src={require('./close.png')} style={styles.closeButton} />
          </div>
          <div style={styles.innerContainer}>
            <H3 style={styles.title}>{title}</H3>
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default Radium(Overlay);
