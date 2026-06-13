import { Skeleton } from '@/components/ui/skeleton';
import Text from '@/components/ui/text';
import { VStack } from '@/components/utilities';
import { useCallback } from 'react';

interface Props {
  label: string;
  value: string | React.ReactNode;
  isLoading?: boolean;
  textClassName?: string;
}

const InfoField: React.FC<Props> = ({ label, value, isLoading = false, textClassName }) => {
  const renderValue = useCallback(() => {
    if (isLoading) {
      return <Skeleton className='h-6 w-full' />;
    }

    if (!value) {
      return <Text weight={600}>-</Text>;
    }

    return typeof value === 'string' ? (
      <Text weight={600} className={textClassName}>
        {value}
      </Text>
    ) : (
      value
    );
  }, [value, isLoading, textClassName]);

  return (
    <VStack spacing={4}>
      <Text size='sm' className='text-general-muted-foreground'>
        {label}
      </Text>

      {renderValue()}
    </VStack>
  );
};

export default InfoField;
