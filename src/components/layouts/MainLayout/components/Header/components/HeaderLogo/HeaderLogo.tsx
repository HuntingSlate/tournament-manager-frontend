import type { FC } from 'react';

import { Text, Group } from '@mantine/core';
import { IconTrophy } from '@tabler/icons-react';
import { NavLink } from 'react-router';

import * as classes from '@/src/components/layouts/MainLayout/components/Header/components/HeaderLogo/headerLogo.css';
import { RoutePaths } from '@/src/models/enums/RoutePaths';

type HeaderLogoProps = {
	withLink?: boolean;
};

export const HeaderLogo: FC<HeaderLogoProps> = ({ withLink = true }) => {
	const logoContent = (
		<Group className={classes.headerLogoContainerStyle}>
			<IconTrophy size={24} className={classes.headerLogoStyle} />
			<Text fw={500} size='xl' className={classes.headerLogoTextStyle}>
				TournamentHub
			</Text>
		</Group>
	);

	return withLink ? (
		<NavLink to={RoutePaths.Home} style={{ textDecoration: 'none' }}>
			{logoContent}
		</NavLink>
	) : (
		logoContent
	);
};
