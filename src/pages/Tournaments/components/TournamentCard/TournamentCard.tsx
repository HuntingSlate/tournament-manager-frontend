import type { FC } from 'react';

import { Button, Flex, Group, Stack, Text } from '@mantine/core';
import {
	IconBuilding,
	IconCalendarEvent,
	IconDeviceGamepad2,
	IconMapPin,
	IconNetwork,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router';

import type { Tournament } from '@/src/api/tournament';
import { StatusIndicator } from '@/src/components/StatusIndicator';
import { RoutePaths } from '@/src/models/enums/RoutePaths';
import { vars } from '@/src/theme';

type TournamentCardProps = {
	tournament: Tournament;
};

export const TournamentCard: FC<TournamentCardProps> = ({ tournament }) => {
	const navigate = useNavigate();

	return (
		<Group p={16} bdrs={4} bg={vars.colors.white} bd='1px solid #ced4de' justify='space-between'>
			<Group gap={12}>
				<Flex p={8} bg={vars.colors.yellow[1]} bdrs='50%'>
					{tournament.lanTournament ? <IconBuilding size={20} /> : <IconNetwork size={20} />}
				</Flex>
				<Stack gap={8}>
					<Group gap={8}>
						<Text size='md' fw={600}>
							{tournament.name}
						</Text>
						<StatusIndicator status={tournament.status} />
					</Group>
					<Group>
						<Group gap={4}>
							<IconDeviceGamepad2 size={15} />
							<Text size='xs' fw={500} w={125}>
								{tournament.gameName}
							</Text>
						</Group>
						<Group gap={4} align='center'>
							<IconCalendarEvent size={15} />
							<Text size='xs'>
								{tournament.startDate} - {tournament.endDate}
							</Text>
						</Group>
						{tournament.lanTournament && tournament.city && (
							<Group gap={4}>
								<IconMapPin size={15} />
								<Text size='xs'>{tournament.city}</Text>
							</Group>
						)}
					</Group>
				</Stack>
			</Group>
			<Button
				variant='subtle'
				color='blue'
				size='sm'
				onClick={() =>
					navigate(RoutePaths.TournamentDetails.replace(':id', tournament.id.toString()))
				}
			>
				Details
			</Button>
		</Group>
	);
};
