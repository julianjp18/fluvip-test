import {React, Counter} from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Visualiza a todas las mascotas de Fluvip Pet/i);
  expect(linkElement).toBeInTheDocument();
});