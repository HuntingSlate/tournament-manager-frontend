import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, PasswordInput, Stack, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconLock, IconMail } from '@tabler/icons-react';
import { type FC } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import z from 'zod';

import { useLoginMutation } from '@/src/api/mutations/authMutations';
import { HeaderLogo } from '@/src/components/layouts/MainLayout/components/Header/components/HeaderLogo';
import { RoutePaths } from '@/src/models/enums/RoutePaths';
import * as classes from '@/src/pages/Login/login.css';

const loginSchema = z.object({
	email: z
		.email({ message: 'Please enter a valid email' })
		.max(40, { message: 'Email must not exceed 40 characters' }),
	password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const Login: FC = () => {
	const [visible, { toggle }] = useDisclosure(false);
	const { mutate, isPending } = useLoginMutation();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
	});

	const handleLogin = (data: LoginFormValues) => {
		mutate(data);
	};

	return (
		<Stack className={classes.loginPageStyle}>
			<HeaderLogo />
			<form onSubmit={handleSubmit(handleLogin)}>
				<Stack className={classes.loginFormContainerStyle}>
					<Stack style={{ gap: 4 }}>
						<Title order={3} style={{ textAlign: 'center' }}>
							Log In
						</Title>
						<Text size='sm' style={{ textAlign: 'center' }}>
							Enter your credentials to access your account
						</Text>
					</Stack>
					<Stack style={{ gap: 10 }}>
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
						Login
					</Button>
				</Stack>
			</form>
			<Text size='xs'>
				Don't have an account? <Link to={RoutePaths.Register}>Create one</Link>
			</Text>
		</Stack>
	);
};
