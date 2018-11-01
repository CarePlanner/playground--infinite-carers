import React from 'react';
import Radium from 'radium';
import styles from './styles';
import { H1, Span, A, H5 } from '../../Text';
import { Button, Checkbox, Radio, Select, TextBox } from '../../Form';

class CarerPopup extends React.Component {

  constructor(args) {
    super(args);
    this.state = {
    };
  }

  render() {

    return (
      <div style={[styles.popup]}>
        <div style={styles.popupArrow}>
          <div style={styles.popupArrow['::before']}></div>
          <div style={styles.popupArrow['::after']}></div>
        </div>
        <div style={styles.popupLeftSection}>
          <div style={styles.popupLeftSectionHeader}>
            <div style={{
              display: 'flex',
              alignContent: 'center',
              alignItems: 'center',
              marginBottom: 10
            }}>
              <H5 showLine={true}>Select Carer</H5>
              <A>Recommend</A>
            </div>
            <TextBox style={{width: 'calc(100% - 25px)'}}/>
          </div>
          <div style={styles.carers}>
            <div style={styles.carer} key={1}>
              <div style={styles.carerImage}></div>
              <div style={styles.carerName}>
                <H5 style={styles.carerNameText}>Required</H5>
              </div>
            </div>
            <div style={styles.carer} key={2}>
              <div style={styles.carerImage}></div>
              <div style={styles.carerName}>
                <H5 style={styles.carerNameText}>Required</H5>
              </div>
            </div>
            <div style={styles.carer} key={3}>
              <div style={styles.carerImage}></div>
              <div style={styles.carerName}>
                <H5 style={styles.carerNameText}>Required</H5>
              </div>
            </div>
            <div style={styles.carer} key={4}>
              <div style={styles.carerImage}></div>
              <div style={styles.carerName}>
                <H5 style={styles.carerNameText}>Required</H5>
              </div>
            </div>
            <div style={styles.carer} key={5}>
              <div style={styles.carerImage}></div>
              <div style={styles.carerName}>
                <H5 style={styles.carerNameText}>Required</H5>
              </div>
            </div>
            <div style={styles.carer} key={6}>
              <div style={styles.carerImage}></div>
              <div style={styles.carerName}>
                <H5 style={styles.carerNameText}>Required</H5>
              </div>
            </div>
            <div style={styles.carer} key={7}>
              <div style={styles.carerImage}></div>
              <div style={styles.carerName}>
                <H5 style={styles.carerNameText}>Required</H5>
              </div>
            </div>
            <div style={styles.carer} key={8}>
              <div style={styles.carerImage}></div>
              <div style={styles.carerName}>
                <H5 style={styles.carerNameText}>Required</H5>
              </div>
            </div>
            <div style={styles.carer} key={9}>
              <div style={styles.carerImage}></div>
              <div style={styles.carerName}>
                <H5 style={styles.carerNameText}>Required</H5>
              </div>
            </div>
          </div>
        </div>
        <div style={styles.popupRightSection}>
          <div style={styles.popupRightSectionBody}>
            <div style={styles.popupRightSectionBodyBody}></div>
            <div style={styles.popupRightSectionBodyFooter}>
              <div style={{
                display: 'flex',
                alignContent: 'center',
                alignItems: 'center',
                marginBottom: 10
              }}>
                <H5 showLine={true}>Slot Settings</H5>
              </div>
              <Checkbox
                label={'Shadowing'}
              />
            </div>
          </div>
          <div style={styles.popupRightSectionFooter}>
            <A style={{color: '#FF0400'}}>Remove Slot</A>
            <Button theme={'neutral'} label={'OK'} style={{width: 50}} />
          </div>
        </div>
      </div>
    );
  }
}

export default Radium(CarerPopup);
