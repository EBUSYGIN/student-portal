import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Title } from './Title';

describe('Title', () => {
  it('renders requested heading level', () => {
    render(
      <Title type='h2' size='l'>
        Student profile
      </Title>,
    );

    expect(
      screen.getByRole('heading', { level: 2, name: 'Student profile' }),
    ).toBeDefined();
  });

  it('applies custom className', () => {
    render(
      <Title type='h3' size='s' className='custom-title'>
        Details
      </Title>,
    );

    expect(screen.getByRole('heading', { level: 3 }).className).toContain(
      'custom-title',
    );
  });
});
