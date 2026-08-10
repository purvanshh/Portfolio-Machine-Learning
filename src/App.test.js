import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./components/ShaderAnimation', () => () => null);

test('renders the portfolio brand', () => {
  render(<App />);
  const brand = screen.getByRole('button', { name: /go to about/i });
  expect(brand).toBeInTheDocument();
  expect(screen.getAllByText('Purvansh Sahu').length).toBeGreaterThan(0);
});
