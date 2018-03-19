import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getIn } from 'immutable';
import { flow } from 'lodash';

import CalendarHeader from './components/CalendarHeader';
import CalendarMonth from './components/CalendarMonth';
import CalendarDay from './components/CalendarDay';

import * as actions from './data/actions';

class Calendar extends Component {
  render() {
    return (
      <div>
        <CalendarHeader/>
        <CalendarMonth/>
      </div>
    );
  }
}

export default Calendar;
