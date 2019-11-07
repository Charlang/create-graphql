import React from 'react';
import { shallow } from 'enzyme';
import Root from './root.component';

it('renders without crashing', () => {
  shallow(<Root />);
});
