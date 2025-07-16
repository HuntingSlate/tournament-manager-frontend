import type { FC } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Group, Input, InputWrapper, Modal, Stack } from '@mantine/core';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';

import { useAddProfileLinkMutation } from '@/src/api/mutations/userMutations';

type AddProfileLinkModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

const addPlayerLinkSchema = z.object({
	url: z.url().min(1, { message: 'Link is required' }),
	type: z.string().min(1, { message: 'Platform is required' }),
	platformUsername: z.string().optional(),
});

type AddPlayerLinkValues = z.infer<typeof addPlayerLinkSchema>;

export const AddProfileLinkModal: FC<AddProfileLinkModalProps> = ({ isOpen, onClose }) => {
	const { mutate, isPending } = useAddProfileLinkMutation();

	const methods = useForm<AddPlayerLinkValues>({
		resolver: zodResolver(addPlayerLinkSchema),
	});

	const handleCancel = () => {
		methods.reset();
		onClose();
	};

	const onSubmit = (data: AddPlayerLinkValues) => {
		mutate(data, {
			onSuccess: () => {
				onClose();
				methods.reset();
			},
		});
	};

	return (
		<Modal
			opened={isOpen}
			onClose={handleCancel}
			centered
			title='Add Profile Link'
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
