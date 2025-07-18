import type { FC } from 'react';

import { ActionIcon, Flex, Group, Text } from '@mantine/core';
import { IconUserSearch, IconUsersGroup, IconX } from '@tabler/icons-react';
import { useNavigate } from 'react-router';

import { useRemoveTeamFromTournamentMutation } from '@/src/api/mutations/tournamentMutations';
import { RoutePaths } from '@/src/models/enums/RoutePaths';
import { vars } from '@/src/theme';

export type EditTournamentTeamProps = {
	tournamentId: number;
	id: number;
	name: string;
};

export const EditTournamentTeam: FC<EditTournamentTeamProps> = ({ tournamentId, id, name }) => {
	const navigate = useNavigate();

	const { mutate, isPending } = useRemoveTeamFromTournamentMutation();

	const handleRemoveTeam = () => {
		mutate({ tournamentId, teamId: id });
	};

	return (
		<Group p={16} bdrs={4} bg={vars.colors.white} bd='1px solid #ced4de' justify='space-between'>
			<Group gap={12}>
				<Flex style={{ padding: 8, backgroundColor: vars.colors.pink[1], borderRadius: '50%' }}>
					<IconUsersGroup size={20} />
				</Flex>
				<Text size='md' fw={600}>
					{name}
				</Text>
			</Group>
			<Group gap={10}>
				<ActionIcon variant='outline' color='red' onClick={handleRemoveTeam} loading={isPending}>
					<IconX size={16} />
				</ActionIcon>
				<ActionIcon
					variant='outline'
					color='blue'
					onClick={() => navigate(RoutePaths.TeamDetails.replace(':id', id.toString()))}
				>
					<IconUserSearch size={16} />
				</ActionIcon>
			</Group>
		</Group>
	);
};
