import type { FC } from 'react';

import { ActionIcon, Flex, Group, Text } from '@mantine/core';
import { IconCheck, IconMailQuestion, IconUserSearch, IconX } from '@tabler/icons-react';
import { useNavigate } from 'react-router';

import { useManageApplicationMutation } from '@/src/api/mutations/tournamentMutations';
import type { TournamentApplication as TournamentApplicationType } from '@/src/api/tournament';
import { RoutePaths } from '@/src/models/enums/RoutePaths';
import { vars } from '@/src/theme';

type EditTournamentApplicationProps = {
	application?: TournamentApplicationType;
};

export const EditTournamentApplication: FC<EditTournamentApplicationProps> = ({ application }) => {
	const navigate = useNavigate();

	const manageApplication = useManageApplicationMutation();

	const handleAccept = () => {
		if (!application) return;

		manageApplication.mutate({
			tournamentId: application.tournamentId,
			applicationId: application.id,
			accepted: true,
		});
	};

	const handleReject = () => {
		if (!application) return;

		manageApplication.mutate({
			tournamentId: application.tournamentId,
			applicationId: application.id,
			accepted: false,
		});
	};

	return (
		<Group p={16} bdrs={4} bg={vars.colors.white} bd='1px solid #ced4de' justify='space-between'>
			<Group gap={12}>
				<Flex style={{ padding: 8, backgroundColor: vars.colors.green[1], borderRadius: '50%' }}>
					<IconMailQuestion size={20} />
				</Flex>
				<Text size='md' fw={600}>
					{application?.teamName}
				</Text>
			</Group>
			<Group gap={10}>
				<ActionIcon
					variant='outline'
					color='green'
					onClick={handleAccept}
					loading={manageApplication.isPending}
				>
					<IconCheck size={16} />
				</ActionIcon>
				<ActionIcon
					variant='outline'
					color='red'
					onClick={handleReject}
					loading={manageApplication.isPending}
				>
					<IconX size={16} />
				</ActionIcon>
				<ActionIcon
					variant='outline'
					color='blue'
					onClick={() =>
						navigate(RoutePaths.TeamDetails.replace(':id', application!.teamId.toString()))
					}
				>
					<IconUserSearch size={16} />
				</ActionIcon>
			</Group>
		</Group>
	);
};
