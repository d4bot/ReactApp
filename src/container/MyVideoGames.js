import React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CustomRating from '../component/CustomRating';
import CustomTable from '../component/CustomTable';
import VideoGamePage from './VideoGamePage';
import { dialogForm, floatingButton } from '../styles';

const styles = theme => ({
  badge: {
    top: 1,
    right: -15,
    // The border color match the background color.
    border: `2px solid ${theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]}`,
  },
});

const List = ({ data }) => (
  data.map(value => <div>
    <Chip
      label={value}
      style={{marginBottom: 5}}
      color="primary"
    />
  </div>)
);

const DialogForm = observer(({
  dialog,
  handleDialogClose,
  classes,
  props
}) => (
  <Dialog
    fullScreen
    open={dialog.open}
    onClose={handleDialogClose}
  >
    <AppBar className={classes.appBar}>
      <Toolbar>
        <IconButton color="inherit" onClick={handleDialogClose} aria-label="Close">
          <CloseIcon />
        </IconButton>
        <Typography variant="title" color="inherit" className={classes.flex}>
          Videojuego
      </Typography>
      </Toolbar>      
    </AppBar>
    <main className={classes.content}>
      <VideoGamePage
        id={dialog.id}
      />
    </main>
  </Dialog>
));

const UserScore = ({ data, classes }) => (
  <Badge badgeContent={data} color="secondary" classes={{ badge: classes.badge }}>
    <FavoriteIcon />
  </Badge>
);

const UserScoreWrapper = withStyles(styles)(UserScore);
const DialogFormWrapper = withStyles(dialogForm, { withTheme: true })(DialogForm);

@observer
class MyVideoGames extends React.Component {
  @observable pageState = {};
  constructor (props) {
    super(props);

    this.pageState = {
      videoGameList: [],
      dialog: {
        open: false,
        id: ''
      },
      tableColumns: [
        {
          Header: 'Datos',
          columns: [
            {
              Header: 'Nombre',
              accessor: 'videogame'
            },
            {
              Header: 'Descripción',
              accessor: 'description'
            },
            {
              Header: 'Desarrolladora(s)',
              id: 'developer',
              accessor: d => <List data={d.developer} />
            },
            {
              Header: 'Genero(s)',
              id: 'genre',
              accessor: d => <List data={d.genre} />
            },
            {
              Header: 'Plataforma(s)',
              id: 'platform',
              accessor: d => <List data={d.platform} />
            },
            {
              Header: 'Lanzamiento',
              accessor: 'releaseYear'
            },
            {
              Header: 'Estado',
              accessor: 'status'
            },
            {
              Header: 'Nota',
              id: 'userScore',
              accessor: d => <UserScoreWrapper data={d.userScore} />
            }
          ]
        },
        {
          Header: 'Acción',
          columns: [
            {
              Header: 'Editar',
              id: 'edit',
              accessor: d =>
              <IconButton
                color="secondary"
                onClick={this.handleOnEdit.bind(null, d.id)}
              >
                <EditIcon />
              </IconButton>,
              width: 70
            },
            {
              Header: 'Eliminar',
              id: 'delete',
              accessor: d =>
              <IconButton
                color="secondary"
                //onClick={this.handleOnEdit.bind(null, d.id)}
              >
                <DeleteIcon />
              </IconButton>,
              width: 70
            }
          ]
        }
      ]
    };
  }

  componentWillMount () {
    this.getVideoGameList();
  }

  handleDialogClose = () => {
    this.pageState.dialog.open = false;
  }

  handleDialogOpen = () => {
    this.pageState.dialog = {
      open: true,
      id: ''
    };
  }

  handleOnEdit = id => {
    this.pageState.dialog = {
      open: true,
      id: id
    };
  }

  getVideoGameList = () => {
    const xhr = new XMLHttpRequest();

    xhr.open('get', '/api/videogame');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status == 200) {//ADD empty
        this.pageState.videoGameList = xhr.response.data || [];
      }/* else {
        this.props.showScreenMessage(xhr.response.message);
      }*/
    });
    xhr.send();
  }

  render () {
    const {
      videoGameList,
      tableColumns,
      dialog
    } = this.pageState;

    return (
      <div>
        <CustomTable
          id="myVideoGames"
          data={videoGameList}
          columns={tableColumns}
          onClick={this.handleDialogOpen}
        />

        <div>
          <Button
            variant="fab"
            color="primary"
            aria-label="Add"
            style={floatingButton}
            onClick={this.handleDialogOpen}
          >
            <AddIcon />
          </Button>
        </div>

        <DialogFormWrapper
          dialog={dialog}
          handleDialogClose={this.handleDialogClose}
        />
      </div>
    );
  }
}

export default MyVideoGames;