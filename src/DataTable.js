import React from 'react';

class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [];
    this.filters = {};
    this.sortOrder = {};

    this.state = {
      data: props.data,
    };

    this.filterColumn = this.filterColumn.bind(this);
  }

  componentWillMount() {
    React.Children.map(this.props.children, element => {
      if (
        React.isValidElement(element) &&
        typeof element.type !== 'string' &&
        element.type.name === 'Column'
      ) {
        const {
          label,
          labelClassName = '',
          field,
          filter,
          filterClassName = '',
          cell,
          cellClassName = '',
          className = '',
        } = element.props || {};

        this.columns.push({
          label,
          labelClassName,
          field,
          filter,
          filterClassName,
          cell,
          cellClassName,
          className,
        });
      } else {
        console.warn("Only 'Column' is a valid children");
      }
    });

    if (!this.columns.length) {
      // try to make sense of the data
      const firstRow = this.props.data[0] || {};
      this.columns = Object.keys(firstRow).map(field => {
        return {
          label: field,
          labelClassName: '',
          field,
          filterClassName: '',
          cellClassName: '',
          className: '',
        };
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.itemsPerPage = nextProps.data.length;
      this.setState({data: nextProps.data});
    }
  }

  render() {
    const {
      tableClassName = '',
      theadClassName = '',
      tbodyClassName = '',
      tfootClassName = '',
    } = this.props;

    if (this.state.data.length <= 0 && this.columns <= 0) {
      return null;
    }

    return (
      <table className={tableClassName}>
        <thead className={theadClassName}>
          {this.renderColumnFilters()}
          {this.renderColumnLabels()}
        </thead>
        <tbody className={tbodyClassName}>
          {this.renderBody()}
        </tbody>
        <tfoot className={tfootClassName} />
      </table>
    );
  }

  renderColumnLabels() {
    if (this.props.renderColumnLabels === false) {
      return null;
    }

    if (typeof this.props.renderColumnLabels === 'function') {
      return this.props.renderColumnLabels(this.sortColumn);
    }

    return (
      <tr>
        {this.columns.map((col, index) => {
          const thProps = {
            key: `column-label-${index}`,
            className: col.labelClassName,
          };

          if (col.field || col.sortable === false) {
            thProps['onClick'] = e => this.sortColumn(col.field);
            thProps['style'] = {
              cursor: 'pointer',
            };

            let sortClass = 'sorting';

            if (col.field === this.sortOrder.sortBy) {
              if (this.sortOrder.orderBy === 'ASC') sortClass = 'sorting-asc';
              if (this.sortOrder.orderBy === 'DESC') sortClass = 'sorting-desc';
            }
            thProps.className += ` ${sortClass}`;
          }

          return (
            <th {...thProps}>
              {col.label || ''}
            </th>
          );
        })}
      </tr>
    );
  }

  renderColumnFilters() {
    if (this.props.renderColumnFilters === false) {
      return null;
    }

    if (typeof this.props.renderColumnFilters === 'function') {
      return this.props.renderColumnFilters(this.filterColumn);
    }

    return (
      <tr>
        {this.columns.map((col, index) => {
          const thProps = {
            key: `column-filter-${index}`,
            className: col.filterClassName,
          };
          if (col.filter === false || (!col.field && !col.filter)) {
            return <th {...thProps} />;
          }

          return (
            <th {...thProps}>
              {typeof col.filter === 'function'
                ? col.filter(this.filterColumn)
                : <input
                    type="text"
                    className="form-control"
                    name={col.filter || col.field}
                    onChange={e => {
                      const name = e.target.name, value = e.target.value;
                      this.filterColumn({[name]: value});
                    }}
                  />}
            </th>
          );
        })}
      </tr>
    );
  }

  renderBody() {
    const rowElement = [];

    if (this.state.data.length < 1) {
      return null;
    }

    const numberOfItemsToDisplay = this.state.data.length < this.itemsPerPage
      ? this.state.data.length
      : this.itemsPerPage;

    for (let rowIdx = 0; rowIdx < numberOfItemsToDisplay; rowIdx++) {
      const cellElement = [];
      let rowClassName = '';

      this.columns.forEach((col, idx) => {
        rowClassName = col.className;
        cellElement.push(
          <td key={`col-${rowIdx}-${idx}`} className={col.cellClassName}>
            {typeof col.cell === 'function'
              ? col.cell(this.state.data[rowIdx])
              : col.field
                  .split('.')
                  .reduce((o, i) => o[i], this.state.data[rowIdx])}
          </td>
        );
      });

      rowElement.push(
        <tr key={`row-${rowIdx}`} className={rowClassName}>
          {cellElement}
        </tr>
      );
    }

    return rowElement;
  }

  filterColumn(filters = {}) {
    this.filters = Object.assign(this.filters, filters);
    for (let key in this.filters) {
      const value = typeof this.filters[key] === 'string'
        ? this.filters[key].trim()
        : this.filters[key];
      if (value) {
        this.filters[key] = value;
      } else {
        delete this.filters[key];
      }
    }
    this.applyFilter();
  }

  applyFilter() {
    console.log(this.filters);
    const filteredData = this.props.data.filter(row => {
      let includeItem = true;
      Object.keys(this.filters).forEach(field => {
        if (typeof this.filters[field] === 'function') {
          includeItem = includeItem && this.filters[field](row);
          return;
        }

        const cellValue = field.split('.').reduce((o, i) => o[i], row);
        if (typeof cellValue !== 'string') {
          this.warningDisplayed || console.warn('Invalid filter field');
          this.warningDisplayed = true;
          return;
        }

        if (~cellValue.indexOf(this.filters[field])) {
          includeItem = includeItem && true;
        } else {
          includeItem = false;
        }
      });
      return includeItem;
    });

    this.setState({data: filteredData});
  }

  sortColumn(field) {
    if (field !== this.sortOrder.sortBy) {
      this.sortOrder = {
        sortBy: field,
        orderBy: 'DESC',
      };
    } else {
      this.sortOrder = {
        sortBy: field,
        orderBy: this.sortOrder.orderBy === 'DESC' ? 'ASC' : 'DESC',
      };
    }

    // sort data
    const sortedData = this.props.data.sort((a, b) => {
      const cellA = field.split('.').reduce((o, i) => o[i], a).toUpperCase();
      const cellB = field.split('.').reduce((o, i) => o[i], b).toUpperCase();

      if (cellA < cellB) {
        return this.sortOrder.orderBy === 'ASC' ? -1 : 1;
      }

      if (cellA > cellB) {
        return this.sortOrder.orderBy === 'DESC' ? -1 : 1;
      }

      return 0;
    });

    this.setState({data: sortedData});
  }
}

DataTable.defaultProps = {
  data: [],
};

export default DataTable;
