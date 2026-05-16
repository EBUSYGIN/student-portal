import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Select } from './Select';

describe('Select', () => {
  it('renders label, options and error message', () => {
    render(
      <Select label='Тип' error='Обязательное поле'>
        <option value='a'>A</option>
        <option value='b'>B</option>
      </Select>,
    );

    expect(screen.getByText('Тип')).toBeDefined();
    expect(screen.getByRole('combobox')).toBeDefined();
    expect(screen.getByText('Обязательное поле')).toBeDefined();
  });

  it('passes select props and handles change', () => {
    const handleChange = vi.fn();

    render(
      <Select aria-label='Выбор' defaultValue='b' onChange={handleChange}>
        <option value='a'>A</option>
        <option value='b'>B</option>
      </Select>,
    );

    const select = screen.getByLabelText('Выбор');
    expect(select).toBeDefined();
    fireEvent.change(select, { target: { value: 'a' } });
    expect(handleChange).toHaveBeenCalled();
  });
});
