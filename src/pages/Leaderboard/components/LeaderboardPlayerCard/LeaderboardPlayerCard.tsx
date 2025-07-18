import type { FC } from 'react';

import { Button, Flex, Group, Text } from '@mantine/core';
import { IconUser } from '@tabler/icons-react';
import { useNavigate } from 'react-router';

import type { GamePlayerRanking } from '@/src/api/statistics';
import { RoutePaths } from '@/src/models/enums/RoutePaths';
import { vars } from '@/src/theme';

type LeaderboardPlayerCardProps = {
	playerRanking: GamePlayerRanking;
};

export const LeaderboardPlayerCard: FC<LeaderboardPlayerCardProps> = ({ playerRanking }) => {
	const navigate = useNavigate();

	return (
		<Group
			p={'24px 16px'}
			bdrs={4}
			bg={vars.colors.white}
			bd='1px solid #ced4de'
			justify='space-between'
		>
			<Group gap={12} w='200px'>
				<Flex p={12} bg={vars.colors.blue[1]} bdrs='50%'>
					<IconUser size={32} />
				</Flex>
				<Text size='md' fw={600}>
					{playerRanking.playerNickname}
				</Text>
			</Group>
			<Group gap={16}>
				<Group gap={8}>
					<Text size='sm' fw={500}>
						Average K/D/A
					</Text>
					<Text size='sm'>
						{playerRanking.averageKills.toFixed(2)} / {playerRanking.averageDeaths.toFixed(2)} /{' '}
						{playerRanking.averageAssists.toFixed(2)}
					</Text>
				</Group>
				<Group gap={8}>
					<Text size='sm' fw={500}>
						Total K/D/A
					</Text>
					<Text size='sm'>
						{playerRanking.totalKills} / {playerRanking.totalDeaths} / {playerRanking.totalAssists}
					</Text>
				</Group>
			</Group>
			<Button
				variant='subtle'
				size='sm'
				onClick={() =>
					navigate(RoutePaths.ProfileDetails.replace(':id', playerRanking.playerId.toString()))
				}
			>
				View Profile
			</Button>
		</Group>
	);
};

/*
	return (
		<Stack
			style={{
				padding: 8,
				border: '1px solid #ced4da',
				borderRadius: 4,
				cursor: 'pointer',
			}}
		>
			<Group style={{ justifyContent: 'space-between', alignItems: 'center' }}>
				<Group style={{ gap: 8 }}>
					<IconUser size={20} />
					<Text size='lg' fw={700}>
						{playerRanking.playerNickname}
					</Text>
				</Group>
				<IconChevronRight size={20} />
			</Group>
			<Group style={{ justifyContent: 'space-between' }}>
				<Group style={{ gap: 8 }}>
					<Text size='xs' fw={500}>
						Average K/D/A:
					</Text>
					<Text size='xs'>
						{playerRanking.averageKills} / {playerRanking.averageDeaths} /{' '}
						{playerRanking.averageAssists}
					</Text>
				</Group>
				<Group style={{ gap: 8 }}>
					<Text size='xs' fw={500}>
						Matches Played:
					</Text>
					<Text size='xs'>{playerRanking.matchesPlayed}</Text>
				</Group>
			</Group>
		</Stack>
	);
  */
