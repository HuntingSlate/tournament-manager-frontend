import type { FC } from 'react';

import { Button, Flex, Group, Stack, Text } from '@mantine/core';
import { IconCrown, IconUser } from '@tabler/icons-react';

import { useRemoveMemberFromTeamMutation } from '@/src/api/mutations/teamMutations';
import { vars } from '@/src/theme';

type TeamMemberProps = {
	userId: number;
	userNickname: string;
	startDate: string;
	endDate?: string;
	isLeader: boolean;
	teamId: number;
};

export const TeamMember: FC<TeamMemberProps> = ({
	userId,
	userNickname,
	startDate,
	teamId,
	isLeader = false,
}) => {
	const { mutate, isPending } = useRemoveMemberFromTeamMutation();

	const handleRemoveMember = () => {
		mutate({ teamId, userId });
	};

	return (
		<Group
			style={{
				padding: 16,
				borderRadius: 4,
				backgroundColor: vars.colors.white,
				border: '1px solid #ced4de',
				justifyContent: 'space-between',
			}}
		>
			<Group gap={12}>
				<Flex style={{ padding: 8, backgroundColor: vars.colors.blue[1], borderRadius: '50%' }}>
					<IconUser size={20} />
				</Flex>
				<Stack gap={0}>
					<Group gap={6}>
						<Text size='md' fw={600}>
							{userNickname}
						</Text>
						{isLeader && <IconCrown size={20} color={vars.colors.yellow[5]} />}
					</Group>
					<Group gap={6}>
						<Text size='xs' fw={500}>
							Joined:
						</Text>
						<Text size='xs'>{startDate}</Text>
					</Group>
				</Stack>
			</Group>
			<Button
				variant='subtle'
				color='red'
				size='sm'
				loading={isPending}
				onClick={handleRemoveMember}
				disabled={!!isLeader}
			>
				Delete
			</Button>
		</Group>
	);
};
