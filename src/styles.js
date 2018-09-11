const drawerWidth = 240;

export const floatingButton = {
  position: 'fixed',
  bottom: 20,
  right: 25
};

export const dialogForm = theme => ({
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    backgroundColor: 'white',
    padding: theme.spacing.unit * 5,
  }
});

export const label = theme => ({
  color: theme.palette.primary.main,
  fontSize: theme.typography.fontSize,
  fontFamily: theme.typography.fontFamily
});

export const main = theme => ({
  root: {
    flexGrow: 1,
    height: 'auto',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: 'none'
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    //minHeight: 650,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    '@media (min-width:600px)': theme.mixins.toolbar['@media (min-width:600px)'],
    //'@media (min-width:0px) and (orientation: landscape)': theme.mixins.toolbar['@media (min-width:0px) and (orientation: landscape)'],
    minHeight: theme.mixins.toolbar.minHeight
  },
  content: {
    flexGrow: 1,
    backgroundColor: 'white',
    padding: theme.spacing.unit * 3,
  }
});

export const rating = theme => ({
  label: label(theme)
});

export const select = theme => ({
  root: {
    marginTop: 10,
    fontSize: theme.typography.fontSize,
    fontFamily: theme.typography.fontFamily
  },
  label: label(theme)
});

export const videoGameForm = theme => ({
  group: {
    margin: `${theme.spacing.unit}px 0`
  },
  label: label(theme)
});