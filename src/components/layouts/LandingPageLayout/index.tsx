import type { PropsWithChildren } from 'react';
import Footer from '../MainLayout/components/Footer';
import Header from './components/Header';

const LandingPageLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Header />
      <main className='min-h-[calc(100vh-9.875rem)] overflow-hidden'>{children}</main>
      <Footer containerClassName='md:items-start lg:items-center' />
    </div>
  );
};

export default LandingPageLayout;
