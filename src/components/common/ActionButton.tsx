import { Tooltip } from '@/components/ui/tooltip';
import useMobile from '@/hooks/useMobile';

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  tooltip?: string;
}

const ActionButton = ({ tooltip, children, onClick, ...props }: ActionButtonProps) => {
  const isMobile = useMobile();

  if (isMobile) {
    return (
      <button type='button' className='group disabled:cursor-not-allowed' onClick={onClick} {...props}>
        {children}
      </button>
    );
  }

  return (
    <button type='button' className='group disabled:cursor-not-allowed' {...props}>
      <Tooltip side='top' asChild content={tooltip}>
        <div
          className='p-0.5'
          role='button'
          tabIndex={-1}
          onClick={onClick as unknown as React.MouseEventHandler<HTMLDivElement>}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              (onClick as unknown as React.MouseEventHandler<HTMLDivElement>)?.(
                e as unknown as React.MouseEvent<HTMLDivElement>
              );
            }
          }}
        >
          {children}
        </div>
      </Tooltip>
    </button>
  );
};

export default ActionButton;
