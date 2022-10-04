import React from 'react';
import {
  AppBar,
  Toolbar,
  useScrollTrigger,
  Typography,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';

const ElevationScroll = (props) => {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
};

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
  },
}));

const Header = (props) => {
  const classes = useStyles();
  return (
    <>
      <ElevationScroll>
        <AppBar position='fixed'>
          <Toolbar>
            <Typography variant='h3'>Arc Development</Typography>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  );
};

export default Header;
