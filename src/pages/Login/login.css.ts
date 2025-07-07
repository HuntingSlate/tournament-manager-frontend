import { rem } from '@mantine/core';
import { style } from '@vanilla-extract/css';

import { vars } from '@/src/theme';

export const loginPageStyle = style({
	alignItems: 'center',
	justifyContent: 'center',
	height: '100vh',
});

export const loginFormContainerStyle = style({
	border: `${rem(1)} solid ${vars.colors.gray[3]}`,
	padding: `${rem(45)} ${rem(30)}`,
	borderRadius: rem(4),
	boxShadow: vars.shadows.md,
	gap: rem(24),
});
