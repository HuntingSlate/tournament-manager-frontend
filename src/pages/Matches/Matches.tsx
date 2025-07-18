import type { FC } from 'react';

import { Group, Title } from '@mantine/core';

import { PageLayout } from '@/src/components/layouts/PageLayout';

export const Matches: FC = () => {
	return (
		<PageLayout>
			<Group wrap='nowrap' justify='space-between'>
				<Title order={2}>Ladder</Title>
			</Group>
		</PageLayout>
	);
};
