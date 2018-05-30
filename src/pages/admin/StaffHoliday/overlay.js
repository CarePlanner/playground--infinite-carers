import React from 'react';
import styles from './styles';
import { Button, Checkbox, Radio, RadioGroup, TextBox, Select } from '../../../components/Form';
import { Span, A, H5 } from '../../../components/Text';
import Overlay from '../../../components/Overlay';
import HelpBlock from '../../../components/HelpBlock';

export default class StaffHolidayOverlay extends React.Component {

  constructor(args) {
    super(args);
  }

  changeMonth(event) {
    const { onChangeMonth, index } = this.props;
    const month = event.target.value;
    onChangeMonth(index, month);
  }

  changeEnableHourlySettings(enable) {
    const { onChangeEnableHourlySettings, index } = this.props;
    onChangeEnableHourlySettings(index, enable);
  }

  changeEnableDailySettings(enable) {
    const { onChangeEnableDailySettings, index } = this.props;
    onChangeEnableDailySettings(index, enable);
  }

  changeHourlyEntitlementType(type) {
    const { onChangeHourlyEntitlementType, index } = this.props;
    onChangeHourlyEntitlementType(index, type);
  }

  changeHourlyEntitlementHours(event) {
    const { onChangeHourlyEntitlementHours, index } = this.props;
    const hours = event.target.value;
    onChangeHourlyEntitlementHours(index, hours);
  }

  changeHourlyExcessType(type) {
    const { onChangeHourlyExcessType, index } = this.props;
    onChangeHourlyExcessType(index, type);
  }

  changeHourlyExcessHours(event) {
    const { onChangeHourlyExcessHours, index } = this.props;
    const hours = event.target.value;
    onChangeHourlyExcessHours(index, hours);
  }

  changeHourlyRateOfPay(rate) {
    const { onChangeHourlyRateOfPay, index } = this.props;
    onChangeHourlyRateOfPay(index, rate);
  }

  changeDailyEntitlement(event) {
    const { onChangeDailyEntitlement, index } = this.props;
    const days = event.target.value;
    onChangeDailyEntitlement(index, days);
  }

  changeDailyExcessType(type) {
    const { onChangeDailyExcessType, index } = this.props;
    onChangeDailyExcessType(index, type);
  }

  changeDailyExcessDays(event) {
    const { onChangeDailyExcessDays, index } = this.props;
    const days = event.target.value;
    onChangeDailyExcessDays(index, days);
  }

