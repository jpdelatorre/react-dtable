import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { DataTable, Column } from 'react-dtable';

const Pagination = props => {
  return (
    <div>
      <span>Pagination</span>
    </div>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentWillMount() {
    fetch(`https://randomuser.me/api/?results=50`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw 'Something is wrong';
        }
      })
      .then(json => {
        if (json.results) {
          this.setState({ data: json.results });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <div className="container">
        <br />

        <pre>
          {
            `const contactList = [];

<DataTable data={contactList}>
  <Column label="Username" field="login.username" />
  <Column label="Full Name" field="name" cell={row => (\`\${row.first} \${row.last}\`} />
  <Column label="Email" field="email" />	
</DataTable>`
          }
        </pre>

        <DataTable
          data={this.state.data}
          tableClassName="table table-bordered"
          theadClassName="thead"
          tbodyClassName="tbody"
          tfootClassName="tfoot"
        >
          <Column label="Username" field="login.username" />
          <Column
            label="Full Name"
            cell={row => `${row.name.first} ${row.name.last}`}
          />
          <Column
            field="email"
            label="Email"
            labelClassName=""
            filter="email"
            filterClassName=""
            cell=""
            cellClassName=""
          />
        </DataTable>

        {/*
        <DataTable data={this.state.data}>
          {[{ l: 'Email', f: 'email' }, { l: 'Name', f: 'name.last' }].map((
            item,
            i,
          ) => <Column key={i} label={item.l} field={item.f} />)}
        </DataTable>
        */}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
