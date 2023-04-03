import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'providers';
import { describe, expect, test } from 'vitest';
import { Button } from '../Button';

describe('Button test render', () => {
  test('Simple render', () => {
    render(
      <ThemeProvider>
        <Button>Hello world</Button>
      </ThemeProvider>,
    );
    expect(screen.getByText(/Hello world/i)).toBeDefined();
  });
});
