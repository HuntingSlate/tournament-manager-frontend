import type { FC } from 'react';

import { Button, Flex, Group, Text } from '@mantine/core';
import { IconUser } from '@tabler/icons-react';
import { useNavigate } from 'react-router';

import type { UserProfile } from '@/src/api/user';
import { RoutePaths } from '@/src/models/enums/RoutePaths';
import { vars } from '@/src/theme';

type PlayerCardProps = {
	player: UserProfile;
};

export const PlayerCard: FC<PlayerCardProps> = ({ player }) => {
	const navigate = useNavigate();

	return (
		<Group p={16} bdrs={4} bg={vars.colors.white} bd='1px solid #ced4de' justify='space-between'>
			<Group>
				<Flex p={12} bg={vars.colors.blue[1]} bdrs='50%'>
					<IconUser size={32} />
				</Flex>
				<Text size='md' fw={600}>
					{player.nickname}
				</Text>
			</Group>
			<Button
				variant='subtle'
				color='blue'
				size='sm'
				onClick={() => navigate(RoutePaths.ProfileDetails.replace(':id', player.id.toString()))}
			>
				View Profile
			</Button>
		</Group>
	);
};
