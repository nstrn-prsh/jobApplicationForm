import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DarkModeToggle from '../../src/app/components/DarkModeToggle';
import { useFormStore } from '../../src/app/stores/formStore';

jest.mock('../../src/app/stores/formStore', () => ({
  useFormStore: jest.fn(),
}));

const mockStore = {
  darkMode: false,
  toggleDarkMode: jest.fn(),
};

describe('DarkModeToggle', () => {
  beforeEach(() => {
    (useFormStore as jest.Mock).mockReturnValue(mockStore);
  });

  it('renders the button correctly', () => {
    render(<DarkModeToggle />);
    
    expect(screen.getByText('Switch to Dark Mode')).toBeInTheDocument();
  });

  it('toggles dark mode on button click', () => {
    render(<DarkModeToggle />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockStore.toggleDarkMode).toHaveBeenCalled();
  });

  it('displays correct text when dark mode is enabled', () => {
    mockStore.darkMode = true;
    render(<DarkModeToggle />);

    expect(screen.getByText('Switch to Light Mode')).toBeInTheDocument();
  });
});
