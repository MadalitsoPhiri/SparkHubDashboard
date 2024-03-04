import EmptyList from '@/components/atoms/EmptyList';
import Spinner from '@/components/atoms/Spinner';
import Text from '@/components/atoms/Text';
import { iconWrapperBgColorMap, taskTypes } from '@/constants/index';
import { useActivityLog } from '@/hooks/useActivityLog';
import { activityLogStore } from '@/state/ActivityLogStore';
import { formatActivityData } from '@/utils/index';
import { Icon } from '@iconify/react';
import { formatDistance } from 'date-fns';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderTaskType = (taskName: string) => {
  const taskType = taskTypes[taskName];

  if (taskType) {
    const textColorClass = `text-${taskType.color} text-[12px] font-normal font-medium leading-[16px]`;

    return (
      <div
        className={`w-20 h-8 px-2 py-1.5 ${
          iconWrapperBgColorMap[taskType.label]
        } rounded-[4px] justify-center items-center gap-2 inline-flex`}
      >
        <Icon icon={taskType.icon} className={textColorClass} />
        <Text size='xs' className={textColorClass}>
          {taskType.label}
        </Text>
      </div>
    );
  }
  return null;
};

const ActivityList = () => {
  const { id: contactId } = useParams<{ id: string }>();
  const { getActivityLogs } = useActivityLog();

  useEffect(() => {
    getActivityLogs(contactId);
  }, []);

  if (activityLogStore.fetchingLogs) {
    return (
      <div className='h-[50vh] flex flex-col mx-auto justify-center items-center'>
        <Spinner size={40} color='#033EB5' />
      </div>
    );
  }

  return (
    <div className='flex flex-col py-4'>
      {activityLogStore.activityLogs?.length > 0 ? (
        formatActivityData(activityLogStore.activityLogs).map(
          (items, index) => (
            <div key={index}>
              <Text size='lg' color='text-[#161518]'>
                {items.title}
              </Text>

              {items.data.map((item, itemIndex) => (
                <div className='flex flex-col gap-y-4 py-2' key={itemIndex}>
                  <div className='flex items-center space-x-4'>
                    {renderTaskType(item.type)}

                    <div className='w-full'>
                      <div className='flex justify-between w-full'>
                        <Text
                          size='sm'
                          className='text-[14px] font-normal font-medium leading-[20px] mb-[4px]'
                        >
                          {item.created_by.user_name}
                        </Text>
                        <Text
                          size='xs'
                          className='text-[#898989] text-[12px] font-normal font-medium leading-[16px]'
                        >
                          {formatDistance(new Date(item.createdAt), new Date())}
                        </Text>
                      </div>
                      <Text size='xs' color='text-[#656971]'>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: item.content,
                          }}
                        ></p>
                      </Text>
                    </div>
                  </div>
                </div>
              ))}
              <hr className='h-px border-0 bg-[#ECEDF0] my-4'></hr>
            </div>
          ),
        )
      ) : (
        <EmptyList title='No activity logs recorded' height='400px' />
      )}
    </div>
  );
};

export default observer(ActivityList);
