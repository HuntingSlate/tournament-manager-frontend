import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, Title, Input, PasswordInput, Button, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconMail, IconLock, IconUser } from '@tabler/icons-react';
import { type FC } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { z } from 'zod';

import { HeaderLogo } from '@/src/components/layouts/MainLayout/components/Header/components/HeaderLogo';
import { RoutePaths } from '@/src/models/enums/RoutePaths';
import * as classes from '@/src/pages/Register/register.css';
import { useRegisterMutation } from '@/src/pages/Register/register.utils';

const registerSchema = z.object({
	email: z
		.email({ message: 'Please enter a valid email' })
		.max(40, { message: 'Email must not exceed 40 characters' }),
	nickname: z
		.string()
		.min(3, { message: 'Username must be at least 3 characters' })
		.max(20, { message: 'Username must not exceed 20 characters' }),
	password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export const Register: FC = () => {
	const [visible, { toggle }] = useDisclosure(false);
	const { mutate, isPending, error } = useRegisterMutation();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormValues>({
		resolver: zodResolver(registerSchema),
	});

	const handleRegister = (data: RegisterFormValues) => {
		mutate(data);
	};

	return (
		<Stack className={classes.registerPageStyle}>
			<HeaderLogo withLink={false} />
			<form onSubmit={handleSubmit(handleRegister)}>
				<Stack className={classes.registerFormContainerStyle}>
					<Stack style={{ gap: 4 }}>
						<Title order={3} style={{ textAlign: 'center' }}>
							Register
						</Title>
						<Text size='sm' style={{ textAlign: 'center' }}>
							Create a new account to get started
						</Text>
					</Stack>
					<Stack style={{ gap: 10 }}>
						<Input.Wrapper
							label='Username'
							style={{ width: '100%' }}
							size='xs'
							error={errors.nickname?.message}
						>
							<Input
								leftSection={<IconUser size={15} />}
								placeholder='Enter your username'
								size='sm'
								{...register('nickname')}
							/>
						</Input.Wrapper>
						<Input.Wrapper
							label='Email'
							style={{ width: '100%' }}
							size='xs'
							error={errors.email?.message}
						>
							<Input
								leftSection={<IconMail size={15} />}
								placeholder='Enter your email'
								size='sm'
								{...register('email')}
							/>
						</Input.Wrapper>
						<Input.Wrapper
							label='Password'
							style={{ width: '100%' }}
							size='xs'
							error={errors.password?.message}
						>
							<PasswordInput
								visible={visible}
								placeholder='Enter your password'
								onVisibilityChange={toggle}
								leftSection={<IconLock size={15} />}
								size='sm'
								{...register('password')}
							/>
						</Input.Wrapper>
					</Stack>
					<Button style={{ width: '100%' }} type='submit' loading={isPending}>
						Register
					</Button>
					{error && (
						<Text c='red' size='xs' ta='center'>
							{error.message}
						</Text>
					)}
				</Stack>
			</form>
			<Text size='xs'>
				Already have an account? <Link to={RoutePaths.Login}>Log in</Link>
			</Text>
		</Stack>
	);
};
