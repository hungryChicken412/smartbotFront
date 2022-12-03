import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import SmsFailedIcon from '@mui/icons-material/SmsFailed';

export const displayIcon = (type) => {
  switch (type) {
    case 'success':
      return <SmsFailedIcon />;
    case 'info':
      return <SmsFailedIcon />;
    case 'error':
      return <SmsFailedIcon />;
    case 'warning':
      return <SmsFailedIcon />;
    default:
      return <SmsFailedIcon />;
  }
};

const ToastMessage = ({ type, message }) =>
  toast[type](
    <div style={{ display: 'flex' }}>
      <div style={{ flexGrow: 1, fontSize: 15, padding: '8px 12px' }}>
        {message}
      </div>
    </div>
  );

ToastMessage.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

ToastMessage.dismiss = toast.dismiss;

export default ToastMessage;
