import { rem } from '@mantine/core';
import { style } from '@vanilla-extract/css';

import { vars } from '@/src/theme';

export const mainLayoutWrapperStyle = style({
	gap: 0,
	display: 'flex',
	margin: '0 auto',
	flexDirection: 'column',
	minHeight: '100vh',
});

export const mainLayoutTopContainerStyle = style({
	borderBottom: `${rem(1)} solid ${vars.colors.gray[3]}`,
	boxShadow: vars.shadows.md,
	backgroundColor: vars.colors.white,
});

export const mainLayoutMainStyle = style({
	backgroundColor: '#f9fafb',
	flex: 1,
	display: 'flex',
	justifySelf: 'center',
});
