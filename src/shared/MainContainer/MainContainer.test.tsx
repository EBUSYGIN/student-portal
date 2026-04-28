import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { MainContainer } from './MainContainer';

describe('MainContainer', () => {
  it('renders children inside main element', () => {
    render(<MainContainer>Dashboard</MainContainer>);

    expect(screen.getByRole('main').textContent).toBe('Dashboard');
  });

  it('applies custom className', () => {
    render(<MainContainer className='page-main'>Content</MainContainer>);

    expect(screen.getByRole('main').className).toContain('page-main');
  });
});
