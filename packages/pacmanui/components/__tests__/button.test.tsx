import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../button';

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-slate-900'); // primary variant
  });

  it('renders with different variants', () => {
    const { rerender } = render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-white');

    rerender(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole('button')).toHaveClass('border-slate-900');

    rerender(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole('button')).toHaveClass('hover:bg-slate-100');

    rerender(<Button variant="link">Link</Button>);
    expect(screen.getByRole('button')).toHaveClass('hover:underline');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-9');

    rerender(<Button size="md">Medium</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-10');

    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-11');
  });

  it('handles different states', () => {
    const { rerender } = render(<Button state="loading">Loading</Button>);
    expect(screen.getByRole('button')).toHaveClass('opacity-70');
    expect(screen.getByText('Loading')).toBeInTheDocument();
    expect(screen.getByTestId('loader')).toBeInTheDocument();

    rerender(<Button state="success">Success</Button>);
    expect(screen.getByTestId('check')).toBeInTheDocument();

    rerender(<Button state="error">Error</Button>);
    expect(screen.getByTestId('x')).toBeInTheDocument();

    rerender(<Button state="warning">Warning</Button>);
    expect(screen.getByTestId('alert-triangle')).toBeInTheDocument();

    rerender(<Button state="disabled">Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('renders with full width', () => {
    render(<Button fullWidth>Full Width</Button>);
    expect(screen.getByRole('button')).toHaveClass('w-full');
  });

  it('renders with custom icon', () => {
    const CustomIcon = () => <span data-testid="custom-icon">🌟</span>;
    render(<Button icon={<CustomIcon />}>With Icon</Button>);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Custom Class</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('does not trigger click when disabled', () => {
    const handleClick = jest.fn();
    render(<Button state="disabled" onClick={handleClick}>Disabled</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
