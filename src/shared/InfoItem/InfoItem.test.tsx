import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { InfoItem } from './InfoItem';

describe('InfoItem', () => {
  it('renders label and value', () => {
    render(<InfoItem label='Group' value='CS-101' />);

    expect(screen.getByText('Group')).toBeDefined();
    expect(screen.getByText('CS-101')).toBeDefined();
  });

  it('applies custom className', () => {
    const { container } = render(
      <InfoItem label='Course' value='Frontend' className='custom-info' />,
    );

    expect(container.firstElementChild?.className).toContain('custom-info');
  });
});
