import { Button, Group, InputWrapper, Loader, Modal, Select, Stack, Text } from '@mantine/core';
import { useMemo, useState, type FC } from 'react';

import {
	useAddMemberToTeamMutation,
	useGetTeamDetailsQuery,
} from '@/src/api/mutations/teamMutations';
import { useProfileSearchQuery } from '@/src/api/mutations/userMutations';

type AddMemberModalProps = {
	isOpen: boolean;
	onClose: () => void;
	teamId: number;
};

export const AddMemberModal: FC<AddMemberModalProps> = ({ isOpen, onClose, teamId }) => {
	const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

	const { data, isLoading } = useProfileSearchQuery('');
	const { data: teamData, isLoading: isTeamLoading } = useGetTeamDetailsQuery(teamId.toString());
	const { mutate, isPending } = useAddMemberToTeamMutation();

	const existingMemberIds = useMemo(() => {
		if (!teamData) return new Set();
		const memberIds = new Set(teamData.teamMembers.map((member) => member.userId));
		memberIds.add(teamData.leaderId);
		return memberIds;
	}, [teamData]);

	const userSelectData = useMemo(() => {
		if (!data) return [];
		return data
			.filter((user) => !existingMemberIds.has(user.id))
			.map((user) => ({
				value: user.id.toString(),
				label: user.nickname,
			}));
	}, [data, existingMemberIds]);

	const handleClose = () => {
		setSelectedUserId(null);
		onClose();
	};

	const handleAddMember = () => {
		if (!selectedUserId) return;

		mutate(
			{ teamId, userId: Number(selectedUserId) },
			{
				onSuccess: () => {
					handleClose();
				},
			}
		);
	};

	return (
		<Modal
			opened={isOpen}
			onClose={onClose}
			centered
			title='Add Member'
			styles={{
				title: {
					fontWeight: 700,
					fontSize: '1.25rem',
				},
			}}
		>
			<Stack gap={8}>
				<Text size='md'>Search for a user to add them to the team.</Text>
				<InputWrapper label='Nickname' size='sm'>
					<Select
						placeholder='Type user nickname'
						size='md'
						searchable
						value={selectedUserId}
						onChange={setSelectedUserId}
						data={userSelectData}
						rightSection={isLoading || isTeamLoading ? <Loader size={16} /> : null}
						disabled={isLoading || isTeamLoading}
					/>
				</InputWrapper>
				<Group gap={8} w='100%' wrap='nowrap'>
					<Button
						variant='filled'
						color='blue'
						w={'75%'}
						onClick={handleAddMember}
						loading={isPending}
					>
						Add Member
					</Button>
					<Button variant='default' color='black' w={'25%'} onClick={handleClose}>
						Cancel
					</Button>
				</Group>
			</Stack>
		</Modal>
	);
};
