import type { FC, PropsWithChildren } from 'react';

import { Stack } from '@mantine/core';
import clsx from 'clsx';

import * as classes from '@/src/components/layouts/PageLayout/pageLayout.css';

type PageLayoutProps = {
	className?: string;
};

export const PageLayout: FC<PropsWithChildren<PageLayoutProps>> = ({ children, className }) => {
	return <Stack className={clsx(classes.pageLayoutStyle, className)}>{children}</Stack>;
};
