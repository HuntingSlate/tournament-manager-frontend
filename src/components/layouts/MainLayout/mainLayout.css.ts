import { rem } from '@mantine/core';
import { style, styleVariants } from '@vanilla-extract/css';

import { vars } from '@/src/theme';

export const mainLayoutWrapperStyle = style({
	gap: 0,
	maxWidth: rem(1440),
	margin: '0 auto',
});

export const mainLayoutTopContainerStyle = style({
	top: 0,
	left: 0,
	right: 0,
	zIndex: 100,
	position: 'fixed',
	borderBottom: `${rem(1)} solid ${vars.colors.gray[3]}`,
	boxShadow: vars.shadows.xs,
});

export const mainLayoutMainStyle = styleVariants({
	withHeader: {
		height: '100vh',
		paddingTop: rem(53),
	},
	withoutHeader: {
		height: '100%',
		paddingTop: 0,
	},
});
