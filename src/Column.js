import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Column extends Component {
  render() {
    return null;
  }
}

Column.propTypes = {
  label: PropTypes.any,
  field: PropTypes.string,
  filter: PropTypes.any,
};

export default Column;
