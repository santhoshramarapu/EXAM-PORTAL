import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import '../../src/styles/EmailForm.css'; // Import CSS file

const EmailForm = ({ result, recipientEmail }) => {
  const [sending, setSending] = useState(false);

  const sendEmail = () => {
    if (!result) {
      console.error('Result object is undefined or null.');
      return;
    }

    setSending(true);

    const templateParams = {
      to_name: result.stdname || '',
      to_email: recipientEmail || '',
      hallticketNo: result.hallticketNo || '',
      stdname: result.stdname || '',
      english: result.english || '',
      java: result.java || '',
      python: result.python || '',
      cpp: result.cpp || '',
      totalMarks: result.totalMarks || '',
      result: result.result || ''
    };

    emailjs.send('service_jzibafr', 'template_8k5h8mn', templateParams, 'Fxp-Xqms8QI-IchTY')
      .then(response => {
        console.log('SUCCESS!', response.status, response.text);
        alert(`Email sent successfully to ${recipientEmail}!`);
      })
      .catch(error => {
        console.error('FAILED...', error);
        alert('Failed to send email. Please try again.');
      })
      .finally(() => {
        setSending(false);
      });
  };

  return (
    <div>
      <button   style={{ marginTop: '12px', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}onClick={sendEmail} disabled={sending}>Send Email</button>
      {sending && (
        <div className="popup">
          Sending email...
        </div>
      )}
    </div>
  );
};

export default EmailForm;
