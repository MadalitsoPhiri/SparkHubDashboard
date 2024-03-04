import { ActivityLog, activityLogStore } from '@/state/ActivityLogStore';
import { AuthStore } from '@/state/AuthenticationStore';

type ActivityLogResponse = {
  data: ActivityLog[];
};

export const useActivityLog = () => {
  const getActivityLogs = (contactId: string | undefined) => {
    activityLogStore.setFetchingLogs(true);
    AuthStore?.socket?.emit(
      'get_activity_logs',
      {
        data: {
          contactId,
        },
        events: 'get_activity_logs',
      },
      (response: ActivityLogResponse) => {
        activityLogStore.setActivityLogs(response.data);
        activityLogStore.setFetchingLogs(false);
      },
    );
  };

  const getAllActivityLogs = () => {
    activityLogStore.setFetchingLogs(true);
    AuthStore?.socket?.emit(
      'get_activity_logs',
      {
        events: 'get_activity_logs',
      },
      (response: ActivityLogResponse) => {
        activityLogStore.setActivityLogs(response.data);
        activityLogStore.setFetchingLogs(false);
      },
    );
  };

  return {
    getActivityLogs,
    getAllActivityLogs,
  };
};
