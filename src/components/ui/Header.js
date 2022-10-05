import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  AppBar,
  Toolbar,
  useScrollTrigger,
  Tabs,
  Tab,
  Button,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import logo from '../../assets/logo.svg';

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
    marginBottom: '3em',
  },
  logo: {
    height: '7em',
  },
  tabContainer: {
    marginLeft: 'auto',
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: '25px',
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: '50px',
    marginLeft: '50px',
    marginRight: '25px',
    height: '45px',
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState(window.location.pathname);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleChange = (e, value) => {
    setValue(value);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    setOpen(false);
  };

  return (
    <>
      <ElevationScroll>
        <AppBar position='fixed'>
          <Toolbar disableGutters>
            <img src={logo} alt='company logo' className={classes.logo} />
            <Tabs
              value={value}
              className={classes.tabContainer}
              onChange={handleChange}
              indicatorColor='primary'
            >
              <Tab
                label='Home'
                className={classes.tab}
                component={Link}
                to='/'
                value='/'
              />
              <Tab
                label='Services'
                aria-owns={anchorEl ? 'simple-menu' : undefined}
                aria-haspopup={anchorEl ? 'true' : undefined}
                className={classes.tab}
                component={Link}
                to='/services'
                value='/services'
                onMouseOver={(event) => handleClick(event)}
              />
              <Tab
                label='The Revolution'
                className={classes.tab}
                component={Link}
                to='/revolution'
                value='/revolution'
              />
              <Tab
                label='About Us'
                className={classes.tab}
                component={Link}
                to='/about'
                value='/about'
              />
              <Tab
                label='Contact Us'
                className={classes.tab}
                component={Link}
                to='/contact'
                value='/contact'
              />
            </Tabs>
            <Button
              variant='contained'
              color='secondary'
              className={classes.button}
            >
              Free Estimate
            </Button>
            <Menu
              id='simple-menu'
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{ onMouseLeave: handleClose }}
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                  setValue('/services');
                }}
                component={Link}
                to='/services'
              >
                All Services
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  setValue('/services');
                }}
                component={Link}
                to='/customsoftware'
              >
                Custom Software Development
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  setValue('/services');
                }}
                component={Link}
                to='/mobileapps'
              >
                Mobile App Development
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  setValue('/services');
                }}
                component={Link}
                to='/websites'
              >
                Website Development
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  );
};

export default Header;
