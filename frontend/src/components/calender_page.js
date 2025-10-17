import React from "react";
import { Container, Card } from "react-bootstrap";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import "./calenderpage.css";

const HOLIDAYS = [
  { date: "2025-01-01", name: "New Year's Day" },
  { date: "2025-01-26", name: "Republic Day" },
  { date: "2025-03-14", name: "Holi" },
  { date: "2025-08-15", name: "Independence Day" },
  { date: "2025-10-02", name: "Gandhi Jayanti" },
  { date: "2025-12-25", name: "Christmas" },
];

const CalendarPage = () => {
  return (
    <Container className="calendar-page">
      <h3 className="page-title">Calendar</h3>
      <div className="calendar-content">
        <Card className="calendar-card">
          <Calendar className="styled-calendar" />
        </Card>
        <Card className="holidays-card">
          <h4 className="holidays-title">Upcoming Holidays</h4>
          <ul className="holidays-list">
            {HOLIDAYS.map((h) => (
              <li key={h.date} className="holiday-item">
                <span className="holiday-name">{h.name}</span>
                <span className="holiday-date">{new Date(h.date).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Container>
  );
};

export default CalendarPage;
