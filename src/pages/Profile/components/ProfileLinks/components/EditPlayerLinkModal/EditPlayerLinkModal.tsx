import type { FC } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Group, Input, InputWrapper, Modal, Stack } from '@mantine/core';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';

import {
	useRemoveProfileLinkMutation,
	useUpdateProfileLinkMutation,
} from '@/src/pages/Profile/components/ProfileLinks/profileLinks.utils';

type EditPlayerLinkModalProps = {
	isOpen: boolean;
	onCancel?: () => void;
	link: {
		id: number;
		platformUsername?: string;
		url: string;
		type: string;
	};
};

const updatePlayerLinkSchema = z.object({
	url: z.url().min(1, { message: 'Link is required' }),
	type: z.string().min(1, { message: 'Platform is required' }),
	platformUsername: z.string().optional(),
});

type UpdatePlayerLinkValues = z.infer<typeof updatePlayerLinkSchema>;

export const EditPlayerLinkModal: FC<EditPlayerLinkModalProps> = ({ isOpen, link, onCancel }) => {
	const { mutate: updateMutate, isPending: updateIsPending } = useUpdateProfileLinkMutation();
	const { mutate: removeMutate, isPending: removeIsPending } = useRemoveProfileLinkMutation();

	const methods = useForm<UpdatePlayerLinkValues>({
		resolver: zodResolver(updatePlayerLinkSchema),
		defaultValues: {
			url: link.url,
			type: link.type,
			platformUsername: link.platformUsername || '',
		},
	});

	const onUpdate = (data: UpdatePlayerLinkValues) => {
		updateMutate({ linkId: link.id, linkData: data }, { onSuccess: () => onCancel?.() });
	};

	const onRemove = () => {
		removeMutate({ linkId: link.id }, { onSuccess: () => onCancel?.() });
	};

	const onClose = () => {
		methods.reset();
		onCancel?.();
	};

	return (
		<Modal
			opened={isOpen}
			centered
			onClose={onClose}
			title='Edit Media Link'
			styles={{
				title: {
					fontWeight: 700,
					fontSize: '1.25rem',
				},
			}}
		>
			<FormProvider {...methods}>
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
						<Button
							onClick={onRemove}
							color='red'
							loading={removeIsPending}
							style={{ width: '100%' }}
						>
							Remove
						</Button>
						<Button
							type='submit'
							loading={updateIsPending}
							color='green'
							onClick={methods.handleSubmit(onUpdate)}
							style={{ width: '100%' }}
						>
							Save
						</Button>
					</Group>
				</Stack>
			</FormProvider>
		</Modal>
	);
};
