"use client";

import type { FC, ReactNode } from 'react';
import { alpha, darken } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { List } from '@mui/material';

interface ActionListProps {
  children: ReactNode;
}

export const ActionList: FC<ActionListProps> = (props) => {
  const { children } = props;

  return (
    <List
      dense
      sx={{
        // backgroundColor: (theme) => theme.palette.mode === 'dark'
        //   ? alpha(theme.palette.neutral[500], 0.1)
        //   : alpha(theme.palette.neutral[500], 0.1)
        //  backgroundColor: (theme) => alpha(theme.palette.neutral[500], 0.1)
      }}
    >
      {children}
    </List>
  );
};

ActionList.propTypes = {
  children: PropTypes.node
};
