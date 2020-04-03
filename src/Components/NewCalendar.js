import React from 'react';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';

import moment from 'moment';

export default function NewCalendar() {
  const localizer = momentLocalizer(moment);

  const [events, setEvents] = React.useState([]);

  React.useEffect(() => {
    fetch(`https://customerrest.herokuapp.com/gettrainings`)
      .then(response => response.json())
      .then(data => {
        let tapahtuma = data;
        
        //Kososelta refrenssi kalenteri koodiin
        for (let i = 0; i < tapahtuma.length; i++) {
          tapahtuma[i].date = new Date(tapahtuma[i].date);
          tapahtuma[i].duration = new Date(moment(tapahtuma[i].date).add(tapahtuma[i].duration, "minutes").format())
          tapahtuma[i].customer = `${tapahtuma[i].customer.firstname}  ${tapahtuma[i].customer.lastname}`
          tapahtuma[i].activity = `${tapahtuma[i].customer} | ${tapahtuma[i].activity} | ${tapahtuma[i].date}`

          console.log(tapahtuma[i]);
        }
        setEvents(tapahtuma);
      });
  }, []);

  return (
    <div>
      <Calendar
        localizer={localizer}
        style={{ height: "700px" }}
        events={events}
        titleAccessor="activity"
        startAccessor="date"
        endAccessor="duration"
      />
    </div>
  );
}

