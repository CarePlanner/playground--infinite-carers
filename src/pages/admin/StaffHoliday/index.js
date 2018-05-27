import React from 'react';
import Radium from 'radium';
import styles from './styles';
import data from './data';
import Page from '../../../components/Page';
import Navbar from '../../../components/Navbar';
import { H1, Span, A, H5 } from '../../../components/Text';
import { Button, Checkbox, Radio } from '../../../components/Form';
import Table from '../../../components/Table';
import StaffHolidayOverlay from './overlay';

class StaffHoliday extends React.Component {

  constructor(args) {
    super(args);
    this.state = {
      data,
      showOverlay: false,
      tableHeadings: [
        {
          key: 'year',
          value: 'Year'
        },
        {
          key: 'month',
          value: 'Month beginning'
        },
        {
          key: 'holidayCalculated',
          value: 'Holiday calculated'
        },
        {
          key: 'entitlement',
          value: 'Entitlement'
        },
        {
          key: 'rate',
          value: 'Pay rate'
        },
        {
          key: 'actions',
          value: ''
        }
      ],
      options: {
        months: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December'
        ],
        hourly: {
          entitlement: [
            'fixed',
            'acasAccrual',
            'irishAccrual'
          ],
          excess: [
            'carryAll',
            'carrySome',
            'neverCarry'
          ],
          rate: [
            'usual',
            'perJobTitle',
            'no'
          ]
        },
        daily: {
          excess: [
            'carryAll',
            'carrySome',
            'neverCarry'
          ]
        }
      },
      statements: {
        year: (year) => `${year}`,
        month: (month) => this.state.options.months[month],
        holidayCalculated: (hourly, daily) => {
          if(hourly && daily) {
            return 'Some staff hourly and some daily';
          } else if(hourly) {
            return 'Hourly';
          } else if(daily) {
            return 'Daily'
          } else {
            return '-'
          }
        },
        hourly: {
          entitlement: {
            fixed: (hours) => (`Fixed at ${hours} hours`),
            acasAccrual: 'Calculate on accrual (ACAS 12.07%)',
            irishAccrual: 'Calculate on accrual (Irish standard 8%)',
          },
          excess: {
            carryAll: 'All excess hours can be carried over from the previous year',
            carrySome: (hours) => `A maximum of ${hours} hours can be carried over`,
            neverCarry: 'No hours can be carried over'
          },
          rate: {
            usual: 'Automatic (based on a weekday pay rate)',
            perJobTitle: 'Varies based on job title',
            no: 'Not paying part-time staff through CarePlanner'
          }
        },
        daily: {
          entitlement: (days) => (`Fixed at ${days} days`),
          excess: {
            carryAll: 'All excess days can be carried over from the previous year',
            carrySome: (days) => `A maximum of ${days} days can be carried over`,
            neverCarry: 'No days can be carried over'
          },
          rate: 'Not paying full-time staff through CarePlanner'
        }
      }
    };
  }

  openOverlay(index) {
    this.setState({
      showOverlay: true,
      selectedIndex: index
    });
  }

  closeOverlay() {
    this.setState({
      showOverlay: false
    })
  }

  setMonth(key, month) {
    this.setState((prevState) => {
      prevState.data[key].month = month;
      return prevState;
    });
  }

  enableHourlySettings(key, enable) {
    this.setState((prevState) => {
      prevState.data[key].hourly.enabled = enable;
      return prevState;
    });
  }

  enableDailySettings(key, enable) {
    this.setState((prevState) => {
      prevState.data[key].daily.enabled = enable;
      return prevState;
    });
  }

  setHourlyEntitlementType(key, type) {
    this.setState((prevState) => {
      prevState.data[key].hourly.entitlement.type = type;
      return prevState;
    });
  }

  setHourlyEntitlementHours(key, hours) {
    this.setState((prevState) => {
      prevState.data[key].hourly.entitlement.value = hours;
      return prevState;
    });
  }

  setHourlyExcessType(key, type) {
    this.setState((prevState) => {
      prevState.data[key].hourly.excess.type = type;
      return prevState;
    });
  }

  setHourlyExcessHours(key, hours) {
    this.setState((prevState) => {
      prevState.data[key].hourly.excess.value = hours;
      return prevState;
    });
  }

  setHourlyRateOfPay(key, rate) {
    this.setState((prevState) => {
      prevState.data[key].hourly.rate = rate;
      return prevState;
    });
  }

  setDailyEntitlement(key, days) {
    this.setState((prevState) => {
      prevState.data[key].daily.entitlement = days;
      return prevState;
    });
  }

  setDailyExcessType(key, type) {
    this.setState((prevState) => {
      prevState.data[key].daily.excess.type = type;
      return prevState;
    });
  }

  setDailyExcessDays(key, days) {
    this.setState((prevState) => {
      prevState.data[key].daily.excess.value = days;
      return prevState;
    });
  }

  toggleStaffHoliday() {
    this.setState((prevState) => ({
      enableStaffHoliday: !prevState.enableStaffHoliday
    }))
  }

  generateTableHeaders() {
    const { tableHeadings } = this.state;

    return tableHeadings.map((tableHeading) => tableHeading.value);
  }

  generateTableRows() {
    const { tableHeadings, statements, data } = this.state;

    return data.map((year, i) => (
      tableHeadings.map((tableHeading) => {
        const {key} = tableHeading;
        switch (key) {
          case 'year':
            return statements[key](year.year);
          case 'month':
            return statements[key](year.month);
          case 'holidayCalculated':
            return statements[key](year.hourly.enabled, year.daily.enabled);
          case 'entitlement':
            if(year.hourly.enabled && year.daily.enabled) {
              let hourlyStatement, dailyStatement;
              if(year.hourly.entitlement.type === 'fixed') {
                hourlyStatement = statements.hourly.entitlement.fixed(year.hourly.entitlement.value);
              } else {
                hourlyStatement = statements.hourly.entitlement[year.hourly.entitlement.type];
              }
              dailyStatement = statements.daily.entitlement(year.daily.entitlement);
              return `${hourlyStatement} and ${dailyStatement}`;
            } else if(year.hourly.enabled) {
              if(year.hourly.entitlement.type === 'fixed') {
                return statements.hourly.entitlement.fixed(year.hourly.entitlement.value);
              } else {
                return statements.hourly.entitlement[year.hourly.entitlement.type];
              }
            } else {
              return statements.daily.entitlement(year.daily.entitlement);
            }
          case 'rate':
            if(year.hourly.enabled && year.daily.enabled) {
              return 'both'
            } else if(year.hourly.enabled) {
              return statements.hourly.rate[year.hourly.rate]
            } else {
              return statements.daily.rate[year.daily.rate]
            }
          case 'actions':
            return (
              <span>
                <A onClick={this.openOverlay.bind(this, i)}>Edit</A>|<A>Delete</A>
              </span>
            )
          default:
            return ''
        }
      })
    ))
  }

  render() {

    const { showOverlay, enableStaffHoliday, tableHeaders, data, selectedIndex } = this.state;

    const headers = this.generateTableHeaders();
    const rows = this.generateTableRows();

    const navbar = (
      <Navbar active={'admin'} />
    );

    const staffHolidayOverlay = (
      <StaffHolidayOverlay
        index={ selectedIndex }
        onClose={ this.closeOverlay.bind(this) }
        year={ data[selectedIndex] }
        months={ this.state.options.months }
        onChangeMonth={ this.setMonth.bind(this) }
        onChangeEnableHourlySettings={ this.enableHourlySettings.bind(this) }
        onChangeEnableDailySettings={ this.enableDailySettings.bind(this) }
        onChangeHourlyEntitlementType={ this.setHourlyEntitlementType.bind(this) }
        onChangeHourlyEntitlementHours={ this.setHourlyEntitlementHours.bind(this) }
        onChangeHourlyExcessType={ this.setHourlyExcessType.bind(this) }
        onChangeHourlyExcessHours={ this.setHourlyExcessHours.bind(this) }
        onChangeHourlyRateOfPay={ this.setHourlyRateOfPay.bind(this) }
        onChangeDailyEntitlement={ this.setDailyEntitlement.bind(this) }
        onChangeDailyExcessType={ this.setDailyExcessType.bind(this) }
        onChangeDailyExcessDays={ this.setDailyExcessDays.bind(this) }
      />
    );

    return (
      <div>
        <Page navbar={navbar}>
          <H1>Staff Holiday</H1>
          <Checkbox label={'Use CarePlanner to track staff holiday allowance.'} selectedValues={enableStaffHoliday} onClick={this.toggleStaffHoliday.bind(this)} />
          <div style={{ display: (enableStaffHoliday) ? 'block' : 'none' }}>
            <Button label={'Add next year'} theme={'positive'}/>
            <Table headers={headers} rows={rows}></Table>
          </div>
        </Page>
        {(showOverlay) ? staffHolidayOverlay : null}
      </div>
    );
  }
}

export default Radium(StaffHoliday);
