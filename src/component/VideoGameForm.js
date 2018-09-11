import React from 'react';
import { observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import CustomSelect from './CustomSelect';
import CustomRating from './CustomRating';
import { floatingButton, videoGameForm } from '../styles';

const VideoGameForm = observer(({
  classes,
  data,
  errors,
  developerList,
  esrbRatingList,
  genreList,
  platformList,
  releaseYearList,
  statusList,
  onChange,
  onSubmit
}) => (
  <div>
    <Grid container spacing={24}>
      <Grid item xs={12} sm={6}>
        <TextField
          id="name"
          name="name"
          label="Nombre"
          value={data.name}
          onChange={onChange}
          margin="normal"
          error={errors.name}
          helperText={errors.name}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          id="description"
          name="description"
          label="Descripción"
          value={data.description}
          onChange={onChange}
          margin="normal"
          error={errors.description}
          helperText={errors.description}
          fullWidth
          multiline
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <CustomSelect
          id="developer"
          name="developer"
          label="Desarrolladora(s)"
          options={developerList}
          onChange={onChange}
          value={data.developer}
          helperText={errors.developer}
          isMulti
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <CustomSelect
          id="genre"
          name="genre"
          label="Genero(s)"
          options={genreList}
          onChange={onChange}
          value={data.genre}
          helperText={errors.genre}
          isMulti
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <CustomSelect
          id="platform"
          name="platform"
          label="Plataforma(s)"
          options={platformList}
          onChange={onChange}
          value={data.platform}
          helperText={errors.platform}
          isMulti
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <CustomSelect
          id="releaseYear"
          name="releaseYear"
          label="Año de Publicación Original"
          options={releaseYearList}
          onChange={onChange}
          value={data.releaseYear}
          helperText={errors.releaseYear}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        {/*<FormLabel primary>Estado</FormLabel>*/}
        <label className={classes.label}>Estado</label>
        <RadioGroup
          aria-label="status"
          name="status"
          className={classes.group}
          value={data.status}
          onChange={onChange}
          row
        >
          {
            statusList.map(status => (
              <FormControlLabel
                value={status.value}
                control={<Radio color="primary" />}
                label={status.label}
                labelPlacement="start"
              />
            ))
          }
        </RadioGroup>

        <Grid item xs={12}>
          {
            data.status == 'T' && (
              <CustomRating
                id="userScore"
                name="userScore"
                label="Puntuación del Usuario"
                onChange={onChange}
                value={data.userScore}
                helperText={errors.userScore}
              />
            )
          }
        </Grid>
      </Grid>

      <Grid item xs={12} sm={6}>
        <CustomSelect
          id="esrbRating"
          name="esrbRating"
          label="Rating ESRB"
          options={esrbRatingList}
          onChange={onChange}
          value={data.esrbRating}
          helperText={errors.esrbRating}
        />
      </Grid>

      <Grid item xs={12}/* style={{marginTop: 60}}*/>
        <Button
          variant="fab"
          color="primary"
          aria-label="save"
          style={floatingButton}
          onClick={onSubmit}
        >
          <SaveIcon />
        </Button>
      </Grid>
    </Grid>
  </div>
));

export default withStyles(videoGameForm, { withTheme: true })(VideoGameForm);