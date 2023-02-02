import React from 'react';
import filter from 'leo-profanity';

const Message = ({ props }) => {
  const { body, username } = props;
  return (
    <div className="text-break mb-2">
      <b>{username}</b>
      {`: ${filter.clean(body)}`}
    </div>
  );
};

export default Message;
