import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import JobApplicationForm from '../app/components/JobApplicationForm';
import { useFormStore } from '../app/stores/formStore';

jest.mock('../app/stores/formStore', () => ({
  useFormStore: jest.fn(),
}));

const mockStore = {
  fullName: '',
  email: '',
  yearsOfExperience: 0,
  skills: [],
  setFullName: jest.fn(),
  setEmail: jest.fn(),
  setYearsOfExperience: jest.fn(),
  setSkills: jest.fn(),
};

describe('JobApplicationForm', () => {
  beforeEach(() => {
    (useFormStore as jest.Mock).mockReturnValue(mockStore);
  });

  it('renders the form correctly', () => {
    render(<JobApplicationForm />);

    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Years of Experience')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('shows error message when required fields are empty', async () => {
    render(<JobApplicationForm />);

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText('All fields are required')).toBeInTheDocument();
    });
  });

  it('shows error message for invalid email format', async () => {
    render(<JobApplicationForm />);

    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByLabelText('Years of Experience'), { target: { value: '5' } });
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText('Invalid email format')).toBeInTheDocument();
    });
  });

  it('submits the form with valid data', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Application submitted successfully' }),
      })
    ) as jest.Mock;

    render(<JobApplicationForm />);

    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText('Years of Experience'), { target: { value: '5' } });
    fireEvent.click(screen.getByLabelText('JavaScript'));
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText('Submitted Data')).toBeInTheDocument();
      expect(screen.getByText('Full Name: John Doe')).toBeInTheDocument();
      expect(screen.getByText('Email: john.doe@example.com')).toBeInTheDocument();
      expect(screen.getByText('Years of Experience: 5')).toBeInTheDocument();
      expect(screen.getByText('Skills: JavaScript')).toBeInTheDocument();
    });

    global.fetch.mockRestore();
  });
});
