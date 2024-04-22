import { Alert, Snackbar } from '@mui/material';
import ReactDOM from 'react-dom/client';

type MessageType = 'success' | 'error' | 'warning' | 'info';

interface NotifyProps {
  type: MessageType;
  message: string;
}

export const showNotification = ({ type, message }: NotifyProps) => {
  const container = document.createElement('div');
  document.body.appendChild(container);

  ReactDOM.createRoot(container).render(
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={true}
      sx={{ position: 'fixed', zIndex: 1500 }}
    >
      <Alert severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );

  setTimeout(() => {
    document.body.removeChild(container);
  }, 5000);
};
