import { QueryClient, QueryClientProvider } from 'react-query';
import PostsComponent from './components/PostsComponent';

// QueryClient and queryClient
const queryClient = new QueryClient();

function App() {
  return (
    //client={queryClient} and QueryClientProvider
    <QueryClientProvider client={queryClient}>
      <PostsComponent />
    </QueryClientProvider>
  );
}

export default App;