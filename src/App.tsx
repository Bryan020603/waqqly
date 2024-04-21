import { Amplify } from 'aws-amplify';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { RootRouter } from '@/Router';
import awsConfig from '@/amplifyconfiguration.json';
import theme from '@/theme';
import './App.css';

Amplify.configure(awsConfig);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RootRouter />
    </ThemeProvider>
  );
}

export default App;
