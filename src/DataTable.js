import React from 'react';

class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [];
    this.filters = {};
    this.sortOrder = {};

    this.currentPage = 1;
    this.itemsPerPage = 10;
    this.numberOfPages = 1;
    this.totalItems = 0;

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
        const {label, field, filter} = element.props || {};
        this.columns.push({
          label,
          field,
          filter,
        });
      } else {
        console.warn("Only 'Column' is a valid children");
      }
    });
  }

  render() {
    return (
      <div className="responsive">
        <table className="table table-bordered">
          <thead>
            {this.renderColumnFilters()}
            {this.renderColumnLabels()}
          </thead>
          <tbody>
            {this.renderBody()}
          </tbody>
        </table>
      </div>
    );
  }

  renderColumnLabels() {
    return (
      <tr>
        {this.columns.map((col, index) => {
          return (
            <th
              key={'column-label-' + index}
              onClick={e => console.log('sorting...')}
              style={{cursor: 'pointer'}}
            >
              {col.label}
            </th>
          );
        })}
      </tr>
    );
  }

  renderColumnFilters() {
    return (
      <tr>
        {this.columns.map((col, index) => {
          if (col.filter === false) {
            return <th />;
          }

          if (typeof col.filter === 'function') {
            return col.filter(this.filterColumn);
          }
          return (
            <th key={'column-filter-' + index}>
              <input type="text" className="form-control" name={col.filter || col.field} onChange={e => this.filterColumn({ [e.target.name]: e.target.value })} />
            </th>
          );
        })}
      </tr>
    );
  }

  renderBody() {
    const rowElement = [];

    if (this.props.data.length < 1) {
      return null;
    }

    for (let rowIdx = 0; rowIdx < this.itemsPerPage; rowIdx++) {
      rowElement.push(
        <tr key={`row-${rowIdx}`}>
          {this.columns.map((col, idx) => {
            console.log(col.field);
            console.log(col.field.split('.').reduce((o, i) => o[i], this.props.data[rowIdx]));
            return (
              <td key={`col-${rowIdx}-${idx}`}>
                {typeof col.cell === 'function'
                  ? col.cell(this.props.data[rowIdx])
                  : col.field.split('.').reduce((o, i) => o[i], this.props.data[rowIdx])}
              </td>
            );
          })}
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

  sortColumn(sortBy) {}

  filterColumn(filter) {
    console.log('filtering...');
    console.log(filter);
  }

  applyFilter() {}

  loadData() {}
}

export default DataTable;
