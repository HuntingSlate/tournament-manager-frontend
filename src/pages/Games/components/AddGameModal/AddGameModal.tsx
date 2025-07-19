import { zodResolver } from '@hookform/resolvers/zod';
import { Modal, Stack, InputWrapper, Group, Button, Input } from '@mantine/core';
import { type FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';

import { useAddGameMutation } from '@/src/api/mutations/gameMutations';

type AddGameModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

const updateGameLinkSchema = z.object({
	name: z
		.string()
		.min(1, { message: 'Game name is required' })
		.max(50, { message: 'Game name cannot exceed 50 characters' }),
});

type AddGameValues = z.infer<typeof updateGameLinkSchema>;

export const AddGameModal: FC<AddGameModalProps> = ({ isOpen, onClose }) => {
	const { mutate, isPending } = useAddGameMutation();

	const methods = useForm<AddGameValues>({
		resolver: zodResolver(updateGameLinkSchema),
		defaultValues: {
			name: '',
		},
	});

	const onSubmit = (data: AddGameValues) => {
		mutate(data.name, {
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

	return (
		<Modal
			opened={isOpen}
			onClose={handleCancel}
			centered
			title='Create Game'
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
						<InputWrapper
							label='Game Name'
							size='sm'
							error={methods.formState.errors.name?.message}
						>
							<Input placeholder='Enter game name' {...methods.register('name')} />
						</InputWrapper>
						<Group gap={8} w='100%' wrap='nowrap'>
							<Button type='submit' variant='filled' color='blue' w={'75%'} loading={isPending}>
								Update
							</Button>
							<Button variant='default' color='black' w={'25%'} onClick={handleCancel}>
								Cancel
							</Button>
						</Group>
					</Stack>
				</form>
			</FormProvider>
		</Modal>
	);
};
