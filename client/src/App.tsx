import './App.css'
import Dashboard from './components/dashboard'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard/>
    </QueryClientProvider>
  )
}

export default App;
