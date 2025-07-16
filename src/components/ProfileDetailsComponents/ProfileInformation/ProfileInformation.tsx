import type { FC } from 'react';

import { Stack, Group, InputWrapper, Input, Text } from '@mantine/core';

import { vars } from '@/src/theme';

type ProfileInformationProps = {
	nickname?: string;
	email?: string;
	fullName?: string;
};

export const ProfileInformation: FC<ProfileInformationProps> = ({ nickname, email, fullName }) => {
	return (
		<Stack p={24} bdrs={4} bg={vars.colors.white} bd='1px solid #ced4de'>
			<Text size='lg' fw={500}>
				Information
			</Text>
			<Stack>
				<Group w='100%' wrap='nowrap'>
					<InputWrapper label='Nickname' w='100%' size='sm'>
						<Input size='md' readOnly value={nickname} />
					</InputWrapper>
					<InputWrapper label='Email' size='sm' w='100%'>
						<Input size='md' readOnly value={email} />
					</InputWrapper>
				</Group>
				<InputWrapper label='Full Name' size='sm' w='100%'>
					<Input size='md' readOnly value={fullName} />
				</InputWrapper>
			</Stack>
		</Stack>
	);
};
