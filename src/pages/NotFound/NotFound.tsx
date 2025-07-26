import type { FC } from 'react';

import { Button, Flex, Stack, Text } from '@mantine/core';
import { IconError404 } from '@tabler/icons-react';
import { useNavigate } from 'react-router';

import { RoutePaths } from '@/src/models/enums/RoutePaths';
import { vars } from '@/src/theme';

export const NotFound: FC = () => {
	const navigate = useNavigate();

	return (
		<Flex justify='center' align='center' bg='#f9fafb' h='100vh' w='100%' pb='22.5vh'>
			<Stack align='center' pos='relative'>
				<IconError404 size={320} color={vars.colors.gray[8]} />
				<Text size='30px' fw={700} pos='absolute' bottom={50} color={vars.colors.gray[8]}>
					Page Not Found
				</Text>
				<Button
					pos='absolute'
					color={vars.colors.blue[5]}
					bottom={0}
					onClick={() => navigate(RoutePaths.Home)}
				>
					Return Home
				</Button>
			</Stack>
		</Flex>
	);
};
