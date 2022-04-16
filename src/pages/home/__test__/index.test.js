import { test } from '@craco/craco/lib/cra';
import React from 'react';
import renderer from 'react-test-renderer';
import Home from '../index';

test('render correctly', () => {
    const tree = renderer.create(<Home />).toJSON();

    expect(tree).toMatchSnapshot();
});
