import type { FC } from 'react';

import { Button, Flex, Group, Stack, Text } from '@mantine/core';
import { IconBuilding, IconCalendarEvent, IconMapPin, IconNetwork } from '@tabler/icons-react';
import { useNavigate } from 'react-router';

import type { Tournament } from '@/src/api/tournament';
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
				<Stack gap={0}>
					<Text size='md' fw={600}>
						{tournament.name}
					</Text>
					<Group gap={32}>
						<Text size='xs' fw={500} style={{ width: '150px' }}>
							{tournament.gameName}
						</Text>
						<Text size='xs'>{tournament.status}</Text>
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
