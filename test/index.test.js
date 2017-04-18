import React from 'react';
import { shallow } from 'enzyme';
import { DataTable } from '../lib';


describe('<DataTable>', () => {
	it('should render null if props.data and props.children are empty', () => {
		const datatable = shallow(<DataTable />);
		expect(datatable.html()).toBeNull();
	});

//	it('should render null if props.data and props.children are empty', () => {
//		const dummyData = [
//			{ name: 'John', email: 'john@example.com'}
//		];
//		const datatable = shallow(<DataTable data={dummyData}/>);
//		expect(datatable.html().).toBeNull();
//	});
//
//	it('should render null if props.data and props.children are empty', () => {
//		const datatable = shallow(<DataTable />);
//		expect(datatable.html()).toBeNull();
//	});
//
//	it('should render null if props.data and props.children are empty', () => {
//		const datatable = shallow(<DataTable />);
//		expect(datatable.html()).toBeNull();
//	});
});
