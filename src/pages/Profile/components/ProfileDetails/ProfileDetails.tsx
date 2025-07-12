import { zodResolver } from '@hookform/resolvers/zod';
import { Group, Stack, Title } from '@mantine/core';
import { useEffect, useState, type FC } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import z from 'zod';

import { InputWithEdit } from '@/src/components/InputWithEdit';
import {
	useGetProfileDetailsMutation,
	useUpdateProfileDetailsMutation,
} from '@/src/pages/Profile/components/ProfileDetails/profileDetails.utils';
import { ProfileFormButtons } from '@/src/pages/Profile/components/ProfileFormButtons';

const profileDetailsSchema = z.object({
	email: z
		.email({ message: 'Please enter a valid email' })
		.max(40, { message: 'Email must not exceed 40 characters' }),
	nickname: z
		.string()
		.min(3, { message: 'Username must be at least 3 characters' })
		.max(20, { message: 'Username must not exceed 20 characters' }),
	fullName: z.string().max(50, { message: 'Full name must not exceed 50 characters' }),
});

type ProfileFormValues = z.infer<typeof profileDetailsSchema>;

export const ProfileDetails: FC = () => {
	const [isEditMode, setEditMode] = useState(false);
	const { data: profile } = useGetProfileDetailsMutation();
	const { mutate: updateProfile, isPending } = useUpdateProfileDetailsMutation();

	const methods = useForm<ProfileFormValues>({
		resolver: zodResolver(profileDetailsSchema),
		defaultValues: {
			fullName: 'No nickname provided',
		},
	});

	useEffect(() => {
		if (profile) {
			methods.reset({
				fullName: profile.fullName,
				nickname: profile.nickname,
				email: profile.email,
			});
		}
	}, [profile, methods]);

	const onSubmit = (data: ProfileFormValues) => {
		updateProfile(
			{
				fullName: data.fullName,
				nickname: data.nickname,
			},
			{
				onSuccess: () => {
					setEditMode(false);
				},
			}
		);
	};

	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(onSubmit)}>
				<Stack style={{ gap: 24 }}>
					<Group style={{ justifyContent: 'space-between' }}>
						<Title order={2}>Profile Details</Title>
						<ProfileFormButtons
							isEditMode={isEditMode}
							isLoading={isPending}
							onEditClick={() => {
								setEditMode(true);
								methods.clearErrors();
							}}
							onCancelClick={() => {
								setEditMode(false);
								methods.reset();
							}}
						/>
					</Group>
					<Stack style={{ gap: 16 }}>
						<InputWithEdit
							label='Email'
							name='email'
							placeholder='Enter your email'
							editable={false}
						/>
						<InputWithEdit
							label='Nickname'
							name='nickname'
							placeholder='Enter your nickname'
							editable={isEditMode}
						/>
						<InputWithEdit
							label='Full Name'
							name='fullName'
							placeholder='Enter your full name'
							editable={isEditMode}
						/>
					</Stack>
				</Stack>
			</form>
		</FormProvider>
	);
};
