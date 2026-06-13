'use client';

import { Icons } from '@/assets/icons';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function SearchInput() {
  const [search, setSearch] = useState('');

  return (
    <div className='relative hidden w-full max-w-md lg:block'>
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        prefix={<Icons.search className='h-4 w-4 text-neutral-600' />}
        placeholder='Search...'
        className='border-[#171717] bg-input text-[#FAFAFA] selection:bg-white selection:text-general-foreground lg:max-w-44 xl:min-w-64'
      />
    </div>
  );
}
