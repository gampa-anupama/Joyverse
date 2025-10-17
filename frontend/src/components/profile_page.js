// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Navbar from './Logout_bar';
// import './profile_page.css';
// import UpdatePassword from './UpdatePassword';

// const ProfilePage = () => {
//   const navigate = useNavigate();
//   const [showPasswordForm, setShowPasswordForm] = useState(false);

//   // Fetch username and therapist details from localStorage
//   const username = localStorage.getItem('username');
//   const userNameOnly = username ? username.split('@')[0] : 'User';
//   const userNameWithoutNumbers = userNameOnly.replace(/[0-9]/g, '');

//   const therapistDetailsRaw = localStorage.getItem('therapist');
//   const [therapist, setTherapist] = useState({});

//   useEffect(() => {
//     if (therapistDetailsRaw) {
//       try {
//         setTherapist(JSON.parse(therapistDetailsRaw));
//       } catch (err) {
//         console.error('Error parsing therapist details:', err);
//       }
//     }
//   }, [therapistDetailsRaw]);

//   const handleLogout = () => {
//     localStorage.removeItem('username');
//     navigate('/');
//   };

//   const handleCalendarClick = () => {
//     navigate('/calendar');
//   };

//   const togglePasswordForm = () => {
//     setShowPasswordForm(!showPasswordForm);
//   };

//   return (
//     <div className="profile-page">
//       <Navbar username={userNameWithoutNumbers} handleLogout={handleLogout} role="admin" />

//       <div className="profile-background">
//         <div className="profile-container">
//           <h1 className="profile-title">Profile Management</h1>

//           {/* Profile Card */}
//           <div className="profile-card">
//             <div className="profile-info-section">
//               <h2>Profile Information</h2>
//               <div className="profile-info">
//                 <div className="info-item">
//                   <span className="info-label">Username:</span>
//                   <span className="info-value">{username || 'N/A'}</span>
//                 </div>
//                 {therapist.name && (
//                   <div className="info-item">
//                     <span className="info-label">Therapist Name:</span>
//                     <span className="info-value">{therapist.name}</span>
//                   </div>
//                 )}
//                 {therapist.email && (
//                   <div className="info-item">
//                     <span className="info-label">Therapist Email:</span>
//                     <span className="info-value">{therapist.email}</span>
//                   </div>
//                 )}
//                 {therapist.phone && (
//                   <div className="info-item">
//                     <span className="info-label">Therapist Phone:</span>
//                     <span className="info-value">{therapist.phone}</span>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Security / Password */}
//             <div className="profile-security-section">
//               <div className="password-header">
//                 <h2>Security Settings</h2>
//                 <button className="toggle-password-btn" onClick={togglePasswordForm}>
//                   {showPasswordForm ? 'Hide' : 'Change Password'}
//                 </button>
//               </div>
//               {showPasswordForm && (
//                 <div className="password-form-container">
//                   <UpdatePassword />
//                 </div>
//               )}
//             </div>

//             {/* Action Buttons */}
//             <div className="profile-actions">
//               <button className="calendar-btn" onClick={handleCalendarClick}>
//                 📅 Calendar
//               </button>
//               <button className="logout-btn" onClick={handleLogout}>
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Logout_bar';
import './profile_page.css';

const ProfilePage = () => {
  const navigate = useNavigate();

  // Fetch username/email from localStorage
  const email = localStorage.getItem('username') || 'user@example.com';

  // Extract name from email (remove special chars and domain)
  const nameFromEmail = email.split('@')[0].replace(/[^a-zA-Z]/g, '');
  
  const therapistDetailsRaw = localStorage.getItem('therapist');
  const [therapist, setTherapist] = useState({});

  useEffect(() => {
    if (therapistDetailsRaw) {
      try {
        setTherapist(JSON.parse(therapistDetailsRaw));
      } catch (err) {
        console.error('Error parsing therapist details:', err);
      }
    }
  }, [therapistDetailsRaw]);

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/');
  };

  const handleCalendarClick = () => {
    navigate('/calendar');
  };

  const handleChangePassword = () => {
    navigate('/analysis/update-password'); // redirect to dedicated change password page
  };

  return (
    <div className="profile-page">
      <Navbar username={nameFromEmail} handleLogout={handleLogout} role="therapist" />

      <div className="profile-background">
        <div className="profile-container">
          {/* Avatar Section */}
          

          {/* Profile Card */}
          <div className="profile-card">
            <h1 className="profile-title">Profile Management</h1>

            {/* Profile Info */}
            <div className="profile-info-section">
              <h2>Profile Information</h2>
              <div className="profile-info">
                <div className="info-item">
                  <span className="info-label">Name:</span>
                  <span className="info-value">{nameFromEmail}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Email:</span>
                  <span className="info-value">{email}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Role:</span>
                  <span className="info-value">Therapist</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="profile-actions">
              <button className="calendar-btn" onClick={handleCalendarClick}>
                📅 Calendar
              </button>
              <button className="password-btn" onClick={handleChangePassword}>
                🔒 Change Password
              </button>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
