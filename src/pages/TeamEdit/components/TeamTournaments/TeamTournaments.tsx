import type { FC } from 'react';

import { Button, Flex, Group, Text } from '@mantine/core';
import { IconTrophy } from '@tabler/icons-react';
import { useNavigate } from 'react-router';

import { useRemoveTeamFromTournamentMutation } from '@/src/api/mutations/tournamentMutations';
import { StatusIndicator } from '@/src/components/StatusIndicator';
import { RoutePaths } from '@/src/models/enums/RoutePaths';
import { vars } from '@/src/theme';

type TeamTournamentProps = {
	teamId: number;
	tournamentId: number;
	tournamentName: string;
	status: 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'CANCELED';
};

export const TeamTournament: FC<TeamTournamentProps> = ({
	teamId,
	tournamentId,
	tournamentName,
	status,
}) => {
	const navigate = useNavigate();

	const { mutate, isPending } = useRemoveTeamFromTournamentMutation();

	const handleWithdraw = () => {
		mutate({ tournamentId, teamId });
	};

	return (
		<Group p={16} bdrs={4} bg={vars.colors.white} bd='1px solid #ced4de' justify='space-between'>
			<Group gap={12}>
				<Flex p={8} bg={vars.colors.yellow[2]} bdrs='50%'>
					<IconTrophy size={20} />
				</Flex>
				<Group gap={8}>
					<Text size='md' fw={600}>
						{tournamentName}
					</Text>
					<StatusIndicator status={status} />
				</Group>
			</Group>
			<Group gap={8}>
				<Button
					variant='subtle'
					size='sm'
					color='yellow'
					onClick={() =>
						navigate(RoutePaths.TournamentDetails.replace(':id', tournamentId.toString()))
					}
				>
					View Tournament
				</Button>
				{status === 'PENDING' && (
					<Button
						variant='subtle'
						size='sm'
						color='red'
						onClick={handleWithdraw}
						loading={isPending}
					>
						Withdraw
					</Button>
				)}
			</Group>
		</Group>
	);
};
