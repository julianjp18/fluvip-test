import React from 'react';
import { render } from '@testing-library/react';
import NewPet from '../NewPet';

test('renders learn react link', () => {
  const { getByText } = render(<NewPet />);
  const linkElement = getByText(/Nueva mascota/i);
  expect(linkElement).toBeInTheDocument();
});

describe('NewPet', () => {
 
    it('passing test', () => {
      expect(true).toBeTruthy();
    })
   
    
    it('failing test', () => {
        expect(false).toBeFalsy();
    })
  })