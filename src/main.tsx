import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme.ts';
import GlobalStyle from './styles/global.ts';
import { BrowserRouter } from 'react-router-dom';
import { SearchContextProvider } from './components/domain/Search/SearchContext.tsx';

const queryClient = new QueryClient();

// if (process.env.NODE_ENV === 'development') {
//   (async () => {
//     const { worker } = await import('./mocks/browser');
//     worker.start();
//   })();
// }

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SearchContextProvider>
          <GlobalStyle />
          <App />
        </SearchContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </ThemeProvider>
  // </React.StrictMode>
);
