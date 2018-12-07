import React from 'react';
import ReactDOM from 'react-dom';
import Radium, { Style } from 'radium';
import { connect } from 'react-redux';
import styles from './styles';
import {
  H1,
  H2,
  Span,
  A,
  H5
} from '../../../Text';
import {
  Button,
  Checkbox,
  Radio,
  Select,
  TextBox
} from '../../../Form';

class CarerDetails extends React.Component {

  constructor(args) {
    super(args);
  }

  renderTravelFromText() {
    return (
      <div style={styles.recommendedTextStatement}>
        <div style={styles.recommendedTextStatementPositive}>Distance from carer's home: 1.2 miles</div>
        <div>Travel time: 3 minutes</div>
      </div>
    );
  }

  renderTravelToText() {
    return (
      <div style={styles.recommendedTextStatement}>
        <div style={styles.recommendedTextStatementPositive}>Distance to next appointment: 1.2 miles</div>
        <div>Travel time: 3 minutes</div>
      </div>
    );
  }

  renderCareTypesText() {
    const { careRequired, carer } = this.props;
    const careTypes = carer.careTypes;

    const matchingCareTypes = careRequired.filter((careType) => careTypes.includes(careType));
    const nonMatchingCareTypes = careRequired.filter((careType) => !careTypes.includes(careType));

    return (
      <div style={styles.recommendedTextStatement}>
        <Span style={[(matchingCareTypes.length === 0) ? (careRequired.length > 0) ? styles.recommendedTextStatementNegative : null : null]}>Carer has <span style={{fontWeight: 'bold'}}>{matchingCareTypes.length}</span> out of <span style={{fontWeight: 'bold'}}>{careRequired.length}</span> required care skills.</Span>
        {careRequired.map((careType) => <div style={(matchingCareTypes.includes(careType)) ? styles.recommendedTextStatementPositive : styles.recommendedTextStatementNegative}>{careType}</div>)}
      </div>
    );
  }

  renderVisitText() {
    const { carer } = this.props;
    const numberOfVisits = carer.numberOfVisits;
    return (
      <div style={styles.recommendedTextStatement}>
      {(() => {
        if(numberOfVisits > 1) {
          return (<Span style={styles.recommendedTextStatementPositive}>{`Carer has visited client ${numberOfVisits} times, most recently 5 days ago.`}</Span>);
        } else if(numberOfVisits === 1) {
          return (<Span style={styles.recommendedTextStatementPositive}>{'Carer has visited the client once, most recently 5 days ago.'}</Span>);
        } else {
          return (<Span>{'Carer has never visited the client.'}</Span>);
        }
      })()}
      </div>
    );
  }

  renderAvailabilityText() {
    const { carer } = this.props;
    const available = carer.available;
    return (
      <div style={styles.recommendedTextStatement}>
      {(() => {
        switch(available) {
          case 2:
            return (<Span style={styles.recommendedTextStatementPositive}>{`Carer is available.`}</Span>);
          case 1:
            return (<Span style={styles.recommendedTextStatementPositive}>{'Carer is possibly available.'}</Span>);
          case 0:
          default:
            return (<Span style={styles.recommendedTextStatementNegative}>{'Carer is not available.'}</Span>);
        }
      })()}
      </div>
    );
  }

  renderCarerPreferencesText() {
    const { carer } = this.props;
    const favoured = carer.favoured;
    if(favoured === 0) {
      return null;
    }
    return (
      <div style={styles.recommendedTextStatement}>
      {(() => {
        switch(favoured) {
          case 2:
            return (<Span style={styles.recommendedTextStatementPositive}>Carer <A>{carer.name}</A> favours client <A>Amelie Gibson</A></Span>);
          case 1:
          default:
            return (<Span style={styles.recommendedTextStatementNegative}>Carer <A>{carer.name}</A> disfavours client <A>Amelie Gibson</A></Span>);
        }
      })()}
      </div>
    );
  }

  renderOverlapsText() {
    const { carer } = this.props;
    const overlaps = carer.overlaps;
    return (
      <div style={styles.recommendedTextStatement}>
      {(() => {
        switch(overlaps) {
          case 3:
            return (<Span style={styles.recommendedTextStatementNegative}>{`Carer is on another appointment.`}</Span>);
          case 2:
            return (<Span style={styles.recommendedTextStatementNegative}>{`Carer is booked on time off.`}</Span>);
          case 1:
            return (<Span style={styles.recommendedTextStatementNegative}>{'Carer is booked on training.'}</Span>);
          case 0:
          default:
            return (<Span>{'No overlaps.'}</Span>);
        }
      })()}
      </div>
    );
  }

  render() {
    const { carer } = this.props;
    return (
      <div style={styles.popupBody}>
        <div style={{display: 'flex', alignItems: 'center', marginBottom: 15}}>
          <div style={styles.carerImage}></div>
          <H5 showLine={true}>
            <Span>{carer.name} </Span><Span style={{color: '#9B9B9B'}}> · Active</Span>
          </H5>
        </div>
        {this.renderVisitText()}
        {this.renderAvailabilityText()}
        {this.renderOverlapsText()}
        {this.renderCarerPreferencesText()}
        {this.renderCareTypesText()}
        {this.renderTravelToText()}
        {this.renderTravelFromText()}
      </div>
    );
  }
}

export default Radium(CarerDetails);
