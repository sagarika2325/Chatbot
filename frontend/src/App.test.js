import { render, screen } from '@testing-library/react';
import App from './App';
import Chatbot from "./components/Chatbot/Chatbot";



test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
