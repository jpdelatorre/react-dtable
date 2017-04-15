import React from 'react';

class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [];
    this.filters = {};
    this.filterMapping = {}; //This maps the value of custom cell and for filtering?
    this.sortOrder = {};

    this.currentPage = 1;
    this.itemsPerPage = 10;
    this.numberOfPages = 1;
    this.totalItems = 0;

    this.state = {
      data: props.data,
    };

    this.renderColumnLabels = this.renderColumnLabels.bind(this);
    this.renderColumnFilters = this.renderColumnFilters.bind(this);
    this.renderBody = this.renderBody.bind(this);
    this.filterColumn = this.filterColumn.bind(this);
  }

  componentWillMount() {
    React.Children.map(this.props.children, element => {
      if (
        React.isValidElement(element) &&
        typeof element.type !== 'string' &&
        element.type.name === 'Column'
      ) {
        //console.log(element.type.name);
        const {
          label,
          field,
          filter,
          cell,
          cellClassName = '',
          className = '',
        } = element.props || {};
        this.columns.push({
          label,
          field,
          filter,
          cell,
          cellClassName,
          className,
        });
      } else {
        console.warn("Only 'Column' is a valid children");
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.itemsPerPage = nextProps.data.length;
      this.setState({ data: nextProps.data });
    }
  }

  render() {
    const {
      tableClassName = '',
      theadClassName = '',
      tbodyClassName = '',
      tfootClassName = '',
    } = this.props;

    return (
      <div className="responsive">
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
      </div>
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
          const {
            labelClassName = '',
          } = col;

          return (
            <th key={'column-label-' + index} className={labelClassName}>
              {col.label}
            </th>
          );

          // for sorting
          //          return (
          //            <th
          //              key={'column-label-' + index}
          //              onClick={e => console.log('sorting...')}
          //              className={labelClassName}
          //              style={{ cursor: 'pointer' }}
          //            >
          //              {col.label}
          //            </th>
          //          );
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
                    onChange={e =>
                      this.filterColumn(e.target.name, e.target.value)}
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
          </td>,
        );
      });

      rowElement.push(
        <tr key={`row-${rowIdx}`} className={rowClassName}>
          {cellElement}
        </tr>,
      );
    }

    return rowElement;

    // return this.props.data.map((row, index) => {
    //   return (
    //     <tr key={'row-' + index}>
    //       {this.columns.map((col, idx) => {
    //         return (
    //           <td key={'col-' + index + '-' + idx}>
    //             {row[col.field]}
    //           </td>
    //         );
    //       })}
    //     </tr>
    //   );
    // });
  }

  renderPagination() {
    return <div />;
  }

  sortColumn(sortBy) {
    console.log(sortBy);
  }

  filterColumn(field, keyword) {
    this.filters[field] = keyword.trim();

    if (!keyword) {
      delete this.filters[field];
    }

    this.applyFilter();

    //console.log('filtering...');
    //console.log(field, ' - ', keyword);
    //const filteredData = this.state.data.filter(
    //  item => ~field.split('.').reduce((o, i) => o[i], item).indexOf(keyword),
    //);
    //console.table(filteredData);
    //this.setState({ data: filteredData });

    //console.log(filter);
    //this.setState({
    //	data: this.props.data.filter(item => {
    //		return ~item[field].indexOf(keyword);
    //	})
    //});
  }

  applyFilter() {
    const filteredData = this.props.data.filter(row => {
      let includeItem = true;
      Object.keys(this.filters).forEach(field => {
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

    this.setState({ data: filteredData });
  }

  loadData() {}
}

export default DataTable;
