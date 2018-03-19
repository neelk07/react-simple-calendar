import React, { Component } from 'react';
import moment from 'moment';

import './styles.css';

class CalendarDay extends Component {
  render() {

    const date = moment(this.props.date);
    let dateClass = '';

    if (date.isSame(moment(), 'day')) {
      dateClass = 'today';
    } else if (date.isBefore(moment(), 'day')) {
      dateClass = 'past';
    } else {
      dateClass = 'active';
    }

    return (
      <div className={`CalendarDay ${dateClass}`}>
        <p className="CalendarDay-date">
          {moment(this.props.date).format('Do')}
        </p>
        {!this.props.appointment ?
          (dateClass !== 'past' && <div>
            <a className="CalendarDay-add-appointment"
              onClick={() => this.props.showAppointmentModal(this.props.date)}>
              +
            </a>
          </div>) :
          (<a onClick={() => this.props.showAppointmentModal(this.props.date)}>
            <p className="CalendarDay-appointment-description">
              {this.props.appointment.get('description')}
            </p>
          </a>)
        }
      </div>
    );
  }
}

export default CalendarDay;
