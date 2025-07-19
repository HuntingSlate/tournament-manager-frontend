import type { FC } from 'react';

import { Button, Flex, Group, Text } from '@mantine/core';
import { IconCrown, IconUsersGroup } from '@tabler/icons-react';
import { useNavigate, useParams } from 'react-router';

import type { Team } from '@/src/api/team';
import { RoutePaths } from '@/src/models/enums/RoutePaths';
import { useAuthStore } from '@/src/store/authStore';
import { vars } from '@/src/theme';

type ProfileTeamProps = {
	team: Team;
};

export const ProfileTeam: FC<ProfileTeamProps> = ({ team }) => {
	const { id } = useParams<{ id: string }>();
	const userId = useAuthStore((state) => state.user?.id);
	const navigate = useNavigate();

	const isLeader = team.leaderId === Number(id) || team.leaderId === userId;

	return (
		<Group p={16} bdrs={4} bg={vars.colors.white} bd='1px solid #ced4de' justify='space-between'>
			<Group gap={12}>
				<Flex style={{ padding: 8, backgroundColor: vars.colors.pink[1], borderRadius: '50%' }}>
					<IconUsersGroup size={20} />
				</Flex>
				<Text size='md' fw={600}>
					{team?.name}
				</Text>
				{isLeader && <IconCrown size={20} color={vars.colors.yellow[5]} />}
			</Group>
			<Button
				variant='subtle'
				color='blue'
				onClick={() => navigate(RoutePaths.TeamDetails.replace(':id', team.id.toString()))}
			>
				Team Details
			</Button>
		</Group>
	);
};
