import MainChatUi from '@/components/templates/MainChatUi';

const Chat = () => {
  return (
    <MainChatUi conversationChannel='CHAT' title='Chat' showLeftPanel={false} />
  );
};
export default Chat;
