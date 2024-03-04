import { TableStyles, defaultThemes } from 'react-data-table-component';

export const customStyles: TableStyles = {
  tableWrapper: {
    style: {
      borderLeft: '1px solid #E6E8EB',
      borderRight: '1px solid #E6E8EB',
      borderTop: 'none',
      borderBottom: 'none',
    },
  },
  pagination: {
    style: {
      borderLeft: '1px solid #E6E8EB',
      borderRight: '1px solid #E6E8EB',
      borderTop: '1px solid #E6E8EB',
      borderBottom: 'none',
    },
  },
  header: {
    style: {
      minHeight: '52px',
      background: '#000000',
    },
  },
  headRow: {
    style: {
      borderTopStyle: 'solid',
      borderTopWidth: '0px',
      borderTopColor: defaultThemes.default.divider.default,
    },
  },
  headCells: {
    style: {
      '&:not(:last-of-type)': {
        borderRightStyle: 'solid',
        borderRightWidth: '0px',
        fontWeight: '500',
        lineHeight: '20px',
        borderRightColor: defaultThemes.default.divider.default,
      },
      paddingLeft: '8px',
      fontSize: '14px',
      backgroundColor: '#EDEFF2',
    },
  },
  cells: {
    style: {
      '&:not(:last-of-type)': {
        borderRightStyle: 'solid',
        borderRightWidth: '1px',
        borderRightColor: defaultThemes.default.divider.default,
      },
      width: 'auto',
      padding: '2px 8px',
    },
    draggingStyle: {
      backgroundColor: '#000000',
    },
  },
};
