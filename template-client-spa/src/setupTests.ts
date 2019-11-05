import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import 'jest-localstorage-mock';

window.fetch = jest.fn();

configure({ adapter: new Adapter() });
