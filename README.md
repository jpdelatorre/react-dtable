# react-dtable

**\*\*Experimental\*\***

`react-dtable` is a React component that lets you generate a data table easily.

## Installation

```sh
npm install --save react-dtable
```

## Example

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
            filter={filter => <input type="text" onChange={e => filter({ name: e.target.value})} />}
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

## API

### `<DataTable>` Props

Property | Type | Description
:---|:---|:---
`data` | _[object]_ | **required** - Array of object.
`renderColumnLabels` | _boolean_ | default: `true`. Setting to `false` will skip rendering the labels row
&nbsp; | _function_ | `() => <tr> ... </tr>` - For customizing column headings row
`renderColumnFilters` | _boolean_ | default: `true`. Setting to `false`, will skip rendering the filters row
&nbsp; | _function_ | `(filterColumn) => <tr> ... </tr>` - For customizing column filters row
`tableClassName` | _string_ | `<table className={tableClassName}>`
`theadClassName` | _string_ | `<thead className={theadClassName}>`
`tbodyClassName` | _string_ | `<tbody className={tbodyClassName}>`
`tfootClassName` | _string_ | `<tfoot className={tfootClassName}>`

### `<Column>` Props

Property | Type | Description
:---|:---|:---
`label` | _string_ | Column heading to display.
`labelClassName` | _string_ | `<th className={labelClassName}>`
`field` | _string_ | Field name for displaying value and filter. <br>For nested object, you can use the dot (`.`) notation. (e.g. `name.firstName`)
`filter` | _function_ | `(filterColumn) => { ... }` - If you need to use a different element for filtering. `filterColumn` is a function that you can call to pass a key/value pair to be used for filtering<br>(_e.g._ `<select name="status" onChange={e => filterColumn({ [e.target.name]: e.target.value })}><option value="1">Active</option><option value="0">Inactive</option></select>`)
`filterClassName` | _string_ | `<th className={filterClassName}>`
`cell` | _string_ | Text to display instead of the data
&nbsp; | _function_ | `(row) => { ... }` - Allows you to customize the cell content
 `cellClassName` | _string_ | `<td className={cellClassName}>`
 `className` | _string_ | `<tr className={className}>`

## Todo

- Column sorting
- Pagination
- Dynamic loading of data
- Better docs
- Add tests
- Add more examples
