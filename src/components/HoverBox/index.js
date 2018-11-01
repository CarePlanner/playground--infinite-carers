import React from 'react';
import Radium from 'radium';
import styles from './styles';

class HoverBox extends React.Component {

  constructor(args) {
    super(args);
    this.state = {
      hoverBoxPosition: {
        top: -1000,
        left: -1000
      },
      previousParentFunctions: {}
    };
    if(args.parent && args.parent.current) {
      let parentDomElement = args.parent.current;
      if(parentDomElement.onmousemove) {
        this.state.previousParentFunctions.onmousemove = parentDomElement.onmousemove;
        parentDomElement.onmousemove = (e) => {
          parentDomElement.onmousemove(e);
          this.moveHoverBox.bind(this)(e);
        }
      } else {
        parentDomElement.onmousemove = this.moveHoverBox.bind(this);
      }
    }
  }

  componentWillUnmount() {
    if(this.props.parent && this.props.parent.current) {
      let parentDomElement = this.props.parent.current;
      parentDomElement.onmousemove = this.state.previousParentFunctions.onmousemove;
    }
  }

  moveHoverBox(e) {
    this.setState({
      hoverBoxPosition: {
        top: e.pageY + 15,
        left: e.pageX + 15,
      }
    });
  }

  render() {

    const { children } = this.props;

    return (
      <div style={[styles.hoverBox, this.state.hoverBoxPosition]}>
        <div>
          <div style={styles.hoverBoxTitle}>Joshua Gregory</div>
          <div>
            <div>
              <div style={styles.hoverBoxRowTitle}>Address</div>
              <div style={styles.hoverBoxRowText}>
                58 Brackendene, Bradley Stoke, Bristol, South Gloucestershire
                <br />
                BS32 9DH
              </div>
            </div>
            <div>
              <div style={styles.hoverBoxRowTitle}>Phone</div>
              <div style={styles.hoverBoxRowText}>07775592938</div>
            </div>
            <div>
              <div style={styles.hoverBoxRowTitle}>Mobile</div>
              <div style={styles.hoverBoxRowText}>07775592938</div>
            </div>
            <div>
              <div style={styles.hoverBoxRowTitle}>Region(s)</div>
              <div style={styles.hoverBoxRowText}></div>
            </div>
            <div>
              <div style={styles.hoverBoxRowTitle}>Default Invoice Group</div>
              <div style={styles.hoverBoxRowText}>Local Authority</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Radium(HoverBox);
