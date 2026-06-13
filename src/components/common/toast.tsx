import { toast } from 'sonner';
import Alert from '../ui/alert';

interface ToastOptions {
  variant?: 'success' | 'error';
  title: string;
  message?: string;
  icon?: React.ReactNode;
  duration?: number;
}

export const showToast = ({ variant = 'success', title, message, icon, duration = 4000 }: ToastOptions) => {
  toast.custom(() => <Alert variant={variant} title={title} message={message} icon={icon} />, {
    duration,
  });
};
