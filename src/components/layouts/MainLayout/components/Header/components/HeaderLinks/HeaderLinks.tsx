import type { FC } from 'react';

import { Group } from '@mantine/core';
import { NavLink } from 'react-router';

import * as classes from '@/src/components/layouts/MainLayout/components/Header/components/HeaderLinks/headerLinks.css';

export const HeaderLinks: FC = () => {
	return (
		<Group className={classes.headerLinksContainerStyle}>
			<NavLink to='/' className={classes.headerLinkStyle}>
				Games
			</NavLink>
			<NavLink to='/' className={classes.headerLinkStyle}>
				Tournaments
			</NavLink>
			<NavLink to='/' className={classes.headerLinkStyle}>
				Teams
			</NavLink>
			<NavLink to='/' className={classes.headerLinkStyle}>
				Leaderboard
			</NavLink>
		</Group>
	);
};
