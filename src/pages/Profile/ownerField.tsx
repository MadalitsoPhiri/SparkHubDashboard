import { AuthStore } from '@/state/AuthenticationStore';
import { teamMateStore } from '@/state/TeammateStore';
import { User } from '@/types/user.types';
import { observer } from 'mobx-react-lite';
import { useCallback, useState } from 'react';
import Text from '@/components/atoms/Text';

type OwnerAssignDropdownProps = {
  contact: User | null;
  handleOnSelect: (userId: string) => void;
};

export const OwnerAssignDropdown = observer(
  ({ contact, handleOnSelect }: OwnerAssignDropdownProps) => {
    const [showAssigneeDropdown, setShowAssigneeDropdown] = useState(false);
    const [search, setSearch] = useState('');

    const workspace_creator =
      AuthStore.user_workspace_info?.active_workspace?.workspace?.created_by
        ?._id;

    const user = AuthStore.currentUser;

    const teammates = teamMateStore.teamMates.filter(teamMate =>
      teamMate?.user?.user_name?.toLowerCase().includes(search.toLowerCase()),
    );

    const handleOpenAssigneeDropdown = useCallback(() => {
      setShowAssigneeDropdown(true);
    }, []);

    return (
      <div
        className='relative flex-1 text-left w-full cursor-pointer'
        onClick={handleOpenAssigneeDropdown}
        onMouseLeave={() => {
          setShowAssigneeDropdown(false);
        }}
      >
        <p className='hover:text-gray-400 transition-colors'>
          {contact?.owner ? (
            <span className='h-full'>{contact?.owner.user_name}</span>
          ) : (
            <Text size='sm' color='text-gray-500'>
              No owner
            </Text>
          )}
        </p>
        {showAssigneeDropdown && (
          <ul className='absolute top-0 left-1/2 -translate-x-1/2 rounded-md bg-white shadow-md border z-[10000!important] w-[200px]'>
            {workspace_creator !== user?._id ? (
              <li
                className='p-2.5 hover:bg-gray-100 w-full text-left cursor-pointer flex items-center justify-between'
                onClick={e => {
                  e.stopPropagation();
                  handleOnSelect(user?._id as string);
                  setShowAssigneeDropdown(false);
                }}
              >
                <span className='h-full'>Assign self</span>
              </li>
            ) : (
              <>
                <input
                  placeholder='Search for assignee'
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className='border-b p-2 w-full outline-none'
                />
                {teammates.length ? (
                  teammates?.map(owner => (
                    <li
                      key={owner._id}
                      className='p-2.5 hover:bg-gray-100 w-full text-left cursor-pointer flex items-center justify-between'
                      onClick={e => {
                        e.stopPropagation();
                        handleOnSelect(owner.user._id as string);
                        setShowAssigneeDropdown(false);
                      }}
                    >
                      <span className='h-full'>
                        {owner.user._id === workspace_creator
                          ? 'Assign self'
                          : owner.user.user_name}
                      </span>
                    </li>
                  ))
                ) : (
                  <span className='p-2.5 text-gray-400 w-full block'>
                    No teammate found
                  </span>
                )}
              </>
            )}
          </ul>
        )}
      </div>
    );
  },
);
