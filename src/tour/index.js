import React from 'react';
import axios from 'axios';
import Radium from 'radium';
import { connect } from 'react-redux';
import styles from './styles';

class Tour extends React.Component {

  constructor(args) {
    super(args);
    this.state = {
      tour: [],
      metadata: {},
      currentSectionNumber: -1,
      loading: true,
      formAnswers: {},
      shouldShowScrollIndicator: false
    };
    this.bodyRef = React.createRef();
    this.showHideScrollIndicator.bind(this);
    this.previousStep = this.previousStep.bind(this);
    this.nextStep = this.nextStep.bind(this);
    axios.get('https://script.google.com/macros/s/AKfycbzuidZKbbQ4MPmPW_UKXJ12F1jg26_JANci34U57UBvC5k-zLIK/exec?url=1YUBnHM5scM2CrJaH1RVh1FtIbLX7Hi1yNS0Owt-gyac')
      .then((data) => {
        const { sections, metadata } = data.data;
        this.setState({
          tour: this.convertFormToTour(sections),
          metadata,
          loading: false,
          firstSectionNumber: (!metadata.title && !metadata.description) ? 0 : -1,
          currentSectionNumber: (!metadata.title && !metadata.description) ? 0 : -1,
          shouldShowScrollIndicator: null
        });
      });
  }

  showHideScrollIndicator(element) {
    this.setState({
      shouldShowScrollIndicator: (element.scrollTop + element.getBoundingClientRect().height < element.scrollHeight) ? 1 : 0
    });
  }

  convertFormToTour(form) {
    return form;
  }

  isFirstSection() {
    const { currentSectionNumber, tour, firstSectionNumber } = this.state;
    return currentSectionNumber === firstSectionNumber;
  }

  previousStep() {
    const { sectionActions, beginTourAction } = this.props;
    const { currentSectionNumber, tour, firstSectionNumber } = this.state;
    const currentSection = tour[currentSectionNumber];

    if(!this.isFirstSection()) {
      this.setState({
        currentSectionNumber: currentSectionNumber - 1,
        shouldShowScrollIndicator: null
      });
      if(beginTourAction && currentSectionNumber === firstSectionNumber + 1) {
        beginTourAction(this);
      }
      if(sectionActions && sectionActions[currentSectionNumber - 1]) {
        sectionActions[currentSectionNumber - 1](this);
      }
    } else {

    }
  }

  nextStep() {
    const { sectionActions, finishTourAction } = this.props;
    const { currentSectionNumber, tour } = this.state;
    const currentSection = tour[currentSectionNumber];
    const isLastSection = tour.length === currentSectionNumber + 1;

    if(!isLastSection) {
      this.setState({
        currentSectionNumber: currentSectionNumber + 1,
        shouldShowScrollIndicator: null
      });
      if(finishTourAction && currentSectionNumber === tour.length - 2) {
        finishTourAction(this);
      }
      if(sectionActions && sectionActions[currentSectionNumber + 1]) {
        sectionActions[currentSectionNumber + 1](this);
      }
    } else {

    }
  }

  saveAnswer(key, value) {
    const formKey = `entry.${key}`;
    this.setState({
      formAnswers: {
        ...this.state.formAnswers,
        [formKey]: value
      }
    });
  }

