import Logo from '@/components/atoms/Logo';
import Search from '@/components/atoms/Search';

const Header = () => {
  return (
    <div className=' z-50 flex justify-between items-center px-[15px] bg-white w-full py-2 border-b border-border'>
      <Logo size='md' />

      <div className='sm:w-[40%] md:w-[25%] hidden'>
        <Search placeholder='Search' />
      </div>
    </div>
  );
};
export default Header;
