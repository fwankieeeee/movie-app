import React from 'react';
import './gesture-handler';
import ApplicationNavigator from './src/navigation/ApplicationNavigator';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = (): React.JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <ApplicationNavigator />
    </QueryClientProvider>
  );
};

export default App;
