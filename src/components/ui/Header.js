import React, { useState, useEffect } from 'react';
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
  useMediaQuery,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
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
    marginBottom: '4rem',
    [theme.breakpoints.down('md')]: {
      marginBottom: '3rem',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '2rem',
    },
  },
  logo: {
    height: '8rem',
    [theme.breakpoints.down('md')]: {
      height: '7rem',
    },
    [theme.breakpoints.down('xs')]: {
      height: '5.5rem',
    },
  },
  logoContainer: {
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent',
    },
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
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: 'white',
    borderRadius: 0,
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    '&:hover': {
      opacity: 1,
    },
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const [value, setValue] = useState('/');
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleChange = (e, value) => {
    setValue(value);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };

  const handleMenuItemClick = (e, i) => {
    setAnchorEl(null);
    setOpen(false);
    setSelectedIndex(i);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    setOpen(false);
  };

  useEffect(() => {
    switch (window.location.pathname) {
      case '/services':
        setValue('/services');
        setSelectedIndex(0);
        break;
      case '/customsoftware':
        setValue('/services');
        setSelectedIndex(1);
        break;
      case '/mobileapps':
        setValue('/services');
        setSelectedIndex(2);
        break;
      case '/websites':
        setValue('/services');
        setSelectedIndex(3);
        break;
      default:
        setValue(window.location.pathname);
    }
  }, [value]);

  const menuOptions = [
    { name: 'Services', link: '/services' },
    { name: 'Custom Software Development', link: '/customsoftware' },
    { name: 'Mobile App Development', link: '/mobileapps' },
    { name: 'Website Development', link: '/websites' },
  ];

  const tabs = (
    <>
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
      <Button variant='contained' color='secondary' className={classes.button}>
        Free Estimate
      </Button>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
        classes={{ paper: classes.menu }}
        elevation={0}
      >
        {menuOptions.map((option, i) => (
          <MenuItem
            key={option}
            component={Link}
            to={option.link}
            classes={{ root: classes.menuItem }}
            onClick={(event) => {
              handleMenuItemClick(event, i);
              setValue('/services');
              handleClose();
            }}
            selected={i === selectedIndex && value === '/services'}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );

  return (
    <>
      <ElevationScroll>
        <AppBar position='fixed'>
          <Toolbar disableGutters>
            <Button
              component={Link}
              to='/'
              disableRipple
              onClick={() => setValue('/')}
              className={classes.logoContainer}
            >
              <img src={logo} alt='company logo' className={classes.logo} />
            </Button>
            {matches ? null : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  );
};

export default Header;
