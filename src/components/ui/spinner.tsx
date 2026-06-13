import { Icons } from '@/assets/icons';

interface Props {
  className?: string;
}

const Spinner = ({ className }: Props) => {
  return (
    <span className='animate-spin'>
      <Icons.spinner className={className} />
    </span>
  );
};

export default Spinner;
