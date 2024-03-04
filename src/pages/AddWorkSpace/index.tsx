import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Logo from '@/components/atoms/Logo';
import { SelectInput, SelectInputOption } from '@/components/atoms/SelectInput';
import { useAuth } from '@/hooks/useAuth';
import { useWorkspace } from '@/hooks/useWorkspace';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const workspace_size: SelectInputOption[] = [
  {
    label: '1 - 4 Employees',
    value: 'XXS',
  },
  {
    label: '5 - 9 Employees',
    value: 'XS',
  },
  {
    label: '10 - 49 Employees',
    value: 'SM',
  },
  {
    label: '50 - 199 Employees',
    value: 'MD',
  },
  {
    label: '200 - 499 Employees',
    value: 'LG',
  },
  {
    label: '500 - 999 Employees',
    value: 'XL',
  },
  {
    label: '1000+ Employees',
    value: 'XXL',
  },
];

export const AddWorkSpace = () => {
  const { createWorkspace, isLoading } = useWorkspace();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const company_size_select = useRef<any>();
  const [workspace_name_error, set_workspace_name_error] = useState(false);
  const [company_size_error, set_company_size_error] = useState(false);
  const [workspace_name, set_workspace_name] = useState<string | null>(null);
  const [company_size, set_company_size] = useState<string | null>(null);

  const handle_submit = () => {
    let error = false;
    set_company_size_error(false);
    set_workspace_name_error(false);

    if (!company_size) {
      error = true;
      set_company_size_error(true);
    }

    if (!workspace_name) {
      error = true;
      set_workspace_name_error(true);
    }

    if (!error) {
      createWorkspace({
        company_size,
        workspace_name,
        timezone: '',
      });
    }
  };
  return (
    <div className='w-full h-screen  flex flex-col items-center bg-white'>
      <div className='w-full p-3 px-5 bg-white flex flex-row justify-between'>
        <div
          className='flex flex-row cursor-pointer items-center'
          onClick={() => {
            navigate('/', { replace: true });
          }}
        >
          <Logo size={'md'} />
          <p className='ml-2 text-lg font-semibold noselect'>Sparkhub</p>
        </div>
        <button
          onClick={async () => {
            await logout();
          }}
        >
          <p className='text-medium text-gray-600'>Sign out</p>
        </button>
      </div>
      <div className='flex flex-row justify-center px-10 p-5 mt-10 max-w-[70%] '>
        <div className='flex flex-col mr-16 flex-[0.7]'>
          <h1 className='text-2xl font-medium mb-4'>{`Create your company's workspace`}</h1>
          <p className='text-lg font-normal'>{`Provide information about your company to customize SparkyHub for your team and customers.`}</p>
        </div>
        <div className='flex flex-col flex-1'>
          <div className='mb-5'>
            <div className='flex flex-row justify-between'>
              <p className='mb-1'>WorkSpace name</p>
            </div>
            <Input
              value={workspace_name as string}
              disabled={isLoading}
              onChange={e =>
                set_workspace_name(
                  (e.target as HTMLInputElement).value as string,
                )
              }
              error={workspace_name_error ? 'Name is required' : ''}
              placeholder='your new workspace name'
            />
          </div>
          <div className='mb-5'>
            <div className='flex flex-row justify-between'>
              <p className='mb-1'>Company size</p>
            </div>

            <SelectInput
              ref={company_size_select}
              options={workspace_size}
              placeholder='Select company size'
              id='company_size'
              disabled={isLoading}
              value={company_size as string}
              onChange={e =>
                set_company_size((e.target as HTMLInputElement).value)
              }
              error={company_size_error ? 'Size is required' : ''}
              name='location'
              defaultValue={''}
            />

            <p className='mt-4 text-sm text-gray-500'>
              By clicking “Create New Workspace” you agree to SparkyHub’s Terms
              of Service and Privacy Policy.
            </p>
            <div className='flex items-center w-full mt-3'>
              <Button
                text={
                  isLoading ? 'Creating WorkSpace...' : 'Create New Workspace'
                }
                loading={isLoading}
                onClick={handle_submit}
                className='w-full'
                size='md'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
