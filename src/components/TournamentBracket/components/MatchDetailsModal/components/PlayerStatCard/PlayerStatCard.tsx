import type { DefaultMantineColor, StyleProp } from '@mantine/core';
import type { FC } from 'react';

import { Group, Text } from '@mantine/core';
import { IconShield, IconSword, IconTarget, IconUser } from '@tabler/icons-react';

import type { MatchStatistics } from '@/src/api/match';
import { vars } from '@/src/theme';

type PlayerStatCardProps = {
	player: MatchStatistics;
	bg: StyleProp<DefaultMantineColor>;
};

export const PlayerStatCard: FC<PlayerStatCardProps> = ({ player, bg }) => {
	return (
		<Group bg={bg} p={12} bdrs={4} gap={4} w='100%' justify='space-between'>
			<Group gap={6}>
				<IconUser size={16} />
				<Text size='sm' fw={500}>
					{player.playerNickname}
				</Text>
			</Group>
			<Group w='130px' style={{ justifySelf: 'flex-end' }}>
				<Group gap={4}>
					<IconSword size={14} color={vars.colors.green[8]} />
					<Text size='xs' color={vars.colors.green[8]}>
						{player.kills}
					</Text>
				</Group>
				<Group gap={4}>
					<IconTarget size={14} color={vars.colors.red[8]} />
					<Text size='xs' color={vars.colors.red[8]}>
						{player.deaths}
					</Text>
				</Group>
				<Group gap={4}>
					<IconShield size={14} color={vars.colors.blue[8]} />
					<Text size='xs' color={vars.colors.blue[8]}>
						{player.assists}
					</Text>
				</Group>
			</Group>
		</Group>
	);
};
