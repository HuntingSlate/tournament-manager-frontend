import type { FC } from 'react';

import { Input, InputWrapper } from '@mantine/core';
import { get, useFormContext } from 'react-hook-form';

type InputWithEditProps = {
	name: string;
	label: string;
	editable?: boolean;
	placeholder?: string;
};

export const InputWithEdit: FC<InputWithEditProps> = ({ name, editable, label, placeholder }) => {
	const { register, formState, watch } = useFormContext();
	const error = get(formState.errors, name);
	const currentValue = watch(name);

	if (editable) {
		return (
			<InputWrapper label={label} error={error?.message} size='sm'>
				<Input
					placeholder={placeholder}
					size='md'
					defaultValue={currentValue || ''}
					{...register(name)}
				/>
			</InputWrapper>
		);
	}

	return (
		<InputWrapper
			label={label}
			size='sm'
			styles={{
				label: {
					borderBottom: '1px solid #ced4da',
					width: '100%',
				},
			}}
		>
			<Input value={currentValue || ''} variant='unstyled' readOnly size='md' />
		</InputWrapper>
	);
};
