import { zodResolver } from '@hookform/resolvers/zod';
import { Group, Input, InputWrapper, PasswordInput, Stack, Text, Title } from '@mantine/core';
import { useState, type FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';

import { ProfileFormButtons } from '@/src/pages/Profile/components/ProfileFormButtons';
import { useUpdateProfilePasswordMutation } from '@/src/pages/Profile/components/ProfilePassword/profilePassword.utils';

const passwordSchema = z
	.object({
		currentPassword: z.string().min(6, 'Password is too short'),
		newPassword: z.string().min(6, 'Password is too short'),
	})
	.refine((data) => data.currentPassword !== data.newPassword, {
		message: 'Passwords must be different',
		path: ['newPassword'],
	});

type PasswordFormValues = z.infer<typeof passwordSchema>;

export const ProfilePassword: FC = () => {
	const [isEditMode, setEditMode] = useState(false);

	const { mutate, isPending, error } = useUpdateProfilePasswordMutation();

	const methods = useForm<PasswordFormValues>({
		resolver: zodResolver(passwordSchema),
		defaultValues: { currentPassword: '', newPassword: '' },
	});

	const onSubmit = (data: PasswordFormValues) => {
		mutate(data, {
			onSuccess: () => {
				setEditMode(false);
				methods.reset();
			},
		});
	};

	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(onSubmit)}>
				<Stack style={{ gap: 24 }}>
					<Group style={{ justifyContent: 'space-between' }}>
						<Title order={2}>Password</Title>
						<ProfileFormButtons
							isEditMode={isEditMode}
							onEditClick={() => setEditMode(true)}
							onCancelClick={() => {
								setEditMode(false);
								methods.reset();
							}}
							isLoading={isPending}
						/>
					</Group>
					<Stack style={{ gap: 16 }}>
						{isEditMode ? (
							<Stack>
								<InputWrapper label='Current Password' size='sm'>
									<PasswordInput
										size='md'
										placeholder='Enter your current password'
										{...methods.register('currentPassword')}
										error={methods.formState.errors.currentPassword?.message}
									/>
								</InputWrapper>
								<InputWrapper label='New Password' size='sm'>
									<PasswordInput
										size='md'
										placeholder='Enter your new password'
										{...methods.register('newPassword')}
										error={methods.formState.errors.newPassword?.message}
									/>
								</InputWrapper>
							</Stack>
						) : (
							<InputWrapper label='Password' size='sm'>
								<Input value='********************' variant='unstyled' readOnly size='md' />
							</InputWrapper>
						)}
						{error && <Text color='red'>{error.message}</Text>}
					</Stack>
				</Stack>
			</form>
		</FormProvider>
	);
};
