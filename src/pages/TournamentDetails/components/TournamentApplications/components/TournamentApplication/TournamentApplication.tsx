import type { FC } from 'react';

import { Button, Flex, Group, Text } from '@mantine/core';
import { IconMailQuestion } from '@tabler/icons-react';
import { useNavigate } from 'react-router';

import type { TournamentApplication as TournamentApplicationType } from '@/src/api/tournament';
import { RoutePaths } from '@/src/models/enums/RoutePaths';
import { vars } from '@/src/theme';

type TournamentApplicationProps = {
	application?: TournamentApplicationType;
};

export const TournamentApplication: FC<TournamentApplicationProps> = ({ application }) => {
	const navigate = useNavigate();

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
			<Button
				variant='subtle'
				color='blue'
				onClick={() =>
					navigate(RoutePaths.TeamDetails.replace(':id', application!.teamId.toString()))
				}
			>
				Team Details
			</Button>
		</Group>
	);
};
