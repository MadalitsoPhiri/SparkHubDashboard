import { CONVERSATION_SORT } from '@/constants/index';
import { ConStore } from '@/state/ConversationStore';
import { useLocation } from 'react-router-dom';

export const useSidePanelHeader = () => {
  const location = useLocation();
  const handleSortChange = () => {
    if (ConStore.sorted_by === CONVERSATION_SORT.LATEST) {
      ConStore.set_sorted_by(CONVERSATION_SORT.OLDEST);
    } else {
      ConStore.set_sorted_by(CONVERSATION_SORT.LATEST);
    }
  };

  const active_routes = (route: string) => {
    const current_array = location.pathname.split('/');
    const route_array = route.split('/');

    return (
      current_array[current_array?.length - 1] ===
      route_array[route_array?.length - 1]
    );
  };
  const renderIcon = (title: string) => {
    switch (title.toLowerCase()) {
      case 'chat':
        return '💬';
      case 'email':
        return '✉️';
      case 'sms':
        return '📱';
      case 'whatsapp':
        return '✉️';
      case 'messenger':
        return '✉️';

      default:
        break;
    }
  };
  return { active_routes, renderIcon, handleSortChange };
};
