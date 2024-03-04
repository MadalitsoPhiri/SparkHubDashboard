import { Icon } from '@iconify/react';
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { PropsWithChildren, useState } from 'react';

export interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, string>[];
  headerClassName?: string;
  showPagination?: boolean;
}

export const DataTable = <TData,>({
  data = [],
  columns,
  headerClassName,
  showPagination,
}: PropsWithChildren<DataTableProps<TData>>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 8,
      },
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className='max-w-full overflow-x-scroll max-h-[700px] no-scrollbar h-full'>
      <table className='table-style'>
        <thead className='sticky top-0 m-0 '>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className='tr'>
              {headerGroup.headers.map(header => (
                <th key={header.id} className={`th ${headerClassName}`}>
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? 'cursor-pointer select-none flex items-center gap-2'
                          : '',
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {
                        {
                          asc: (
                            <Icon icon='fa-solid:sort-up' className='w-3 h-3' />
                          ),
                          desc: (
                            <Icon
                              icon='fa-solid:sort-down'
                              className='w-3 h-3'
                            />
                          ),
                        }[header.column.getIsSorted() as string]
                      }
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className='tr'>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className='td'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {showPagination && (
        <>
          <div className='h-6' />
          <nav className='flex items-center justify-end gap-2 w-full'>
            <button
              className='border rounded p-1 border-gray-100 cursor-pointer'
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <Icon icon='heroicons-solid:chevron-double-left' />
            </button>
            <button
              className='border rounded p-1 border-gray-100 cursor-pointer'
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <Icon icon='heroicons-solid:chevron-left' />
            </button>
            <button
              className='border rounded p-1 border-gray-100 cursor-pointer'
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <Icon icon='heroicons-solid:chevron-right' />
            </button>
            <button
              className='border rounded p-1 border-gray-100 cursor-pointer'
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <Icon icon='heroicons-solid:chevron-double-right' />
            </button>
            <span className='flex items-center gap-1 text-xs darK:text-gray-300'>
              <div>Page</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} of{' '}
                {table.getPageCount()}
              </strong>
            </span>
          </nav>
        </>
      )}
    </div>
  );
};
