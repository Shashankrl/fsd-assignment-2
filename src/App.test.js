import { render, screen } from '@testing-library/react';
import App from './App';

test('renders FSD ASSIGNMENT II heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/FSD ASSIGNMENT II/i);
  expect(headingElement).toBeInTheDocument();
});
