// import React from "react";
// import Calendar from "react-calendar";
// import 'react-calendar/dist/Calendar.css';
// import "./CalendarPage.css";

// const HOLIDAYS = [
//   { date: "2025-10-19", name: "Danteraas" },
//   { date: "2025-10-20", name: "Diwali" },
//   { date: "2025-11-5", name: "Guru nanak jayanthi" },
//   { date: "2025-11-14", name: "children days" },
//   { date: "2025-12-24", name: "Christmas Eve" },
//   { date: "2025-12-25", name: "Christmas" },
//   { date: "2026-01-01", name: "New year" },
//   { date: "2026-01-14", name: "Sankranthi" },
//   { date: "2025-01-26", name: "Republic day" },
//   { date: "2025-02-15", name: "Maha Shivaratri" }
// ];

// const CalendarPage = () => {
//   return (
//     <div className="calendar-page">
//       <h1 className="page-title">My Calendar Dashboard</h1>

//       <div className="calendar-layout">
//         {/* Left Half - Calendar */}
//         <div className="calendar-half">
//           <Calendar className="styled-calendar" />
//         </div>

//         {/* Right Half - Holidays */}
//         <div className="holidays-half">
//           <h2>Upcoming Holidays</h2>
//           <ul>
//             {HOLIDAYS.map((holiday, index) => (
//               <li key={index} className="holiday-item">
//                 <span className="holiday-name">{holiday.name}</span>
//                 <span className="holiday-date">{holiday.date}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CalendarPage;
import React from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from "react-router-dom";
import "./CalendarPage.css";

const HOLIDAYS = [
  { date: "2025-01-01", name: "New Year's Day" },
  { date: "2025-01-26", name: "Republic Day" },
  { date: "2025-08-15", name: "Independence Day" },
  { date: "2025-10-02", name: "Gandhi Jayanti" },
  { date: "2025-12-25", name: "Christmas" },
  { date: "2025-11-01", name: "All Saints' Day" },
  { date: "2025-02-14", name: "Valentine's Day" }
];

const CalendarPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="calendar-page">
      <div className="calendar-header">
        <button className="back-btn" onClick={handleBack}>← Back</button>
        <h1 className="page-title">My Calendar Dashboard</h1>
      </div>

      <div className="calendar-layout">
        {/* Left Half - Calendar */}
        <div className="calendar-half">
          <Calendar className="styled-calendar" />
        </div>

        {/* Right Half - Holidays */}
        <div className="holidays-half">
          <h2>Upcoming Holidays</h2>
          <ul>
            {HOLIDAYS.map((holiday, index) => (
              <li key={index} className="holiday-item">
                <span className="holiday-name">{holiday.name}</span>
                <span className="holiday-date">{holiday.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
