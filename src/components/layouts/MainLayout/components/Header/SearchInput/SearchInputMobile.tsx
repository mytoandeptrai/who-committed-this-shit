'use client';

import { Icons } from '@/assets/icons';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const SearchInputMobile = () => {
  const [search, setSearch] = useState('');

  return (
    <div className='md:hidden'>
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        prefix={<Icons.search className='h-4 w-4 text-neutral-600' />}
        placeholder='Search...'
        className='w-full border-[#171717] bg-input text-[#FAFAFA] selection:bg-white selection:text-general-foreground'
      />
    </div>
  );
};

export default SearchInputMobile;
