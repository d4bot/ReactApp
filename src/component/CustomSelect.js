import React from 'react';
import { observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from 'react-select'
import { select } from '../styles';

@observer
@withStyles(select, { withTheme: true })
class CustomSelect extends React.Component {
  constructor (props) {
    super(props);
  }

  handleChange = (selectedOption, event) => {
    let { id, name, isMulti } = this.props;
    
    this.props.onChange(
      {
        target: {
          id,
          name,
          value: isMulti ? selectedOption.map(option => { 
            return { label: option.label, value: option.value };
          })
          :
          { label: selectedOption.label, value: selectedOption.value }
        }
      },
      selectedOption  
    );
  }

  render () {
    const {
      classes,
      label,
      options,
      placeholder,
      isMulti,
      noOptionsMessage,
      menuPosition,
      id,
      name,
      helperText,
      value
    } = this.props;

    return (
      <div>
        <label className={classes.label}>{label}</label>
        <Select
          id={id}
          name={name}
          className={classes.root}
          /*styles={{
            menuList: () => ({
              zIndex: 9999
            })
          }}*/
          menuPosition={menuPosition}
          placeholder={placeholder}
          options={options}
          onChange={this.handleChange}
          isMulti={isMulti}
          noOptionsMessage={noOptionsMessage}
          value={value}
        />

        {helperText && <FormHelperText error>{helperText}</FormHelperText> }
      </div>
    );
  }
}

CustomSelect.defaultProps = {
  isMulti: false,
  placeholder: 'Seleccione',
  noOptionsMessage: () => 'No hay datos',
  menuPosition: 'top',
  label: 'Select'
};

export default CustomSelect;