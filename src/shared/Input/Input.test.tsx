import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Input } from './Input';

vi.mock('../Icon/Icon', () => ({
  Icon: {
    Calendar: ({ className }: { className?: string }) => (
      <svg className={className} data-testid='calendar-icon' />
    ),
  },
}));

describe('Input', () => {
  it('renders label, placeholder and error message', () => {
    render(
      <Input
        label='Birth date'
        placeholder='Select date'
        error='Required field'
      />,
    );

    expect(screen.getByText('Birth date')).toBeDefined();
    expect(screen.getByPlaceholderText('Select date')).toBeDefined();
    expect(screen.getByText('Required field')).toBeDefined();
  });

  it('passes input props and handles changes', () => {
    const handleChange = vi.fn();

    render(
      <Input
        aria-label='Student name'
        defaultValue='Ann'
        onChange={handleChange}
      />,
    );

    const input = screen.getByLabelText('Student name');

    fireEvent.change(input, { target: { value: 'Anna' } });

    expect(input).toHaveProperty('value', 'Anna');
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('renders an icon when icon prop is provided', () => {
    render(<Input aria-label='Date' icon='Calendar' />);

    expect(screen.getByTestId('calendar-icon')).toBeDefined();
  });
});
