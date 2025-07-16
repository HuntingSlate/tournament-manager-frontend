import { rem } from '@mantine/core';
import { style } from '@vanilla-extract/css';

export const pageLayoutStyle = style({
	flex: 1,
	maxWidth: rem(1440),
	margin: '0 auto',
	padding: `${rem(22)} ${rem(32)}`,
});
