import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';

const Inbox = () => {
  return (
    <div className='h-full ml-2'>
      <Outlet />
    </div>
  );
};
export default observer(Inbox);
