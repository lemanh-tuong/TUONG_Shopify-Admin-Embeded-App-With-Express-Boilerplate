import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'providers';
import { describe, expect, test } from 'vitest';
import { AsyncComponent } from '../AsyncComponent';

describe('AsyncComponent test render with statuses', () => {
  test('Render "idle" status', () => {
    render(<AsyncComponent status="idle" Idle={<h1>Idle</h1>} Success={<h1>Success</h1>} />);
    expect(screen.getByText(/Idle/i)).toBeDefined();
  });
  test('Render "request" status', () => {
    render(<AsyncComponent status="loading" Request={<h1>Request</h1>} Success={<h1>Success</h1>} />);
    expect(screen.getByText(/Request/i)).toBeDefined();
  });
  test('Render "success" status', () => {
    render(
      <ThemeProvider>
        <AsyncComponent status="success" Success={<h1>Success</h1>} />
      </ThemeProvider>,
    );
    expect(screen.getByText(/Success/i)).toBeDefined();
  });
  test('Render "failure" status', () => {
    render(
      <ThemeProvider>
        <AsyncComponent status="failure" Failure={<h1>Failure</h1>} Success={<h1>Success</h1>} />
      </ThemeProvider>,
    );
    expect(screen.getByText(/Failure/i)).toBeDefined();
  });
  test('Render "empty" status', () => {
    render(
      <ThemeProvider>
        <AsyncComponent status="success" isEmpty Empty={<h1>Empty</h1>} Success={<h1>Success</h1>} />
      </ThemeProvider>,
    );
    expect(screen.getByText(/Empty/i)).toBeDefined();
  });
});
