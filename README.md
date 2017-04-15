# react-dtable

`react-dtable` is a DataTable in React component. It allows you to write declarative
data table. It comes with built-in sorting, filtering and pagination.

To install <br />
`npm install --save react-dtable`


```js
import React from 'react';
import ReactDOM from 'react-dom';
import { DataTable, Column } from 'react-dtable';

class App extends React.Component {
  componentWillMount() {
    fetch(`https://randomuser.me/api/?results=50`)
      .then(res => res.json())
      .then(json => this.setState({data: json.results}))
      .catch(err => console.error(err));
  }

  render() {
    return (
        <DataTable
          data={this.state.data}
        >
          <Column
            label="Username"
            field="login.username"
          />
          <Column
            label="Full Name"
            filter={filter => <input type="text" onChange={e => filter({name: e.target.value})} />}
            cell={row => <span><strong>{row.firstName}</strong> {row.lastName}</span>}
          />
          <Column
            label="Email"
            field="email"
          />
          <Column
            label={false}
            cell={row => <button>Delete</button>}
        </DataTable>
      );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
```

### `<DataTable>` Props

Property | Type | Description
:---|:---|:---
`data` | _[object]_ | **required** - Array of object.
`renderColumnLabels` | _boolean_ | default: `true`. Setting to false will skip rendering the entire filter row
&nbsp; | _function_ | If set to false, labels will not be shown. <br />IF set to a function, it should return a `<tr>` node.
`renderColumnFilters` | _boolean_ | default: `true`. If set to false, filter columns will not be rendered. 
&nbsp; | _function_ | `(filterColumn, applyFilter) => { ... }`
`tableClassName` | _string_ | `<table className={tableClassName}>`
`theadClassName` | _string_ | `<thead className={theadClassName}>`
`tbodyClassName` | _string_ | `<tbody className={tbodyClassName}>`
`tfootClassName` | _string_ | `<tfoot className={tfootClassName}>`

### `<Column>` Props

Property | Type | Description
:---|:---|:---
`label` | _string_ | Column heading to display.
`labelClassName` | _string_ | `<th className={labelClassName}>`
`field` | _string_ | Field name for displaying value and filter
`filter` | _function_ | `(filterColumn) => { ... }`
`filterClassName` | _string_ | `<th className={filterClassName}>`
`cell` | _string_ | Text to display
&nbsp; | _function_ | `(row) => { ... }`
 `cellClassName` | _string_ | `<td className={cellClassName}>...</td>`
 `className` | _string_ | `<tr className={className}>...</tr>`

## Todo

- Column sorting
- Pagination
- Loading of data

