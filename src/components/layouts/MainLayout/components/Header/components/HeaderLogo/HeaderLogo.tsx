import type { FC } from 'react';

import { Text, Group } from '@mantine/core';
import { IconTrophy } from '@tabler/icons-react';

import * as classes from '@/src/components/layouts/MainLayout/components/Header/components/HeaderLogo/headerLogo.css';

export const HeaderLogo: FC = () => {
	return (
		<Group className={classes.headerLogoContainerStyle}>
			<IconTrophy size={24} className={classes.headerLogoStyle} />
			<Text fw={500} size='xl' className={classes.headerLogoTextStyle}>
				TournamentHub
			</Text>
		</Group>
	);
};
