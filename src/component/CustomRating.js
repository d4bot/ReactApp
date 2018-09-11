import React from 'react';
import Rating from 'react-rating';
import { observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { rating } from '../styles';

@observer
@withStyles(rating, { withTheme: true })
class CustomRating extends React.Component {
  constructor (props) {
    super(props);
  }

  handleChange = value => {
    let { id, name } = this.props;

    this.props.onChange({
      target: {
        id,
        name,
        value
      }
    });
  }

  render () {
    const {
      classes,
      label,
      id,
      name,
      fractions,
      stop,
      description,
      value,
      helperText,
      showScore,
      onChange,
      showLabel
    } = this.props;

    return (
      <div>
        {
          showLabel && (<div>
            <label className={classes.label}>{label}</label>
            <Typography gutterBottom>
              { description }
            </Typography>
          </div>)
        }

        <div align="center">
          <Rating
            id={id}
            name={name}
            initialRating={value}
            fractions={fractions}
            stop={stop}
            fullSymbol={
              <IconButton color="primary">
                <FavoriteIcon />
              </IconButton>
            }
            emptySymbol={
              <IconButton color="primary">
                <FavoriteBorderIcon />
              </IconButton>
            }
            onChange={this.handleChange}
            //placeholderRating={value}
          />
          
          {
            showScore && (
              <Typography variant="display3" align="center">
                { value || 0.0 }
              </Typography>
            )
          }
        </div>
        {helperText && <FormHelperText error>{helperText}</FormHelperText>}
      </div>
    );
  }
}

CustomRating.defaultProps = {
  name: '',
  id: '',
  fractions: 2,
  stop: 10,
  label: 'Rating',
  showScore: true,
  description: 'Descripción',
  showLabel: true
};

export default CustomRating;