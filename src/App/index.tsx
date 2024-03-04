import Spinner from '@/components/atoms/Spinner';
import AppRoutes from '@/routes/index';
import { AuthStore } from '@/state/AuthenticationStore';
import '@/styles/tailwind.css';
import { observer } from 'mobx-react-lite';
import { Toaster } from 'react-hot-toast';
import { useApp } from './hooks';

function App() {
  useApp();

  return (
    <>
      {AuthStore.switching_workspace ? (
        <div className='h-screen w-screen flex justify-center items-center'>
          <Spinner size={40} color='#033EB5' />
        </div>
      ) : (
        <div className='relative'>
          <AppRoutes />
        </div>
      )}
      <Toaster
        toastOptions={{
          duration: 5000,
        }}
        position='top-right'
        containerClassName='z-[10000000!important]'
      />
    </>
  );
}

export default observer(App);
