import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Card } from './Card';

describe('Card', () => {
  it('renders content and custom className', () => {
    render(<Card className='custom-card'>Card content</Card>);

    const card = screen.getByText('Card content');

    expect(card.className).toContain('custom-card');
  });
});
