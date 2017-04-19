import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { DataTable, Column } from 'react-dtable';

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
            filter={filter => {
              return (
                <input
                  className="form-control"
                  onChange={e => {
                    const input = e.target.value;
                    filter({
                      fullName: row => {
                        const value = `${row.name.first} ${row.name.last}`;
                        return ~value.indexOf(input.trim());
                      },
                    });
                  }}
                />
              );
            }}
            cell={row => `${row.name.first} ${row.name.last}`}
          />
          <Column
            field="gender"
            label="Gender"
            filter={filter => (
              <select
                name="gender"
                className="form-control"
                onChange={e => {
                  const value = e.target.value;
                  filter({
                    gender: row => {
                      return row.gender === value;
                    },
                  });
                }}
              >
                <option value="">All</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            )}
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

      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
