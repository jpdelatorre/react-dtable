import React from 'react';
/**
 * A HOC that takes care of sorting and filtering of data.
 *
 * status: Work in Progress... not in use
 * @param  {Component} WrappedComponent DataTable component that displays the data to the DOM
 * @return {Component}                  Returns the component with additional props passed
 */
const dataHandler = (WrappedComponent) => {
	return class extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				data: [],
			}
		}

		render() {
			return <WrappedComponent
				data={this.state.data}
				loadData={this.loadData}
			/>;
		}

		filterData(filters) {

		}

		sortData(sortOrder) {

		}
	}
};
