import type { FC } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Group, Input, InputWrapper, Modal, Select, Stack } from '@mantine/core';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import z from 'zod';

import { useGamesQuery } from '@/src/pages/Games/games.utils';
import { useCreateTeamMutation } from '@/src/pages/Teams/components/CreateTeamModal/createTeamModal.utils';

type CreateTeamModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

type CreateTeamSubmissionData = {
	teamName: string;
	gameId: number;
};

const createTeamSchema = z.object({
	teamName: z
		.string()
		.min(1, { message: 'Team name is required' })
		.max(255, { message: 'Team name must not exceed 255 characters' }),
	gameId: z.string().min(1, { message: 'You must select a game.' }),
});

type CreateTeamFormValues = z.infer<typeof createTeamSchema>;

export const CreateTeamModal: FC<CreateTeamModalProps> = ({ isOpen, onClose }) => {
	const { data, isLoading } = useGamesQuery();
	const { mutate, isPending } = useCreateTeamMutation();

	const methods = useForm<CreateTeamFormValues>({
		resolver: zodResolver(createTeamSchema),
		defaultValues: {
			teamName: '',
			gameId: '',
		},
	});

	const onSubmit = (data: CreateTeamFormValues) => {
		const submissionData: CreateTeamSubmissionData = {
			...data,
			gameId: Number(data.gameId),
		};

		mutate(submissionData, {
			onSuccess: () => {
				methods.reset();
				onClose();
			},
		});
	};

	const handleCancel = () => {
		methods.reset();
		onClose();
	};

	const selectData =
		data?.map((game) => ({
			value: game.id.toString(),
			label: game.name,
		})) || [];

	return (
		<Modal
			opened={isOpen}
			onClose={handleCancel}
			title='Create Team'
			styles={{
				title: {
					fontWeight: 700,
					fontSize: '1.25rem',
				},
			}}
			centered
		>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmit)}>
					<Stack style={{ gap: 10 }}>
						<InputWrapper
							label='Team Name'
							size='xs'
							error={methods.formState.errors.teamName?.message}
						>
							<Input placeholder='Type team name' size='sm' {...methods.register('teamName')} />
						</InputWrapper>
						<Controller
							name='gameId'
							control={methods.control}
							render={({ field, fieldState }) => (
								<InputWrapper size='xs' label='Game' error={fieldState.error?.message}>
									<Select
										placeholder='Select a game'
										data={selectData}
										disabled={isLoading}
										searchable
										size='sm'
										{...field}
									/>
								</InputWrapper>
							)}
						/>
						<Group style={{ width: '100%', flexWrap: 'nowrap', paddingTop: 16 }}>
							<Button onClick={handleCancel} color='blue' style={{ width: '100%' }}>
								Cancel
							</Button>
							<Button type='submit' loading={isPending} color='green' style={{ width: '100%' }}>
								Save
							</Button>
						</Group>
					</Stack>
				</form>
			</FormProvider>
		</Modal>
	);
};
