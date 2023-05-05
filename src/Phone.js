import React, { useState, useEffect, useRef } from 'react';

function Phone() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (isPopupOpen) {
      inputRefs.current[0].focus();
    }
  }, [isPopupOpen]);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value) || value.length > 1) return;
    setOtp([...otp.map((d, i) => i === index ? value : d)]);
    if (value !== '') {
      if (index === otp.length - 1) {
        inputRefs.current[index].blur();
      } else {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '') {
      if (index === 0) {
        return;
      } else {
        inputRefs.current[index - 1].focus();
      }
    } else if (e.key === 'ArrowLeft') {
      if (index === 0) {
        return;
      } else {
        inputRefs.current[index - 1].focus();
      }
    } else if (e.key === 'ArrowRight') {
      if (index === otp.length - 1) {
        return;
      } else {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text/plain');
    const otpArray = pasteData.split('').filter((char) => !isNaN(char)).slice(0, otp.length);
    setOtp([...otpArray, ...otpArray.slice(otpArray.length)]);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setOtp(['', '', '', '', '', '']);
  };

  return (
    <div className="phone-verification">
      <button className="phone-verification-btn" onClick={togglePopup}>
        Verify Phone
      </button>
      {isPopupOpen && (
        <div className="phone-verification-popup">
          <h2>Phone Verification</h2>
          <p>Please enter the 6-digit OTP sent to your mobile number</p>
          <div className="otp-input-container">
            {otp.map((data, index) => {
              return (
                <input
                  key={index}
                  type="text"
                  className="otp-input"
                  maxLength={1}
                  value={data}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                />
              );
            })}
          </div>
          <button className="verify-btn">Verify</button>
          <button className="close-btn" onClick={handleClosePopup}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default Phone;
