import React from 'react';
import { Alert } from 'react-bootstrap';
export const Message = (variant, children) => {
  return <Alert variant={variant}>{children}</Alert>;
};
Message.defaultProps = {
  varian:'info'
}
export default Message
