import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Loader } from './Loader';

describe('Loader', () => {
  it('renders custom loading text', () => {
    render(<Loader text='Loading profile...' />);

    expect(screen.getByText('Loading profile...')).toBeDefined();
  });

  it('applies custom className to root element', () => {
    const { container } = render(<Loader text='Loading' className='wide' />);

    expect(container.firstElementChild?.className).toContain('wide');
  });
});
