import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

import { AppRouter } from '@/src/router/AppRouter';

export default function App() {
	return (
		<MantineProvider>
			<AppRouter />
		</MantineProvider>
	);
}
