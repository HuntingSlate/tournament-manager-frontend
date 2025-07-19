import type { FC } from 'react';

import { Group, Stack, Flex, ActionIcon, Text } from '@mantine/core';
import { IconDeviceGamepad, IconTournament } from '@tabler/icons-react';
import { useNavigate } from 'react-router';

import type { GamePlayerRanking } from '@/src/api/statistics';
import { RoutePaths } from '@/src/models/enums/RoutePaths';
import { vars } from '@/src/theme';

type ProfileGameStatisticProps = {
	statistics?: GamePlayerRanking;
};

export const ProfileDetailsGameStatistic: FC<ProfileGameStatisticProps> = ({ statistics }) => {
	const navigate = useNavigate();

	return (
		<Group p={16} bd='1px solid #ced4de' bdrs={4}>
			<Stack gap={8} w='100%'>
				<Group justify='space-between' wrap='nowrap'>
					<Group gap={12}>
						<Flex p={8} bg={vars.colors.grape[2]} bdrs='50%' justify='center' align='center'>
							<IconDeviceGamepad size={20} />
						</Flex>
						<Text size='md' fw={500}>
							{statistics?.gameName}
						</Text>
					</Group>
					<Group>
						<Text size='sm' fw={500}>
							Matches Played: {statistics?.matchesPlayed}
						</Text>
						<ActionIcon
							size='lg'
							variant='outline'
							color='blue'
							onClick={() =>
								navigate(`${RoutePaths.Home}?gameName=${encodeURIComponent(statistics!.gameName)}`)
							}
						>
							<IconTournament size={16} />
						</ActionIcon>
					</Group>
				</Group>
				<Group gap={36}>
					<Group gap={8}>
						<Text size='sm' fw={500}>
							Total K/D/A
						</Text>
						<Text size='sm'>
							{statistics?.totalKills} / {statistics?.totalDeaths} / {statistics?.totalAssists}
						</Text>
					</Group>
					<Group gap={8}>
						<Text size='sm' fw={500}>
							Average K/D/A
						</Text>
						<Text size='sm'>
							{statistics?.averageKills.toFixed(2)} / {statistics?.averageDeaths.toFixed(2)} /{' '}
							{statistics?.averageAssists.toFixed(2)}
						</Text>
					</Group>
				</Group>
			</Stack>
		</Group>
	);
};
