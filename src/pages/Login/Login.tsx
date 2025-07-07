import type { FC } from 'react';

import { Button, Input, PasswordInput, Stack, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconLock, IconMail } from '@tabler/icons-react';
import { Link } from 'react-router';

import { HeaderLogo } from '@/src/components/layouts/MainLayout/components/Header/components/HeaderLogo';
import { RoutePaths } from '@/src/models/enums/RoutePaths';
import * as classes from '@/src/pages/Login/login.css';

export const Login: FC = () => {
	const [visible, { toggle }] = useDisclosure(false);

	return (
		<Stack className={classes.loginPageStyle}>
			<HeaderLogo />
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
					<Input.Wrapper label='Email' style={{ width: '100%' }} size='xs'>
						<Input leftSection={<IconMail size={15} />} placeholder='Enter your email' size='sm' />
					</Input.Wrapper>
					<Input.Wrapper label='Password' style={{ width: '100%' }} size='xs'>
						<PasswordInput
							visible={visible}
							placeholder='Enter your password'
							onVisibilityChange={toggle}
							leftSection={<IconLock size={15} />}
							size='sm'
						/>
					</Input.Wrapper>
				</Stack>
				<Button style={{ width: '100%' }}>Login</Button>
			</Stack>
			<Text size='xs'>
				Don't have an account? <Link to={RoutePaths.Register}>Create one</Link>
			</Text>
		</Stack>
	);
};
