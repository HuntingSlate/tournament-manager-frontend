import type { FC } from 'react';

import { ActionIcon, Group } from '@mantine/core';
import { IconLogin, IconLogout, IconUser } from '@tabler/icons-react';
import { useNavigate } from 'react-router';

import { useLogout } from '@/src/api/mutations/authMutations';
import { RoutePaths } from '@/src/models/enums/RoutePaths';
import { useAuthStore } from '@/src/store/authStore';

export const ProfileButtons: FC = () => {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated());
	const navigate = useNavigate();
	const logout = useLogout();

	return (
		<Group style={{ gap: 10 }}>
			{isAuthenticated && (
				<ActionIcon variant='default' size='lg' onClick={() => navigate(RoutePaths.Profile)}>
					<IconUser size={20} />
				</ActionIcon>
			)}
			{!isAuthenticated && (
				<ActionIcon variant='default' size='lg' onClick={() => navigate(RoutePaths.Login)}>
					<IconLogin size={20} />
				</ActionIcon>
			)}
			{isAuthenticated && (
				<ActionIcon variant='default' size='lg' onClick={logout}>
					<IconLogout size={20} />
				</ActionIcon>
			)}
		</Group>
	);
};
