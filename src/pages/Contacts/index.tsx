import Table from '@/components/molecules/Table';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

export type ContactType = 'all' | 'my' | 'recently-viewed' | 'list';

type ContactsProps = {
  type: ContactType;
};

const Contacts: FC<ContactsProps> = ({ type }) => {
  const [searchParams] = useSearchParams();
  const list = searchParams.get('list');

  const renderContactType = () => {
    switch (type) {
      case 'all':
        return 'All Contacts';
      case 'my':
        return 'My Contacts';
      case 'recently-viewed':
        return 'Recently Viewed';
      case 'list':
        return list as string;
      default:
        return 'All Contacts';
    }
  };

  return (
    <div>
      <Table title={renderContactType()} contactType={type} />
    </div>
  );
};
export default observer(Contacts);
