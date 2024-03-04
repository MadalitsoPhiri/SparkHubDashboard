import Header from '@/components/molecules/Header';
import Sidebar from '@/components/organisms/Sidebar';
import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className='flex flex-col max-w-full'>
      <Header />
      <div className='flex flex-row h-full flex-1 overflows-hidden '>
        <Sidebar />
        <div
          className={`w-full duration-500 ease-in-out  overflow-y-auto h-screen no-scrollbar `}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default observer(Layout);
