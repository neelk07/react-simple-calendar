import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getIn } from 'immutable';
import { flow } from 'lodash';
import moment from 'moment';

import * as actions from '../../data/actions';
import './styles.css';

class CalendarHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  previousMonth = () => {
    const {month, updateMonth} = this.props;
    updateMonth(moment(month).add(-1, 'month').format('MMMM YYYY'));
  }

  nextMonth = () => {
    const {month, updateMonth} = this.props;
    updateMonth(moment(month).add(1, 'month').format('MMMM YYYY'));
  }

  render() {
    return (
      <div className="CalendarHeader">
        <div className="CalendarHeader-header">
          <button className="button" onClick={() => this.previousMonth()}>
            <i className="fa fa-chevron-left fa-lg"></i>
          </button>
          <h3>{this.props.month}</h3>
          <button className="button" onClick={() => this.nextMonth()}>
            <i className="fa fa-chevron-right fa-lg"></i>
          </button>
        </div>
        <div className="CalendarHeader-weekdays">
          <p className="CalendarHeader-weekday">Sunday</p>
          <p className="CalendarHeader-weekday">Monday</p>
          <p className="CalendarHeader-weekday">Tuesday</p>
          <p className="CalendarHeader-weekday">Wednesday</p>
          <p className="CalendarHeader-weekday">Thursday</p>
          <p className="CalendarHeader-weekday">Friday</p>
          <p className="CalendarHeader-weekday">Saturday</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    month: state.getIn(['calendar', 'month'])
	}
}

export default flow(
	connect(mapStateToProps, actions)
)(CalendarHeader);
