import React from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import ReactTable from "react-table";

const styles = theme => {
  console.log(theme.palette.primary, theme);
  return {
    root: {
      marginTop: 10,
      fontSize: theme.typography.fontSize,
      fontFamily: theme.typography.fontFamily,
      textAlign: 'center'
      //zIndex: 9999
    }
  }
};

@observer
class CustomTable extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const {
      classes,
      id,
      data,
      columns
    } = this.props;

    return (
      <ReactTable
        key={id}
        className={classNames(classes.root, '-striped -highlight')}
        data={data}
        columns={columns}
        defaultPageSize={5}
        previousText="Anterior"
        nextText="Siguiente"
        loadingText="Cargando..."
        noDataText="No se encontraron datos"
        pageText="Página"
        ofText="de"
        rowsText="filas"
      />
    );
  }
}

export default withStyles(styles, { withTheme: true })(CustomTable);