import { FC, PropsWithChildren } from 'react';

export const MainContainer: FC<
  PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>
> = ({ children, className, ...rest }) => {
  return (
    <div
      className={`flex flex-col bg-white max-h-[calc(100vh-100px)]  m-[25px] mb-[70px] rounded-[16px] shadow overflow-y-auto no-scrollbar ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};
