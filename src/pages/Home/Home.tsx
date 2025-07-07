import type { FC } from 'react';

import { Button } from '@mantine/core';
import { useNavigate } from 'react-router';

export const Home: FC = () => {
	const navigate = useNavigate();
	return (
		<div>
			<Button onClick={() => navigate('/about')}>XD</Button>
		</div>
	);
};