  render() {

    const { onClose, year, months } = this.props;

    return (
      <Overlay title={"Staff Holiday settings"} onClose={onClose}>
        <div>
          <div>
            <Span>
              {'The holiday year starts at the beginning of'}
              <Select inline={ true } options={ months } value={ year.month } onChange={ this.changeMonth.bind(this) } />
            </Span>
          </div>
          <div>
            <Checkbox label={'I have staff working part-time and some working irregular hours'} selectedValues={year.hourly.enabled} onClick={ this.changeEnableHourlySettings.bind(this) } style={ styles.radioPadding } />
            <div style={[styles.subform, { display: (year.hourly.enabled) ? 'block': 'none' }, { marginBottom: 20 }]}>
              <div style={styles.formSection}>
                <H5>Holiday entitlement</H5>
                <Radio label={'12.07% ACAS standard accrual'} value={'acasAccrual'} selectedValue={ year.hourly.entitlement.type } onClick={ this.changeHourlyEntitlementType.bind(this) } style={ styles.radioPadding } />
                <Radio label={'8% Irish standard accrual'} value={'irishAccrual'} selectedValue={ year.hourly.entitlement.type } onClick={ this.changeHourlyEntitlementType.bind(this) } style={ styles.radioPadding } />
                <Radio value={'fixed'} selectedValue={ year.hourly.entitlement.type } onClick={ this.changeHourlyEntitlementType.bind(this) } style={ styles.radioPaddingWithTextBox }>
                  {'Fixed at'}
                  <TextBox
                    type={'number'}
                    inline={true}
                    value={ year.hourly.entitlement.value }
                    onChange={ this.changeHourlyEntitlementHours.bind(this) }
                    disabled={year.hourly.entitlement.type !== 'fixed'}
                    style={{ width: 40 }}
                  />
                  {'Hours'}
                </Radio>
              </div>
              <div style={styles.formSection}>
                <H5>Excess hours</H5>
                <Radio label={'Carry forward all excess holiday entitlement to the next holiday year'} value={'carryAll'} selectedValue={ year.hourly.excess.type } onClick={ this.changeHourlyExcessType.bind(this) } style={ styles.radioPadding } />
                <Radio value={'carrySome'} selectedValue={ year.hourly.excess.type } onClick={ this.changeHourlyExcessType.bind(this) } style={ styles.radioPaddingWithTextBox }>
                  {'Carry forward no more than'}
                  <TextBox
                    type={'number'}
                    inline={true}
                    value={ year.hourly.excess.value }
                    onChange={ this.changeHourlyExcessHours.bind(this) }
                    disabled={year.hourly.excess.type !== 'carrySome'}
                    style={{ width: 40 }}
                  />
                  {'hours to the next holiday year'}
                </Radio>
                <Radio label={'Never carry forward excess holiday entitlement'} value={'neverCarry'} selectedValue={ year.hourly.excess.type } onClick={ this.changeHourlyExcessType.bind(this) } style={ styles.radioPadding } />
              </div>
              <div style={styles.formSection}>
                <H5>Rate of pay</H5>
                <Radio label={'Pay carers their usual rate for midday on a weekday'} value={'usual'} selectedValue={ year.hourly.rate } onClick={ this.changeHourlyRateOfPay.bind(this) } style={ styles.radioPadding } />
                <div style={[styles.subform, { display: (year.hourly.rate === 'usual') ? 'block': 'none' }]}>
                  <Checkbox label={'Pay carers for holiday even when they have exceeded their entitlement'} selectedValues={[]} name={'workingPartTime'} />
                  <HelpBlock text={ 'CarePlanner will still warn you before doing this' }/>
                </div>
                <Radio label={'Set rate of pay per job title'} value={'perJobTitle'} selectedValue={ year.hourly.rate } onClick={ this.changeHourlyRateOfPay.bind(this) } style={ styles.radioPadding } />
                <div style={[styles.subform, { display: (year.hourly.rate === 'perJobTitle') ? 'block': 'none' }]}>
                  <Checkbox label={'Pay carers for holiday even when they have exceeded their entitlement'} selectedValues={[]} name={'workingPartTime'} />
                  <HelpBlock text={ 'CarePlanner will still warn you before doing this' }/>
                </div>
                <Radio label={'Do not pay staff for holiday'} value={'no'} selectedValue={ year.hourly.rate } onClick={ this.changeHourlyRateOfPay.bind(this) } style={ styles.radioPadding } />
              </div>
            </div>
          </div>
          <div>
            <Checkbox label={'I have staff working full-time with a set number of days of holiday'} selectedValues={year.daily.enabled} onClick={ this.changeEnableDailySettings.bind(this) } style={ styles.radioPadding } />
            <div style={[styles.subform, { display: (year.daily.enabled) ? 'block': 'none' }, { marginBottom: 20 }]}>
              <div style={styles.formSection}>
                <H5>Holiday entitlement</H5>
                <div style={ styles.radioPadding }>
                  <Span style={{ marginLeft: -10 }}>
                    <TextBox
                      type={ 'number' }
                      inline={ true }
                      value={ year.daily.entitlement }
                      onChange={ this.changeDailyEntitlement.bind(this) }
                      style={{ width: 40 }}
                    />
                    {'days per year'}
                  </Span>
                </div>
              </div>
              <div style={styles.formSection}>
                <H5>Excess hours</H5>
                <Radio label={'Carry forward all excess holiday entitlement to the next holiday year'} value={'carryAll'} selectedValue={ year.daily.excess.type } onClick={ this.changeDailyExcessType.bind(this) } style={ styles.radioPadding } />
                <Radio value={'carrySome'} selectedValue={ year.daily.excess.type } onClick={ this.changeDailyExcessType.bind(this) } style={ styles.radioPaddingWithTextBox }>
                  {'Carry forward no more than'}
                  <TextBox
                    type={'number'}
                    inline={true}
                    value={ year.daily.excess.value }
                    onChange={ this.changeDailyExcessDays.bind(this) }
                    disabled={year.daily.excess.type !== 'carrySome'}
                    style={{ width: 40 }}
                  />
                  {'days to the next holiday year'}
                </Radio>
                <Radio label={'Never carry forward excess holiday entitlement'} value={'neverCarry'} selectedValue={ year.daily.excess.type } onClick={ this.changeDailyExcessType.bind(this) } style={ styles.radioPadding } />
              </div>
              <div style={styles.formSection}>
                <H5>Rate of pay</H5>
                <div style={ styles.radioPadding }>
                  <Span>{`CarePlanner does not support paying holiday for full-time carers.`}</Span>
                </div>
              </div>
            </div>
          </div>
          <Button label={'Save'} theme={'neutral'} onClick={onClose}/>
        </div>
      </Overlay>
    )
  }
}
