import type { FC } from 'react';

import { Group } from '@mantine/core';
import { NavLink } from 'react-router';

import * as classes from '@/src/components/layouts/MainLayout/components/Header/components/HeaderLinks/headerLinks.css';
import { RoutePaths } from '@/src/models/enums/RoutePaths';

export const HeaderLinks: FC = () => {
	return (
		<Group className={classes.headerLinksContainerStyle}>
			<NavLink to={RoutePaths.Games} className={classes.headerLinkStyle}>
				Games
			</NavLink>
			<NavLink to={RoutePaths.Tournaments} className={classes.headerLinkStyle}>
				Tournaments
			</NavLink>
			<NavLink to={RoutePaths.Teams} className={classes.headerLinkStyle}>
				Teams
			</NavLink>
			<NavLink to={RoutePaths.Leaderboard} className={classes.headerLinkStyle}>
				Leaderboard
			</NavLink>
		</Group>
	);
};
