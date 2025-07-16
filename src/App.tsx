import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AppRouter } from '@/src/router/AppRouter';

const queryClient = new QueryClient();

export default function App() {
	return (
		<MantineProvider>
			<Notifications />
			<QueryClientProvider client={queryClient}>
				<AppRouter />
			</QueryClientProvider>
		</MantineProvider>
	);
}
