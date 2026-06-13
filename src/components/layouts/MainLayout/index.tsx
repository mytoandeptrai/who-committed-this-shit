import type { PropsWithChildren } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Header />
      <main className='min-h-[calc(100vh-4rem)]'>{children}</main>
      <Footer containerClassName='md:items-start lg:items-center' />
    </div>
  );
};

export default MainLayout;
