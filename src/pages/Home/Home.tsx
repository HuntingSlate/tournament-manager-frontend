import type { FC } from 'react';

import { useNavigate } from 'react-router';

import { PageLayout } from '@/src/components/layouts/PageLayout';

export const Home: FC = () => {
	const navigate = useNavigate();
	return (
		<PageLayout>
			<div>Home screen</div>
		</PageLayout>
	);
};
