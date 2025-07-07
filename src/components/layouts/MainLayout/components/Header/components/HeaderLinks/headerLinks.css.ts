import { rem } from '@mantine/core';
import { style } from '@vanilla-extract/css';

import { vars } from '@/src/theme';

export const headerLinksContainerStyle = style({
	gap: rem(14),
	alignItems: 'center',
});

export const headerLinkStyle = style({
	textDecoration: 'none',
	color: vars.colors.gray[6],
	fontWeight: 500,
});
