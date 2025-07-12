import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AppRouter } from '@/src/router/AppRouter';

const queryClient = new QueryClient();

export default function App() {
	return (
		<MantineProvider>
			<QueryClientProvider client={queryClient}>
				<AppRouter />
			</QueryClientProvider>
		</MantineProvider>
	);
}
