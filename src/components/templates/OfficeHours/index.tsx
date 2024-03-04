import { useWidgetConfig } from '@/hooks/useWidgetConfig';
import { observer } from 'mobx-react-lite';
import Availability from '../Availability';

const OfficeHours = () => {
  const { publish } = useWidgetConfig();
  const handlePublish = () => {
    publish();
  };

  return (
    <div className='w-full auto pt-1'>
      <div className='flex flex-col'>
        <span className='font-medium text-md text-lightBlack mb-2'>
          Set your office hours
        </span>
        <span className='font-medium text-md text-gray-400'>{`Let people know when your team will be back online. They’ll see hours converted to their own time zone.`}</span>
      </div>
      <Availability handlePublish={handlePublish} />
    </div>
  );
};

export default observer(OfficeHours);
