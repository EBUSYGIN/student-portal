import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { StatusTag } from './StatusTag';

describe('StatusTag', () => {
  it('renders children and custom className', () => {
    render(
      <StatusTag status='success' className='custom-status'>
        Active
      </StatusTag>,
    );

    const tag = screen.getByText('Active');

    expect(tag.className).toContain('custom-status');
  });
});
