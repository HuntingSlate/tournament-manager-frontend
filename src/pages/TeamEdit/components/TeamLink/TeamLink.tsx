import type { FC } from 'react';

import { Button, Flex, Group, Stack, Text } from '@mantine/core';
import { IconLink } from '@tabler/icons-react';

import { useDeleteTeamLinkMutation } from '@/src/api/mutations/teamMutations';
import { vars } from '@/src/theme';

type TeamLinkProps = {
	id: number;
	type: string;
	url: string;
	platformUsername?: string;
	teamId: number;
	onEditClick?: () => void;
};

export const TeamLink: FC<TeamLinkProps> = ({ id, teamId, type, url, onEditClick }) => {
	const { mutate, isPending } = useDeleteTeamLinkMutation();

	const handleDeleteLink = () => {
		mutate({ teamId, linkId: id });
	};

	return (
		<Group p={16} bdrs={4} bg={vars.colors.white} bd='1px solid #ced4de' justify='space-between'>
			<Group gap={12}>
				<Flex style={{ padding: 8, backgroundColor: vars.colors.gray[4], borderRadius: '50%' }}>
					<IconLink size={20} />
				</Flex>
				<Stack gap={0}>
					<Text size='md' fw={600}>
						{type}
					</Text>
					<Text size='xs'>{url}</Text>
				</Stack>
			</Group>
			<Group gap={10}>
				<Button variant='subtle' color='blue' size='sm' onClick={onEditClick}>
					Edit
				</Button>
				<Button
					variant='subtle'
					color='red'
					size='sm'
					onClick={handleDeleteLink}
					loading={isPending}
				>
					Delete
				</Button>
			</Group>
		</Group>
	);
};
