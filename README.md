# react-dtable

`react-dtable` is a DataTable in React component. It allows you to write declarative
data table. It comes with built-in sorting, filtering and pagination.

To install just type `npm install --save react-dtable`

```js
import { DataTable, Column } from 'react-dtable';

class App extends Component {
  render() {
    return (
        <DataTable>
          <Column
            label="ID"
            field="id"
          />
          <Column
            label="name"
            filter={filter => <input type="text" onChange={e => filter({name: e.target.value})} />}
            cell={row => <span><strong>{row.firstName}</strong> {row.lastName}</span>}
          />
        </DataTable>
      );
  }
}
```

### DataTable Props - `<DataTable>`

Property | Type | Description
:---|:---|:---
`data` | _[object]_ | Array of object.
`loadData` | _function_ | Function to invoked for loading data. It passes an option object `this.props.loadData({ pageToLoad, sortOrder, filters })`
`itemsPerPage` | _number_ | Total items to display per page
`renderColumnLabels` | _boolean_ | default: `true`
 | _function_ | If set, will invoke to populate `<thead>`. It should return a `<tr>` element.
`renderColumnFilters` | _boolean_ | default: `true`

### Column Props - `<Column>`

Property | Type | Description
:---|:---|:---
`label` | _string_ | Will be displayed as is
&nbsp;&nbsp;&nbsp; ↳ | _function_ | Uses something
`field` | _string_ | Field name for displaying value and filter
`filter` | _function_ | Using a function signature of `(filter) => {}` <br>**String** - uses the string as keyword
`cell` | _string_ | Text to display
 | _function_ | `(row) => { ... }`
 `cellClassName` | _string_ | `<td className={cellClassName}>...</td>`
 `className` | _string_ | `<tr className={className}>...</tr>`
