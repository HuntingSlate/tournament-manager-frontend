import type { FC } from 'react';

import { Group, Stack } from '@mantine/core';

import { PageLayout } from '@/src/components/layouts/PageLayout';
import { ProfileDetails } from '@/src/pages/Profile/components/ProfileDetails';
import { ProfileLinks } from '@/src/pages/Profile/components/ProfileLinks';
import { ProfilePassword } from '@/src/pages/Profile/components/ProfilePassword';

export const Profile: FC = () => {
	return (
		<PageLayout>
			<Stack>
				<Group style={{ width: '100%', flex: 1, gap: 24 }}>
					<Stack style={{ flex: 1, gap: 24, alignSelf: 'flex-start' }}>
						<ProfileDetails />
						<ProfilePassword />
					</Stack>
					<Stack style={{ flex: 1, alignSelf: 'flex-start' }}>
						<ProfileLinks />
					</Stack>
				</Group>
			</Stack>
		</PageLayout>
	);
};
