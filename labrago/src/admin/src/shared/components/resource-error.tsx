"use client";

import type { FC } from 'react';
import PropTypes from 'prop-types';
import ArrowPathIcon from '@heroicons/react/24/outline/ArrowPathIcon';
import ExclamationTriangleIcon from '@heroicons/react/24/outline/ExclamationTriangleIcon';
import type { SxProps } from '@mui/system';
import { Button, SvgIcon, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const ResourceErrorRoot = styled('div')(
  ({ theme }) => ({
    alignItems: 'center',
    // backgroundColor: theme.palette.mode === 'dark'
    //   ? theme.palette.neutral[900]
    //   : theme.palette.neutral[50],
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(3)
  })
);

interface ResourceErrorProps {
  message?: string;
  onReload?: () => void;
  sx?: SxProps;
}

export const ResourceError: FC<ResourceErrorProps> = (props) => {
  const { message = 'Something went wrong, please try again.', onReload, sx } = props;

  return (
    <ResourceErrorRoot sx={sx}>
      <SvgIcon fontSize="small">
        <ExclamationTriangleIcon />
      </SvgIcon>
      <Typography
        color="text.secondary"
        sx={{ mt: 2 }}
        variant="body2"
      >
        {message}
      </Typography>
      {onReload && (
        <Button
          onClick={onReload}
          startIcon={(
            <SvgIcon fontSize="small">
              <ArrowPathIcon />
            </SvgIcon>
          )}
          sx={{ mt: 2 }}
          variant="text"
        >
          Reload Data
        </Button>
      )}
    </ResourceErrorRoot>
  );
};

ResourceError.propTypes = {
  message: PropTypes.string,
  onReload: PropTypes.func,
  // @ts-ignore
  sx: PropTypes.object
};
