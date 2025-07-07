import type { FC } from 'react';

import { ActionIcon, Group } from '@mantine/core';
import { IconLogin, IconLogout, IconUser } from '@tabler/icons-react';
import { useNavigate } from 'react-router';

import { RoutePaths } from '@/src/models/enums/RoutePaths';

export const ProfileButtons: FC = () => {
	// TODO: Fix the logic upon readiness of the backend
	const navigate = useNavigate();

	return (
		<Group style={{ gap: 10 }}>
			<ActionIcon variant='default' size='lg' onClick={() => navigate(RoutePaths.Profile)}>
				<IconUser size={20} />
			</ActionIcon>
			<ActionIcon variant='default' size='lg' onClick={() => navigate(RoutePaths.Login)}>
				<IconLogin size={20} />
			</ActionIcon>
			<ActionIcon variant='default' size='lg' onClick={() => console.log('LOGOUT')}>
				<IconLogout size={20} />
			</ActionIcon>
		</Group>
	);
};
