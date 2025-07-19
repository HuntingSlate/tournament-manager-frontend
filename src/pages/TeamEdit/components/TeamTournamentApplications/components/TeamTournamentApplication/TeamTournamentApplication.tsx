import type { FC } from 'react';

import { ActionIcon, Flex, Group, Text } from '@mantine/core';
import { IconTrash, IconTrophy } from '@tabler/icons-react';
import { useNavigate } from 'react-router';

import type { TournamentApplication as TournamentApplicationType } from '@/src/api/tournament';
import { RoutePaths } from '@/src/models/enums/RoutePaths';
import { vars } from '@/src/theme';

type TeamTournamentApplicationProps = {
	application?: TournamentApplicationType;
	onWithdrawClick?: () => void;
	onWithdrawPending?: boolean;
};

export const TeamTournamentApplication: FC<TeamTournamentApplicationProps> = ({
	application,
	onWithdrawClick,
	onWithdrawPending,
}) => {
	const navigate = useNavigate();

	return (
		<Group p={16} bdrs={4} bg={vars.colors.white} bd='1px solid #ced4de' justify='space-between'>
			<Group gap={12}>
				<Flex style={{ padding: 8, backgroundColor: vars.colors.green[1], borderRadius: '50%' }}>
					<IconTrophy size={20} />
				</Flex>
				<Text size='md' fw={600}>
					{application?.tournamentName}
				</Text>
			</Group>
			<Group>
				<ActionIcon
					variant='outline'
					color='red'
					onClick={onWithdrawClick}
					loading={onWithdrawPending}
				>
					<IconTrash size={16} />
				</ActionIcon>
				<ActionIcon
					variant='outline'
					color='blue'
					onClick={() =>
						navigate(
							RoutePaths.TournamentDetails.replace(':id', application!.tournamentId.toString())
						)
					}
				>
					<IconTrophy size={16} />
				</ActionIcon>
			</Group>
		</Group>
	);
};
