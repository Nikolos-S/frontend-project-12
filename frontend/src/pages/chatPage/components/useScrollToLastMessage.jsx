import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '../../../context';
import { channelsSelector } from '../../../slices/channelsSlice';
import { messagesSelector } from '../../../slices/messagesSlice';

const useScrollToLastMessage = (messagesEndRef, setIsAutoScroll, curentMessages, curentChannel) => {
  const { loggedId } = useAuth();
  const { currentChannelId } = useSelector(channelsSelector);
  const { messages } = useSelector(messagesSelector);

  const [scrolledChannel, setScrolledChannel] = useState({});

  useEffect(() => {
    const element = messagesEndRef.current;
    const username = curentMessages.length !== 0
      ? curentMessages[curentMessages.length - 1].username : null;
    if (loggedId.username === username
        || Math.abs(element.scrollHeight - element.offsetHeight - element.scrollTop) < 50
        || scrolledChannel.id !== curentChannel.id) {
      element.scrollTo(0, element.scrollHeight);
      setScrolledChannel(curentChannel);
      setIsAutoScroll(false);
    } else if (currentChannelId === messages[messages.length - 1]?.channelId) {
      setIsAutoScroll(true);
    }
  }, [curentMessages, curentChannel]);
};

export default useScrollToLastMessage;
