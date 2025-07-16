import type { FC } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Modal, Stack, InputWrapper, Input, Group, Button } from '@mantine/core';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';

import { useUpdateProfileLinkMutation } from '@/src/api/mutations/userMutations';

type EditProfileLinkModalProps = {
	isOpen: boolean;
	onClose: () => void;
	link?: {
		id: number;
		url: string;
		type: string;
		platformUsername?: string;
	};
};

const editProfileLinkSchema = z.object({
	url: z.url().min(1, { message: 'Link is required' }),
	type: z.string().min(1, { message: 'Platform is required' }),
	platformUsername: z.string().optional(),
});

type EditProfileLinkValues = z.infer<typeof editProfileLinkSchema>;

export const EditProfileLinkModal: FC<EditProfileLinkModalProps> = ({ isOpen, onClose, link }) => {
	const { mutate, isPending } = useUpdateProfileLinkMutation();

	const methods = useForm<EditProfileLinkValues>({
		resolver: zodResolver(editProfileLinkSchema),
	});

	useEffect(() => {
		if (link) {
			methods.reset({
				type: link.type,
				url: link.url,
				platformUsername: link.platformUsername,
			});
		}
	}, [link, methods]);

	const handleCancel = () => {
		methods.reset();
		onClose();
	};

	const handleSubmit = (data: EditProfileLinkValues) => {
		if (!link) return;

		mutate(
			{ linkId: link.id, linkData: data },
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
			title='Add Profile Link'
			styles={{
				title: {
					fontWeight: 700,
					fontSize: '1.25rem',
				},
			}}
		>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(handleSubmit)}>
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
								Update
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
