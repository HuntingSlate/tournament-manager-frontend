import { rem } from '@mantine/core';
import { style } from '@vanilla-extract/css';

import { vars } from '@/src/theme';

export const headerContainerStyle = style({
	backgroundColor: vars.colors.white[0],
	justifyContent: 'space-between',
	padding: `${rem(15)} ${rem(20)}`,
	maxWidth: rem(1440),
	margin: '0 auto',
	width: '100%',
});

export const headerTitleStyle = style({
	gap: rem(24),
});
