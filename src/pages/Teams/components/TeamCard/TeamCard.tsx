import type { FC } from 'react';

import { Button, Group, Stack, Text } from '@mantine/core';
import {
	IconCheck,
	IconCrown,
	IconDeviceGamepad2,
	IconUsers,
	IconUsersGroup,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router';

import type { Team } from '@/src/api/team';
import { RoutePaths } from '@/src/models/enums/RoutePaths';
import { vars } from '@/src/theme';

type TeamCardProps = {
	team: Team;
	isPartOf?: boolean;
};

export const TeamCard: FC<TeamCardProps> = ({ team, isPartOf }) => {
	const navigate = useNavigate();

	return (
		<Group
			style={{
				border: '1px solid #ced4da',
				gap: 0,
				padding: '20px 16px',
				borderRadius: 4,
				justifyContent: 'space-between',
				backgroundColor: vars.colors.white,
			}}
		>
			<Stack style={{ gap: 16 }}>
				<Group gap={8}>
					{isPartOf && <IconCheck size={16} color={vars.colors.green[6]} />}
					<Text size='lg' fw={700}>
						{team.name}
					</Text>
					<IconUsersGroup size={22} />
				</Group>
				<Group gap={32}>
					<Group gap={6}>
						<IconDeviceGamepad2 size={16} />
						<Text size='sm'>{team.gameName}</Text>
					</Group>
					<Group gap={6} color='blue'>
						<IconCrown size={16} />
						<Text size='sm'>{team.leaderNickname}</Text>
					</Group>
					<Group gap={6}>
						<IconUsers size={16} />
						<Text size='xs'>Members: {team.teamMembers.length}</Text>
					</Group>
				</Group>
			</Stack>
			<Group gap={8}>
				<Button
					variant='subtle'
					color='blue'
					onClick={() => navigate(RoutePaths.TeamDetails.replace(':id', team.id.toString()))}
				>
					Details
				</Button>
			</Group>
		</Group>
	);
};
