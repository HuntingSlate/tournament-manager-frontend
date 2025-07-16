import type { FC } from 'react';

import { Stack, Text } from '@mantine/core';

import { ProfileLink } from '@/src/components/ProfileDetailsComponents/ProfileLinks/components/ProfileLink';
import { vars } from '@/src/theme';

type ProfileLinks = {
	links?: Array<{
		id: number;
		type?: string;
		platformUsername?: string;
		url?: string;
	}>;
};

export const ProfileLinks: FC<ProfileLinks> = ({ links }) => {
	return (
		<Stack p={24} bdrs={4} bg={vars.colors.white} bd='1px solid #ced4de'>
			<Text size='lg' fw={500}>
				Links ({links?.length || 0})
			</Text>
			<Stack gap={16}>
				{links?.map((link) => (
					<ProfileLink key={link.id} {...link} />
				))}
			</Stack>
		</Stack>
	);
};
