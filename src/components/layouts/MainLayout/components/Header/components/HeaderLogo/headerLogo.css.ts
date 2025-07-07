import { rem } from '@mantine/core';
import { style } from '@vanilla-extract/css';

import { vars } from '@/src/theme';

export const headerLogoContainerStyle = style({
	gap: rem(4),
});

export const headerLogoStyle = style({
	color: vars.colors.yellow[3],
});

export const headerLogoTextStyle = style({
	color: vars.colors.gray[8],
});
