import { ActionIcon, Group, Stack, Text } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { IconEdit, IconNote } from '@tabler/icons-react';
import { type FC } from 'react';

type ProfileLinkProps = {
	link: {
		id: number;
		platformUsername?: string;
		url: string;
		type: string;
	};
	onClick?: (link: { id: number; platformUsername?: string; url: string; type: string }) => void;
};

export const ProfileLink: FC<ProfileLinkProps> = ({ link, onClick }) => {
	const clipboard = useClipboard({ timeout: 500 });

	return (
		<Group
			style={{
				width: '100%',
				justifyContent: 'space-between',
				border: '1px solid #ced4da',
				borderRadius: 4,
				padding: 16,
			}}
		>
			<Stack style={{ gap: 0 }}>
				<Text size='md' fw={700}>
					{link.type}
				</Text>
				<Text size='xs' fw={500}>
					{link.platformUsername}
				</Text>
				<Text size='xs'>{link.url}</Text>
			</Stack>
			<Group style={{ gap: 8 }}>
				<ActionIcon
					variant='light'
					size='md'
					color='green'
					onClick={() => clipboard.copy(link.url)}
				>
					<IconNote size={20} />
				</ActionIcon>
				<ActionIcon variant='light' onClick={() => onClick?.(link)}>
					<IconEdit size={20} />
				</ActionIcon>
			</Group>
		</Group>
	);
};
