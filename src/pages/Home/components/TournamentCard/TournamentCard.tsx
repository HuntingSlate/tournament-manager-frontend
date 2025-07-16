import type { FC } from 'react';

import { ActionIcon, Flex, Group, Stack, Text } from '@mantine/core';
import { IconBuilding, IconChevronRight, IconGlobe } from '@tabler/icons-react';
import { useNavigate } from 'react-router';

import type { Tournament } from '@/src/api/tournament';
import { RoutePaths } from '@/src/models/enums/RoutePaths';

type TournamentCardProps = {
	tournament: Tournament;
};

export const TournamentCard: FC<TournamentCardProps> = ({ tournament }) => {
	const navigate = useNavigate();

	return (
		<Group
			style={{
				padding: 16,
				borderRadius: 4,
				border: '1px solid #ced4da',
				justifyContent: 'space-between',
				alignItems: 'center',
			}}
		>
			<Group style={{ gap: 16 }}>
				<Flex
					style={{
						alignItems: 'center',
						justifyContent: 'center',
						padding: 16,
						borderRadius: 4,
						border: '1px solid #ced4de',
					}}
				>
					{tournament.lanTournament ? <IconBuilding size={24} /> : <IconGlobe size={24} />}
				</Flex>
				<Group style={{ gap: 36 }}>
					<Stack style={{ gap: 0 }}>
						<Text size='lg' fw={700}>
							{tournament.name}
						</Text>
						<Text size='sm' fw={500}>
							{tournament.gameName}
						</Text>
						<Text size='xs'>
							{tournament.startDate} - {tournament.endDate}
						</Text>
					</Stack>
					{tournament.lanTournament && (
						<Group style={{ gap: 8 }}>
							<Text size='sm' fw={500}>
								Location:
							</Text>
							<Text size='sm'>{tournament.city}</Text>
						</Group>
					)}
				</Group>
			</Group>
			<ActionIcon
				variant='transparent'
				size='lg'
				onClick={() =>
					navigate(RoutePaths.TournamentDetails.replace(':id', tournament.id.toString()))
				}
			>
				<IconChevronRight size={24} />
			</ActionIcon>
		</Group>
	);
};
