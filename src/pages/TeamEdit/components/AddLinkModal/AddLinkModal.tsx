import type { FC } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Group, Input, InputWrapper, Modal, Stack } from '@mantine/core';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';

import { useCreateTeamLinkMutation } from '@/src/api/mutations/teamMutations';

type AddLinkModalProps = {
	isOpen: boolean;
	onClose: () => void;
	teamId: number;
};

const addTeamLinkSchema = z.object({
	url: z.url().min(1, { message: 'Link is required' }),
	type: z.string().min(1, { message: 'Platform is required' }),
	platformUsername: z.string().min(1, { message: 'Platform username is required' }),
});

type AddTeamLinkValues = z.infer<typeof addTeamLinkSchema>;

export const AddLinkModal: FC<AddLinkModalProps> = ({ isOpen, onClose, teamId }) => {
	const { mutate, isPending } = useCreateTeamLinkMutation();

	const methods = useForm<AddTeamLinkValues>({
		resolver: zodResolver(addTeamLinkSchema),
	});

	const handleCancel = () => {
		methods.reset();
		onClose();
	};

	const onSubmit = (data: AddTeamLinkValues) => {
		mutate(
			{ teamId, link: { ...data } },
			{
				onSuccess: () => {
					onClose();
					methods.reset();
				},
			}
		);
	};

	return (
		<Modal
			opened={isOpen}
			onClose={handleCancel}
			centered
			title='Add Team Link'
			styles={{
				title: {
					fontWeight: 700,
					fontSize: '1.25rem',
				},
			}}
		>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmit)}>
					<Stack gap={8}>
						<InputWrapper label='Platform' size='xs' error={methods.formState.errors.type?.message}>
							<Input type='Type platform...' {...methods.register('type')} />
						</InputWrapper>
						<InputWrapper
							label='Username'
							size='xs'
							error={methods.formState.errors.platformUsername?.message}
						>
							<Input placeholder='Type username...' {...methods.register('platformUsername')} />
						</InputWrapper>
						<InputWrapper label='URL' size='xs' error={methods.formState.errors.url?.message}>
							<Input placeholder='Type url...' {...methods.register('url')} />
						</InputWrapper>
						<Group wrap='nowrap' w='100%'>
							<Button type='submit' variant='filled' color='blue' loading={isPending} w='75%'>
								Create
							</Button>
							<Button variant='default' color='black' onClick={handleCancel} w='25%'>
								Cancel
							</Button>
						</Group>
					</Stack>
				</form>
			</FormProvider>
		</Modal>
	);
};
