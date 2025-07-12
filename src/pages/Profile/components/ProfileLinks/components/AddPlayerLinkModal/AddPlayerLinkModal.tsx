import type { FC } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Group, Input, InputWrapper, Modal, Stack } from '@mantine/core';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';

import { useAddProfileLinkMutation } from '@/src/pages/Profile/components/ProfileLinks/profileLinks.utils';

type EditPlayerLinkModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

const addPlayerLinkSchema = z.object({
	url: z.url().min(1, { message: 'Link is required' }),
	type: z.string().min(1, { message: 'Platform is required' }),
	platformUsername: z.string().optional(),
});

type AddPlayerLinkValues = z.infer<typeof addPlayerLinkSchema>;

export const AddPlayerLinkModal: FC<EditPlayerLinkModalProps> = ({ isOpen, onClose }) => {
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
			centered
			onClose={handleCancel}
			title='Edit Media Link'
			styles={{
				title: {
					fontWeight: 700,
					fontSize: '1.25rem',
				},
			}}
		>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmit)}>
					<Stack style={{ gap: 16 }}>
						<InputWrapper label='Platform' size='sm' error={methods.formState.errors.type?.message}>
							<Input placeholder='Type platform' size='md' {...methods.register('type')} />
						</InputWrapper>
						<InputWrapper
							label='Username'
							size='sm'
							error={methods.formState.errors.platformUsername?.message}
						>
							<Input
								placeholder='Type username'
								size='md'
								{...methods.register('platformUsername')}
							/>
						</InputWrapper>
						<InputWrapper label='URL' size='sm' error={methods.formState.errors.url?.message}>
							<Input placeholder='Type link' size='md' {...methods.register('url')} />
						</InputWrapper>
						<Group style={{ width: '100%', flexWrap: 'nowrap' }}>
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
