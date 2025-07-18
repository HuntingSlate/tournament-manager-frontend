import { Button, Group, InputWrapper, Loader, Modal, Select, Stack, Text } from '@mantine/core';
import { useMemo, useState, type FC } from 'react';
import { useParams } from 'react-router';

import { useApplyToTournamentMutation } from '@/src/api/mutations/tournamentMutations';
import { useGetUserProfileQuery } from '@/src/api/mutations/userMutations';

type JoinTournamentModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

export const JoinTournamentModal: FC<JoinTournamentModalProps> = ({ isOpen, onClose }) => {
	const { id } = useParams<{ id: string }>();
	const { data, isLoading } = useGetUserProfileQuery();
	const { mutate, isPending } = useApplyToTournamentMutation();

	const [selectedId, setSelectedId] = useState<string | null>(null);

	const leaderTeams = useMemo(() => {
		if (!data || !data.teams) {
			return [];
		}

		return data.teams.filter((team) => team.leaderId === data.id);
	}, [data]);

	const selectData = useMemo(
		() =>
			leaderTeams.map((team) => ({
				value: team.id.toString(),
				label: team.name,
			})),
		[leaderTeams]
	);

	const handleClose = () => {
		onClose();
	};

	const handleJoinTournament = () => {
		if (!selectedId) return;
		mutate(
			{
				tournamentId: Number(id),
				teamId: Number(selectedId),
			},
			{
				onSuccess: () => {
					onClose();
				},
			}
		);
	};

	return (
		<Modal
			opened={isOpen}
			onClose={onClose}
			centered
			title='Join Tournament'
			styles={{
				title: {
					fontWeight: 700,
					fontSize: '1.25rem',
				},
			}}
		>
			<Stack gap={8}>
				<Text size='md'>Select one of your teams to join the tournament.</Text>
				<InputWrapper size='sm' label='Team'>
					<Select
						style={{ zIndex: 9999 }}
						size='md'
						searchable
						placeholder={isLoading ? 'Loading teams...' : 'Select your team'}
						data={selectData}
						value={selectedId}
						onChange={setSelectedId}
						disabled={isLoading || isPending}
						rightSection={isLoading ? <Loader size={16} /> : null}
						nothingFoundMessage='You are not a leader of any team.'
					/>
				</InputWrapper>
				<Group gap={8} w='100%' wrap='nowrap'>
					<Button
						variant='filled'
						color='blue'
						w={'75%'}
						onClick={handleJoinTournament}
						loading={isPending}
					>
						Join Tournament
					</Button>
					<Button variant='default' color='black' w={'25%'} onClick={handleClose}>
						Cancel
					</Button>
				</Group>
			</Stack>
		</Modal>
	);
};
