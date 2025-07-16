import { zodResolver } from '@hookform/resolvers/zod';
import { Modal, Stack, InputWrapper, Group, Button, Input } from '@mantine/core';
import { useEffect, type FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';

import type { Game } from '@/src/api/game';
import { useUpdateGameMutation } from '@/src/pages/Games/components/EditGameModal/editGameModal.utils';

type EditGameModalProps = {
	isOpen: boolean;
	onClose: () => void;
	game: Game;
};

const updateGameLinkSchema = z.object({
	name: z
		.string()
		.min(1, { message: 'Game name is required' })
		.max(50, { message: 'Game name cannot exceed 50 characters' }),
});

type UpdateGameValues = z.infer<typeof updateGameLinkSchema>;

export const EditGameModal: FC<EditGameModalProps> = ({ isOpen, onClose, game }) => {
	const { mutate, isPending } = useUpdateGameMutation();

	const methods = useForm<UpdateGameValues>({
		resolver: zodResolver(updateGameLinkSchema),
	});

	useEffect(() => {
		if (game) {
			methods.reset({
				name: game.name,
			});
		}
	}, [game, methods]);

	const handleUpdateGame = (gameName: string) => {
		mutate({ gameId: game.id, gameName }, {});
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
			title='Update Game'
			styles={{
				title: {
					fontWeight: 700,
					fontSize: '1.25rem',
				},
			}}
		>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit((data) => handleUpdateGame(data.name))}>
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
