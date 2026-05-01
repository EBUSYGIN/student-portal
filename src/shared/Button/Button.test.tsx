import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Button } from './Button';

vi.mock('../Icon/Icon', () => ({
  Icon: {
    Calendar: () => <svg data-testid='calendar-icon' />,
  },
}));

describe('Button', () => {
  it('renders children and passes native button props', () => {
    const handleClick = vi.fn();

    render(
      <Button size='l' type='button' onClick={handleClick}>
        Save
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Save' });

    fireEvent.click(button);

    expect(button).toHaveProperty('type', 'button');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders an icon when icon prop is provided', () => {
    render(
      <Button size='s' icon='Calendar'>
        Pick date
      </Button>,
    );

    expect(screen.getByTestId('calendar-icon')).toBeDefined();
  });
});
