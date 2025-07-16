import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Group, Input, InputWrapper, Modal, Stack } from '@mantine/core';
import { useEffect, type FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';

import type { TeamLink } from '@/src/api/team';
import { useUpdateTeamLinkMutation } from '@/src/pages/TeamEdit/teamEdit.utils';

type EditLinkModalProps = {
	isOpen: boolean;
	onClose: () => void;
	teamId: number;
	link: TeamLink | null;
};

const editTeamLinkSchema = z.object({
	url: z.url().min(1, { message: 'Link is required' }),
	type: z.string().min(1, { message: 'Platform is required' }),
	platformUsername: z.string().min(1, { message: 'Platform username is required' }),
});

type EditTeamLinkValues = z.infer<typeof editTeamLinkSchema>;

export const EditLinkModal: FC<EditLinkModalProps> = ({ isOpen, onClose, teamId, link }) => {
	const { mutate, isPending } = useUpdateTeamLinkMutation();

	const methods = useForm<EditTeamLinkValues>({
		resolver: zodResolver(editTeamLinkSchema),
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

	const onSubmit = (data: EditTeamLinkValues) => {
		if (!link) return;

		mutate(
			{ teamId, linkId: link.id, link: { ...data } },
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
			title='Edit Team Link'
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
								Edit
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
