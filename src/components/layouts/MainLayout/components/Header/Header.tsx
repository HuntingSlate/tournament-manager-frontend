import type { FC } from 'react';

import { Group } from '@mantine/core';

import { HeaderLinks } from '@/src/components/layouts/MainLayout/components/Header/components/HeaderLinks';
import { HeaderLogo } from '@/src/components/layouts/MainLayout/components/Header/components/HeaderLogo';
import { ProfileButtons } from '@/src/components/layouts/MainLayout/components/Header/components/ProfileButtons';
import * as classes from '@/src/components/layouts/MainLayout/components/Header/header.css';

export const Header: FC = () => {
	return (
		<Group className={classes.headerContainerStyle}>
			<Group className={classes.headerTitleStyle}>
				<HeaderLogo />
				<HeaderLinks />
			</Group>
			<ProfileButtons />
		</Group>
	);
};
