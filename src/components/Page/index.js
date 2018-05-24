import React from 'react';
import Radium from 'radium';
import styles from './styles';

class Page extends React.Component {

  render() {

    const { children, navbar } = this.props;

    return (
      <div style={styles.body}>
        {navbar}
        <div style={styles.childrenContainer}>
          {children}
        </div>
      </div>
    );
  }
}

export default Radium(Page);
