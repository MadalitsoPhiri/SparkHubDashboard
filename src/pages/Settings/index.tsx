import { MainContainer } from '@/components/templates/MainContainer';
import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';

const Settings = () => {
  return (
    <MainContainer>
      <Outlet />
    </MainContainer>
  );
};

export default observer(Settings);
