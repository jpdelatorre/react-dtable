import React from 'react';
import { DataTable } from '../lib';

test('DataTable', () => {
  const component = <DataTable data={['test']} />
  expect(component.props).toBe(JSON.stringify({data: ['test']}));
});
