import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Select } from '../select';

const mockOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

describe('Select', () => {
  it('renders with default props', () => {
    render(<Select options={mockOptions} />);
    expect(screen.getByText('Select...')).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    render(<Select options={mockOptions} placeholder="Choose an option" />);
    expect(screen.getByText('Choose an option')).toBeInTheDocument();
  });

  it('opens dropdown on click', () => {
    render(<Select options={mockOptions} />);
    fireEvent.click(screen.getByText('Select...'));
    mockOptions.forEach(option => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it('selects an option in single select mode', () => {
    const handleChange = jest.fn();
    render(<Select options={mockOptions} onChange={handleChange} />);
    
    fireEvent.click(screen.getByText('Select...'));
    fireEvent.click(screen.getByText('Option 1'));
    
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(handleChange).toHaveBeenCalledWith('option1');
  });

  it('selects multiple options in multiple select mode', () => {
    const handleChange = jest.fn();
    render(<Select options={mockOptions} multiple onChange={handleChange} />);
    
    fireEvent.click(screen.getByText('Select...'));
    fireEvent.click(screen.getByText('Option 1'));
    fireEvent.click(screen.getByText('Option 2'));
    
    expect(screen.getByText('Option 1, Option 2')).toBeInTheDocument();
    expect(handleChange).toHaveBeenLastCalledWith(['option1', 'option2']);
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Select options={mockOptions} size="sm" />);
    const selectElement = screen.getByText('Select...').closest('div[class*="relative w-full"]');
    expect(selectElement).toHaveClass('text-sm');

    rerender(<Select options={mockOptions} size="lg" />);
    const largeSelectElement = screen.getByText('Select...').closest('div[class*="relative w-full"]');
    expect(largeSelectElement).toHaveClass('text-lg');
  });

  it('renders with different variants', () => {
    const { rerender } = render(<Select options={mockOptions} variant="solid" />);
    const selectElement = screen.getByText('Select...').closest('div[class*="relative w-full"]');
    expect(selectElement).toHaveClass('bg-gray-100');

    rerender(<Select options={mockOptions} variant="underline" />);
    const underlineSelectElement = screen.getByText('Select...').closest('div[class*="relative w-full"]');
    expect(underlineSelectElement).toHaveClass('border-b-2');
  });

  it('handles disabled state', () => {
    render(<Select options={mockOptions} disabled />);
    const selectElement = screen.getByText('Select...').closest('div[class*="relative w-full"]');
    expect(selectElement).toHaveClass('opacity-50', 'cursor-not-allowed');
    
    fireEvent.click(screen.getByText('Select...'));
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
  });

  it('handles searchable functionality', () => {
    render(<Select options={mockOptions} searchable />);
    
    fireEvent.click(screen.getByText('Select...'));
    const searchInput = screen.getByPlaceholderText('Search...');
    expect(searchInput).toBeInTheDocument();
    
    fireEvent.change(searchInput, { target: { value: 'Option 1' } });
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
  });

  it('handles clearable functionality', () => {
    const handleChange = jest.fn();
    render(<Select options={mockOptions} clearable onChange={handleChange} />);
    
    fireEvent.click(screen.getByText('Select...'));
    fireEvent.click(screen.getByText('Option 1'));
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Select...')).toBeInTheDocument();
    expect(handleChange).toHaveBeenLastCalledWith('');
  });

  it('handles different preview modes', () => {
    const { rerender } = render(
      <Select options={mockOptions} preview="tabs" multiple />
    );
    
    fireEvent.click(screen.getByText('Select...'));
    const option = screen.getByText('Option 1');
    fireEvent.click(option);
    
    const tabElement = screen.getByText('Option 1', { selector: 'span.bg-blue-100' });
    expect(tabElement).toHaveClass('bg-blue-100');

    rerender(<Select options={mockOptions} preview="badge" multiple />);
    expect(screen.getByText('1')).toHaveClass('bg-blue-500');

    rerender(<Select options={mockOptions} preview="numbers" multiple />);
    expect(screen.getByText('1 selected')).toBeInTheDocument();
  });

  it('closes dropdown when clicking outside', () => {
    render(<Select options={mockOptions} />);
    
    fireEvent.click(screen.getByText('Select...'));
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    
    fireEvent.mouseDown(document.body);
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Select options={mockOptions} className="custom-class" />);
    const selectWrapper = screen.getByTestId('select-container').parentElement;
    expect(selectWrapper).toHaveClass('custom-class');
  });
});
