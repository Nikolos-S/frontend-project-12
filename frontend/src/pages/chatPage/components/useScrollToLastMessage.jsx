import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '../../../context';
import { channelsSelector } from '../../../slices/channelsSlice';
import { messagesSelector, dataChatSelector } from '../../../slices/messagesSlice';

const useScrollToLastMessage = () => {
  const messagesEndRef = useRef(null);
  const { loggedId } = useAuth();
  const { currentChannelId } = useSelector(channelsSelector);
  const { messages } = useSelector(messagesSelector);
  const { curentMessages, curentChannel } = useSelector(dataChatSelector);

  const [scrolledChannel, setScrolledChannel] = useState({});
  const [isAutoScroll, setIsAutoScroll] = useState(false);
  useEffect(() => {
    const element = messagesEndRef.current;
    const isScroll = Math.abs(element.scrollHeight - element.offsetHeight - element.scrollTop) < 50;
    const username = curentMessages.length !== 0
      ? curentMessages[curentMessages.length - 1].username : null;
    if (loggedId.username === username || isScroll || scrolledChannel.id !== curentChannel.id) {
      element.scrollTo(0, element.scrollHeight);
      setScrolledChannel(curentChannel);
      setIsAutoScroll(false);
    } else if (currentChannelId === messages[messages.length - 1]?.channelId) {
      setIsAutoScroll(true);
    }
  }, [curentMessages, curentChannel]);
  return {
    isAutoScroll,
    messagesEndRef,
    setIsAutoScroll,
    curentMessages,
    curentChannel,
  };
};

export default useScrollToLastMessage;
