import type { FC } from 'react';

import { Group, Flex, Stack, Text, ActionIcon } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { IconExternalLink, IconLink } from '@tabler/icons-react';

import { vars } from '@/src/theme';

type ProfileLinkProps = {
	type?: string;
	url?: string;
	platformUsername?: string;
};

export const ProfileLink: FC<ProfileLinkProps> = ({ type, url, platformUsername }) => {
	const clipboard = useClipboard({ timeout: 500 });

	return (
		<Group p={16} bdrs={4} bg={vars.colors.white} bd='1px solid #ced4de' justify='space-between'>
			<Group gap={12}>
				<Flex style={{ padding: 8, backgroundColor: vars.colors.gray[4], borderRadius: '50%' }}>
					<IconLink size={20} />
				</Flex>
				<Stack gap={0}>
					<Group>
						<Text size='md' fw={600}>
							{platformUsername ? `${type} - ${platformUsername}` : type}
						</Text>
					</Group>
					<Text size='xs'>{url}</Text>
				</Stack>
			</Group>
			<ActionIcon
				variant='subtle'
				size='md'
				color={vars.colors.gray[7]}
				onClick={() => clipboard.copy(url)}
			>
				<IconExternalLink size={16} />
			</ActionIcon>
		</Group>
	);
};
