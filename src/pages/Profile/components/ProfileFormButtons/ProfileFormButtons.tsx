import type { FC } from 'react';

import { Button, Group } from '@mantine/core';
import { useFormContext } from 'react-hook-form';

type ProfileFormButtonsProps = {
	isEditMode: boolean;
	onEditClick: () => void;
	onCancelClick: () => void;
	isLoading: boolean;
};

export const ProfileFormButtons: FC<ProfileFormButtonsProps> = ({
	isEditMode,
	onEditClick,
	onCancelClick,
	isLoading,
}) => {
	const { formState } = useFormContext();
	const { isDirty } = formState;

	if (isEditMode) {
		return (
			<Group style={{ gap: 10 }}>
				<Button variant='subtle' color='red' onClick={onCancelClick}>
					Cancel
				</Button>
				<Button
					variant='subtle'
					color='green'
					type='submit'
					loading={isLoading}
					disabled={!isDirty}
				>
					Save
				</Button>
			</Group>
		);
	}

	return (
		<Button variant='default' onClick={onEditClick}>
			Edit
		</Button>
	);
};
