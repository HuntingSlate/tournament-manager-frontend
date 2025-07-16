import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, Group, Button, InputWrapper, Input, Text } from '@mantine/core';
import { useEffect, type FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';

import {
	useGetUserProfileQuery,
	useUpdateProfileInformationMutation,
} from '@/src/api/mutations/userMutations';
import { vars } from '@/src/theme';

const profileInformationDetailsSchema = z.object({
	email: z
		.email({ message: 'Please enter a valid email' })
		.max(40, { message: 'Email must not exceed 40 characters' }),
	nickname: z
		.string()
		.min(3, { message: 'Username must be at least 3 characters' })
		.max(20, { message: 'Username must not exceed 20 characters' }),
	fullName: z.string().max(50, { message: 'Full name must not exceed 50 characters' }),
});

type ProfileInformationFormValues = z.infer<typeof profileInformationDetailsSchema>;

export const ProfileInformation: FC = () => {
	const { data, isLoading } = useGetUserProfileQuery();
	const { mutate, isPending } = useUpdateProfileInformationMutation();

	const methods = useForm<ProfileInformationFormValues>({
		resolver: zodResolver(profileInformationDetailsSchema),
	});

	useEffect(() => {
		if (data) {
			methods.reset({
				fullName: data.fullName,
				nickname: data.nickname,
				email: data.email,
			});
		}
	}, [data, methods]);

	const onCancelClick = () => methods.reset();

	const onSubmit = (data: ProfileInformationFormValues) => {
		mutate({ ...data }, { onSuccess: () => methods.reset() });
	};

	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(onSubmit)}>
				<Stack p={24} bdrs={4} bg={vars.colors.white} bd='1px solid #ced4de'>
					<Group w='100%' justify='space-between'>
						<Text size='lg' fw={500}>
							Information
						</Text>
						<Group gap={8}>
							<Button variant='light' color='blue' onClick={onCancelClick}>
								Reset
							</Button>
							<Button
								variant='light'
								color='green'
								type='submit'
								loading={isPending}
								disabled={!methods.formState.isDirty || isLoading}
							>
								Submit
							</Button>
						</Group>
					</Group>
					<Stack>
						<Group w='100%' wrap='nowrap'>
							<InputWrapper
								label='Nickname'
								w='100%'
								size='sm'
								error={methods.formState.errors.nickname?.message}
							>
								<Input
									placeholder='Enter your nickname'
									{...methods.register('nickname')}
									size='md'
								/>
							</InputWrapper>
							<InputWrapper label='Email' size='sm' w='100%'>
								<Input
									placeholder='Enter your email'
									size='md'
									readOnly
									{...methods.register('email')}
								/>
							</InputWrapper>
						</Group>
						<InputWrapper
							label='Full Name'
							size='sm'
							w='100%'
							error={methods.formState.errors.fullName?.message}
						>
							<Input
								placeholder='Enter your full name'
								size='md'
								{...methods.register('fullName')}
							/>
						</InputWrapper>
					</Stack>
				</Stack>
			</form>
		</FormProvider>
	);
};
