import React from 'react';
import Radium from 'radium';
import styles from './styles';

class Dialog extends React.Component {

  constructor(args) {
    super(args);
    this.state = {
      dialogPosition: args.dialogPosition ? args.dialogPosition : {
        top: 0,
        left: 0
      },
      previousParentFunctions: {},
      tabs: args.tabs,
      activeTab: args.activeTab
    };
    this.moveDialog = this.moveDialog.bind(this);
    this.stopMovingDialog = this.stopMovingDialog.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.moveDialog);
    document.addEventListener('mouseup', this.stopMovingDialog);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.moveDialog);
    document.removeEventListener('mouseup', this.stopMovingDialog);
  }

  startMovingDialog(e) {
    this.setState({
      dialogPosition: {
        ...this.state.dialogPosition,
        moving: true,
        offsetTop: e.clientY,
        offsetLeft: e.clientX
      }
    });
  }

  stopMovingDialog() {
    this.setState({
      dialogPosition: {
        ...this.state.dialogPosition,
        moving: false
      }
    });
  }

  moveDialog(e) {
    if(this.state.dialogPosition.moving) {
      this.setState({
        dialogPosition: {
          ...this.state.dialogPosition,
          top: this.state.dialogPosition.top - (this.state.dialogPosition.offsetTop - e.clientY),
          left: this.state.dialogPosition.left - (this.state.dialogPosition.offsetLeft - e.clientX),
          offsetTop: e.clientY,
          offsetLeft: e.clientX
        }
      });
    }
  }

  selectTab(key) {
    this.setState({
      activeTab: key
    })
  }

  render() {

    const { tabs, activeTab } = this.state;
    const { children, header, footer } = this.props;

    return (
      <div style={[styles.dialog, { top: this.state.dialogPosition.top, left: this.state.dialogPosition.left }]}>
        <div style={styles.dialogTitleBar} onMouseDown={this.startMovingDialog.bind(this)}>
          {(tabs) ? Object.keys(tabs).map((key) => (
            <div
              style={[styles.dialogTitleBarItem, (key === activeTab) ? styles.dialogTitleBarItem.active : null]}
              onClick={() => this.selectTab(key)}
              key={key}>
              {tabs[key].title}
            </div>
          )) : null}
        </div>
        {tabs && <div style={styles.dialogBody}>
          {header && <div style={styles.dialogBodyHeader}>
            {header}
          </div>}
          {tabs[activeTab].body && <div style={styles.dialogBodyBody}>
            {(typeof tabs[activeTab].body === 'function') ? tabs[activeTab].body() : tabs[activeTab].body}
          </div>}
          {footer && <div style={styles.dialogBodyFooter}>
            {footer}
          </div>}
        </div>}
        {!tabs && this.props.children}
      </div>
    );
  }
}

export default Radium(Dialog);
