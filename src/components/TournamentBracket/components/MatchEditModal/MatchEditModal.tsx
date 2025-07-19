import { zodResolver } from '@hookform/resolvers/zod';
import {
	Button,
	Checkbox,
	Flex,
	Group,
	Modal,
	NumberInput,
	Select,
	Stack,
	Text,
	Title,
} from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { IconClock, IconUsers } from '@tabler/icons-react';
import { useEffect, type FC } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import z from 'zod';

import type { Match, MatchStatus } from '@/src/api/match';
import { useUpdateMatchMutation } from '@/src/api/mutations/matchMutations';
import { MatchEditPlayerStats } from '@/src/components/TournamentBracket/components/MatchEditModal/components/MatchEditPlayerStats';
import { vars } from '@/src/theme';

const editMatchSchema = z.object({
	firstTeamScore: z.number().min(0, 'Score must be a non-negative number'),
	secondTeamScore: z.number().min(0, 'Score must be a non-negative number'),
	status: z.enum(['SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']),
	winningTeamId: z.string().nullable(),
	startDatetime: z.date(),
	endDatetime: z.date(),
});

const matchStatusOptions: { value: MatchStatus; label: string }[] = [
	{ value: 'SCHEDULED', label: 'Scheduled' },
	{ value: 'IN_PROGRESS', label: 'In Progress' },
	{ value: 'COMPLETED', label: 'Completed' },
	{ value: 'CANCELLED', label: 'Canceled' },
];

type MatchEditFormValues = z.infer<typeof editMatchSchema>;

type MatchEditModalProps = {
	isOpen: boolean;
	onClose: () => void;
	match: Match;
};

export const MatchEditModal: FC<MatchEditModalProps> = ({ isOpen, onClose, match }) => {
	const { mutate, isPending } = useUpdateMatchMutation();

	const methods = useForm<MatchEditFormValues>({
		resolver: zodResolver(editMatchSchema),
		defaultValues: {
			firstTeamScore: 0,
			secondTeamScore: 0,
			winningTeamId: null,
			status: 'SCHEDULED',
			startDatetime: new Date(),
			endDatetime: new Date(),
		},
	});

	useEffect(() => {
		if (match && isOpen) {
			methods.reset({
				firstTeamScore: match.firstTeamScore ?? 0,
				secondTeamScore: match.secondTeamScore ?? 0,
				status: match.status,
				winningTeamId: match.winningTeamId ? String(match.winningTeamId) : null,
				startDatetime: match.startDatetime ? new Date(match.startDatetime) : new Date(),
				endDatetime: match.endDatetime ? new Date(match.endDatetime) : new Date(),
			});
		}
	}, [match, isOpen, methods]);

	const onSubmit = (data: MatchEditFormValues) => {
		const updatedMatchData: Match = {
			...match,
			firstTeamScore: data.firstTeamScore,
			secondTeamScore: data.secondTeamScore,
			status: data.status,
			startDatetime: data.startDatetime,
			endDatetime: data.endDatetime,
			winningTeamId: data.winningTeamId ? Number(data.winningTeamId) : null,
		};
		mutate({ id: match.id, match: updatedMatchData });
	};

	const handleCancel = () => {
		methods.reset();
		onClose();
	};

	return (
		<Modal
			opened={isOpen}
			onClose={handleCancel}
			centered
			title='Edit Match Details'
			size='900px'
			styles={{
				title: {
					fontWeight: 700,
					fontSize: '1.25rem',
				},
			}}
		>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmit)}>
					<Stack w='100%' gap={16}>
						<Controller
							name='winningTeamId'
							control={methods.control}
							render={({ field }) => {
								const handleWinnerChange = (selectedTeamId: string) => {
									const currentWinner = field.value;
									field.onChange(currentWinner === selectedTeamId ? null : selectedTeamId);
								};

								return (
									<Group p={24} bdrs={4} bd='1px solid #ced4de' wrap='nowrap' w='100%'>
										<Group wrap='nowrap' w='100%' gap={8}>
											<Flex p={12} bg={vars.colors.blue[1]} bdrs='50%'>
												<IconUsers size={24} />
											</Flex>
											<Text style={{ textWrap: 'nowrap' }} size='lg' fw={500}>
												{match.firstTeamName}
											</Text>
										</Group>
										<Group wrap='nowrap' w='100%' justify='space-between' h='100%'>
											<Stack gap={4}>
												<Controller
													name='firstTeamScore'
													control={methods.control}
													render={({ field }) => (
														<NumberInput size='xl' w={100} min={0} {...field} />
													)}
												/>
												<Checkbox
													label='Winner?'
													checked={field.value === String(match.firstTeamId)}
													onChange={() => handleWinnerChange(String(match.firstTeamId))}
												/>
											</Stack>
											<Title order={1}>:</Title>
											<Stack gap={4} justify='flex-end' h='100%'>
												<Controller
													name='secondTeamScore'
													control={methods.control}
													render={({ field }) => (
														<NumberInput size='xl' w={100} min={0} {...field} />
													)}
												/>
												<Checkbox
													label='Winner?'
													checked={field.value === String(match.secondTeamId)}
													onChange={() => handleWinnerChange(String(match.secondTeamId))}
												/>
											</Stack>
										</Group>
										<Group wrap='nowrap' w='100%' gap={8} justify='flex-end'>
											<Text style={{ textWrap: 'nowrap' }} size='lg' fw={500}>
												{match.secondTeamName}
											</Text>
											<Flex p={12} bg={vars.colors.red[1]} bdrs='50%'>
												<IconUsers size={24} />
											</Flex>
										</Group>
									</Group>
								);
							}}
						/>
						<Stack p={24} bdrs={4} bd='1px solid #ced4de' w='100%'>
							<Group gap={8}>
								<IconClock size={18} />
								<Text size='md' fw={500}>
									Match Details
								</Text>
							</Group>
							<Group w='100%' wrap='nowrap'>
								<Controller
									name='startDatetime'
									control={methods.control}
									render={({ field }) => (
										<DateTimePicker
											w='100%'
											label='Start Date and Time'
											placeholder='Click to pick...'
											{...field}
										/>
									)}
								/>
								<Controller
									name='endDatetime'
									control={methods.control}
									render={({ field }) => (
										<DateTimePicker
											w='100%'
											label='End Date and Time'
											placeholder='Click to pick...'
											{...field}
										/>
									)}
								/>
								<Controller
									name='status'
									control={methods.control}
									render={({ field }) => (
										<Select w='100%' label='Match Status' data={matchStatusOptions} {...field} />
									)}
								/>
							</Group>
						</Stack>
						<Group w='100%' justify='flex-end' gap={10}>
							<Button variant='outline' color='red' onClick={() => methods.reset()}>
								Reset
							</Button>
							<Button variant='filled' color='green' type='submit' loading={isPending}>
								Update
							</Button>
						</Group>
					</Stack>
				</form>
			</FormProvider>
			<MatchEditPlayerStats
				matchId={match.id}
				firstTeamName={match.firstTeamName}
				secondTeamName={match.secondTeamName}
				firstTeamStats={match.firstTeamMatchStatistics}
				secondTeamStats={match.secondTeamMatchStatistics}
			/>
		</Modal>
	);
};