  populateStringTemplate(value) {
    const self = this;
    return value.replace(/\$\{(?<variable>[^}]+)\}/g, (a, b) => eval(`self.props.${b}`));
  }

  generateUserInput(item) {
    switch(item.type) {
      case 'MULTIPLE_CHOICE':
        return (
          <div>
            {item.title && <p style={styles.bodyText}>{this.populateStringTemplate(item.title)}</p>}
            <div style={styles.formControls}>
              {item.choices.map((choice, i) => (
                <label key={i} style={[styles.option, (i === item.choices.length - 1) ? {marginBottom: 0} : null]}>
                  <input type={'radio'} value={choice} style={styles.checkbox} name={item.id} onChange={(e) => this.saveAnswer(item.id, e.target.value)}/>
                  {choice}
                </label>
              ))}
            </div>
            {item.helpText && <p style={styles.bodyHelpText}>{this.populateStringTemplate(item.helpText)}</p>}
          </div>
        );
      case 'CHECKBOX':
        return (
          <div>
            {item.title && <p style={styles.bodyText}>{item.title}</p>}
            <div style={styles.formControls}>
              {item.choices.map((choice, i) => (
                <label key={i} style={[styles.option, (i === item.choices.length - 1) ? {marginBottom: 0} : null]}>
                  <input type={'checkbox'} value={choice} style={styles.checkbox} name={item.id} onChange={(e) => this.saveAnswer(item.id, e.target.value)}/>
                  {choice}
                </label>
              ))}
            </div>
            {item.helpText && <p style={styles.bodyHelpText}>{item.helpText}</p>}
          </div>
        );
      case 'TEXT':
        return (
          <div>
            {item.title && <p style={styles.bodyText}>{item.title}</p>}
            <input type="text" style={[styles.formControls, styles.textField]} name={item.id} onKeyUp={(e) => this.saveAnswer(item.id, e.target.value)} />
            {item.helpText && <p style={styles.bodyHelpText}>{item.helpText}</p>}
          </div>
        );
      case 'PARAGRAPH_TEXT':
        return (
          <div>
            {item.title && <p style={styles.bodyText}>{item.title}</p>}
            <textarea style={[styles.formControls, styles.textField, styles.textarea]} name={item.id} onKeyUp={(e) => this.saveAnswer(item.id, e.target.value)} />
            {item.helpText && <p style={styles.bodyHelpText}>{item.helpText}</p>}
          </div>
        );
        case 'SECTION_HEADER':
          return (
            <div>
              {item.title && <p style={styles.bodyText}>{this.populateStringTemplate(item.title)}</p>}
              {item.helpText && <p style={styles.bodyText}>{this.populateStringTemplate(item.helpText)}</p>}
            </div>
          );
      default:
        return null;
    }
  }

  render() {
    const { tour, metadata, loading, currentSectionNumber } = this.state;
    let { shouldShowScrollIndicator } = this.state;

    if(loading) {
      return <div>loading</div>;
    }

    if(currentSectionNumber === -1) {
      return (
        <div style={styles.container}>
          {metadata.title && (<div style={styles.header}>
            <h3 style={styles.headerTitle}>{metadata.title}</h3>
            {metadata.description && (
              <p style={styles.headerDescription}>{metadata.description}</p>
            )}
          </div>)}
          <div style={styles.footer}>
            <a key={0} style={[styles.footerButton, styles.buttonPositive]} onClick={this.nextStep}>Begin</a>
          </div>
        </div>
      );
    }

    const section = tour[currentSectionNumber];

    if(shouldShowScrollIndicator === null) {
      if(this.bodyRef && this.bodyRef.current) {
        shouldShowScrollIndicator = (this.bodyRef.current.scrollTop + this.bodyRef.current.getBoundingClientRect().height < this.bodyRef.current.scrollHeight);
      }
    }

    return (
      <div style={styles.container}>
        {section.section.title && (<div style={styles.header}>
          <h3 style={styles.headerTitle}>{section.section.title}</h3>
          {section.section.helpText && (
            <p style={styles.headerDescription}>{section.section.helpText}</p>
          )}
        </div>)}
        <div ref={this.bodyRef} style={styles.body} onScroll={(e) => this.showHideScrollIndicator(e.target)}>
          {section.items.map((item, i) => (
            <div style={[styles.bodyItems, (i === section.items.length - 1) ? { borderBottomWidth: 0 } : null]}>
              {this.generateUserInput(item)}
            </div>
          ))}
        </div>
        <div style={styles.footer}>
          <div style={[styles.scrollIndicator, { opacity: (shouldShowScrollIndicator) ? 1 : 0 }]}>Scroll for more...</div>
          {(!this.isFirstSection()) && <a key={0} style={[styles.footerButton, styles.buttonNeutral, { marginRight: 15 }]} onClick={this.previousStep}>Back</a>}
          <a key={1} style={[styles.footerButton, styles.buttonPositive]} onClick={this.nextStep}>Next</a>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    ...state.appointmentDialogReducer,
    ...state.blankManagePageReducer
  };
};

export default connect(
  mapStateToProps
)(Radium(Tour));
