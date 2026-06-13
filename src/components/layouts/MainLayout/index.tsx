import type { PropsWithChildren } from 'react';
import AnnounceBanner from './components/AnnounceBanner';
import Footer from './components/Footer';
import Header from './components/Header';

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <AnnounceBanner />
      <Header />
      <main className='min-h-[calc(100vh-9.875rem)] overflow-hidden'>{children}</main>
      <Footer containerClassName='md:items-start lg:items-center' />
    </div>
  );
};

export default MainLayout;
