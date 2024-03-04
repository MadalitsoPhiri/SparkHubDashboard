import { forwardRef } from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ ...rest }, ref) => {
    return <input type='checkbox' ref={ref} {...rest} />;
  },
);

export default Checkbox;
