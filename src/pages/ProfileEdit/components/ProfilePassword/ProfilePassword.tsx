import type { FC } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, Group, Button, InputWrapper, PasswordInput, Text } from '@mantine/core';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';

import { useUpdateProfilePasswordMutation } from '@/src/api/mutations/userMutations';
import { vars } from '@/src/theme';

const profilePasswordSchema = z
	.object({
		currentPassword: z.string().min(6, 'Password is too short'),
		newPassword: z.string().min(6, 'Password is too short'),
	})
	.refine((data) => data.currentPassword !== data.newPassword, {
		message: 'Passwords must be different',
		path: ['newPassword'],
	});

type ProfilePasswordFormValues = z.infer<typeof profilePasswordSchema>;

export const ProfilePassword: FC = () => {
	const { mutate, isPending } = useUpdateProfilePasswordMutation();

	const methods = useForm<ProfilePasswordFormValues>({
		resolver: zodResolver(profilePasswordSchema),
		defaultValues: {
			currentPassword: '',
			newPassword: '',
		},
	});

	const onSubmit = (data: ProfilePasswordFormValues) => {
		mutate(data, {
			onSuccess: () => {
				methods.reset();
			},
		});
	};

	const handleCancel = () => {
		methods.reset();
	};

	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(onSubmit)}>
				<Stack p={24} bdrs={4} bg={vars.colors.white} bd='1px solid #ced4de'>
					<Group w='100%' justify='space-between'>
						<Text size='lg' fw={500}>
							Password
						</Text>
						<Group gap={8}>
							<Button variant='light' color='blue' onClick={handleCancel}>
								Reset
							</Button>
							<Button
								variant='light'
								color='green'
								type='submit'
								loading={isPending}
								disabled={!methods.formState.isDirty}
							>
								Submit
							</Button>
						</Group>
					</Group>
					<Group w='100%' wrap='nowrap'>
						<InputWrapper
							label='Current Password'
							size='sm'
							w='100%'
							error={methods.formState.errors.currentPassword?.message}
						>
							<PasswordInput
								size='md'
								placeholder='Enter your current password'
								{...methods.register('currentPassword')}
							/>
						</InputWrapper>
						<InputWrapper
							label='New Password'
							size='sm'
							w='100%'
							error={methods.formState.errors.newPassword?.message}
						>
							<PasswordInput
								size='md'
								placeholder='Enter your new password'
								{...methods.register('newPassword')}
							/>
						</InputWrapper>
					</Group>
				</Stack>
			</form>
		</FormProvider>
	);
};
