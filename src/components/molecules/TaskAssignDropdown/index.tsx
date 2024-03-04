import { taskStore } from '@/state/TaskStore';
import { teamMateStore } from '@/state/TeammateStore';
import { Task } from '@/types/task.types';
import { TeamMate } from '@/types/teammate.types';
import { observer } from 'mobx-react-lite';
import { useCallback, useState } from 'react';
import { MdClose } from 'react-icons/md';
import ProfileTab from '../ProfileTab';

type TaskAssignDropdownProps = {
  task: Task;
  handleOnSelect: (userId: string | null) => void;
};

export const TaskAssignDropdown = observer(
  ({ task, handleOnSelect }: TaskAssignDropdownProps) => {
    const [showAssigneeDropdown, setShowAssigneeDropdown] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [assignedUsers, setAssignedUsers] = useState<TeamMate[]>(
      teamMateStore.teamMates,
    );

    const handleAssigneeFilter = useCallback((e: any) => {
      const typedValue = e.target.value;
      const filteredUsers = teamMateStore.teamMates.filter(teamMates =>
        teamMates?.user.user_name
          ?.toLowerCase()
          ?.includes(typedValue?.toLowerCase()),
      );
      setAssignedUsers(filteredUsers);
    }, []);

    const handleOpenAssigneeDropdown = useCallback(() => {
      setShowAssigneeDropdown(true);
    }, []);

    return (
      <div
        className='relative flex-1 text-left w-full cursor-pointer'
        onClick={handleOpenAssigneeDropdown}
        onMouseEnter={() => {
          taskStore.setSelectedTask(task);
          setIsHovering(true);
        }}
        onMouseLeave={() => {
          setShowAssigneeDropdown(false);
          setIsHovering(false);
        }}
      >
        <p className='hover:text-gray-400 transition-colors'>
          {task.assignedUser ? (
            <ProfileTab
              imageURL={task.assignedUser?.profile_picture_url}
              name={task.assignedUser?.user_name}
            />
          ) : (
            'Unassigned'
          )}
        </p>
        {showAssigneeDropdown && (
          <ul
            className={`absolute top-0 left-1/2 -translate-x-1/2 rounded-md bg-white shadow-md border z-[10000!important] w-[200px]`}
          >
            <input
              placeholder='Search for assignee'
              onChange={handleAssigneeFilter}
              className='border-b p-2 w-full outline-none'
            />
            {assignedUsers.length ? (
              assignedUsers.map(item => (
                <li
                  key={item._id}
                  className='p-2.5 hover:bg-gray-100 w-full text-left cursor-pointer flex items-center justify-between'
                  onClick={e => {
                    e.stopPropagation();
                    handleOnSelect(item.user._id as string);
                    setShowAssigneeDropdown(false);
                  }}
                >
                  <span className='h-full'>{item.user.user_name}</span>
                  {isHovering && task.assignedUser && (
                    <button
                      className='p-0.5 bg-red-500 rounded-full flex items-center justify-center ml-auto'
                      onClick={e => {
                        handleOnSelect(null);
                        e.stopPropagation();
                        setShowAssigneeDropdown(false);
                      }}
                    >
                      <MdClose
                        className='text-white cursor-pointer'
                        size={15}
                      />
                    </button>
                  )}
                </li>
              ))
            ) : (
              <span className='p-2.5 text-gray-400 w-full block'>
                No teammate found
              </span>
            )}
          </ul>
        )}
      </div>
    );
  },
);
