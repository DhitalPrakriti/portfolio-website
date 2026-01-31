import { render, screen } from '@testing-library/react';
import App from './App';

test('renders portfolio sections', () => {
  render(<App />);
  const projectsHeading = screen.getByText(/featured projects/i);
  expect(projectsHeading).toBeInTheDocument();
});
