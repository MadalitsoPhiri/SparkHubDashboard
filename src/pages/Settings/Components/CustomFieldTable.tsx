import { CustomField } from '@/types/customField.types';
import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

type CustomFieldsTableProps = {
  data?: CustomField[];
};

const CustomFieldsTable: FC<CustomFieldsTableProps> = ({ data = [] }) => {
  return (
    <div className='relative 2xl:mb-[120px] xl:mb-[90px] text-md'>
      <div className='mt-8 flex flex-col'>
        <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
            <div className='overflow-hidden'>
              <table className='min-w-full'>
                <thead>
                  <th
                    scope='col'
                    className='2xl:py-3.5 xl:py-2.5 pl-4 pr-3 text-left font-semibold text-gray-400'
                  >
                    Field Name
                  </th>
                  <th
                    scope='col'
                    className='px-3 2xl:py-3.5 xl:py-2.5 text-left font-semibold text-gray-400'
                  >
                    Field Type
                  </th>
                  <th
                    scope='col'
                    className='px-3 2xl:py-3.5 xl:py-2.5 text-left font-semibold text-gray-400'
                  >
                    Created At
                  </th>
                  <th
                    scope='col'
                    className='px-3 2xl:py-3.5 xl:py-2.5 text-left font-semibold text-gray-400'
                  >
                    Last Modified
                  </th>
                </thead>
                <tbody>
                  {data?.map(customField => (
                    <tr
                      key={customField._id}
                      className='border-b-[0.5px] text-gray-500'
                    >
                      <td className='whitespace-nowrap 2xl:py-4 xl:py-3 pl-4 pr-3'>
                        {customField.field}
                      </td>
                      <td className='whitespace-nowrap px-3 2xl:py-4 xl:py-3'>
                        {customField.type.toUpperCase()}
                      </td>
                      <td className='whitespace-nowrap px-3 2xl:py-4 xl:py-3'>
                        {format(new Date(customField.createdAt), 'dd/MM/yyyy')}
                      </td>
                      <td className='whitespace-nowrap px-3 2xl:py-4 xl:py-3'>
                        {format(new Date(customField.updatedAt), 'dd/MM/yyyy')}
                      </td>
                    </tr>
                  ))}
                  {data?.length === 0 && (
                    <tr className='border-b-[0.5px] text-gray-500 text-center '>
                      <td colSpan={4} className='p-5'>
                        No Custom Fields
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default observer(CustomFieldsTable);
