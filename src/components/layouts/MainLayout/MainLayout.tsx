import type { FC } from 'react';

import { Stack } from '@mantine/core';
import { Outlet } from 'react-router';

import { Header } from '@/src/components/layouts/MainLayout/components/Header';
import * as classes from '@/src/components/layouts/MainLayout/mainLayout.css';

type MainLayoutProps = {
	withHeader?: boolean;
};

export const MainLayout: FC<MainLayoutProps> = ({ withHeader = true }) => {
	return (
		<Stack className={classes.mainLayoutWrapperStyle}>
			{withHeader && (
				<Stack className={classes.mainLayoutTopContainerStyle}>
					<Header />
				</Stack>
			)}
			<main className={classes.mainLayoutMainStyle}>
				<Outlet />
			</main>
		</Stack>
	);
};
