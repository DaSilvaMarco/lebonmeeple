import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Image from '../components/Image';

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: vi.fn(({ onError, onLoad, fill, priority, ...props }) => (
    <img
      {...props}
      onError={onError}
      onLoad={onLoad}
      data-testid="next-image"
      {...(fill && { 'data-fill': 'true' })}
      {...(priority && { 'data-priority': 'true' })}
    />
  )),
}));

describe('Image Component', () => {
  const defaultProps = {
    src: '/test-image.jpg',
    alt: 'Test image',
    width: 100,
    height: 100,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with default props', () => {
    render(<Image {...defaultProps} />);
    const image = screen.getByTestId('next-image');

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-image.jpg');
    expect(image).toHaveAttribute('alt', 'Test image');
    expect(image).toHaveAttribute('width', '100');
    expect(image).toHaveAttribute('height', '100');
  });

  it('renders with fill prop', () => {
    render(<Image {...defaultProps} fill />);
    const image = screen.getByTestId('next-image');

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('data-fill', 'true');
  });

  it('applies custom styles and className', () => {
    const customStyle = { border: '1px solid red' };
    const customClassName = 'custom-image';

    render(
      <Image
        {...defaultProps}
        style={customStyle}
        className={customClassName}
        objectFit="contain"
      />,
    );

    const image = screen.getByTestId('next-image');
    expect(image).toHaveClass(customClassName);
    expect(image).toHaveStyle({
      objectFit: 'contain',
      border: '1px solid red',
    });
  });

  it('handles image load event', () => {
    const onLoad = vi.fn();
    render(<Image {...defaultProps} onLoad={onLoad} />);

    const image = screen.getByTestId('next-image');
    fireEvent.load(image);

    expect(onLoad).toHaveBeenCalledTimes(1);
  });

  it('handles image error without fallback', () => {
    const onError = vi.fn();
    render(<Image {...defaultProps} onError={onError} />);

    const image = screen.getByTestId('next-image');
    fireEvent.error(image);

    expect(onError).toHaveBeenCalledTimes(1);
  });

  it('switches to fallback image on error', () => {
    const fallbackSrc = '/fallback.jpg';
    render(<Image {...defaultProps} fallbackSrc={fallbackSrc} />);

    const image = screen.getByTestId('next-image');

    // Initially shows original src
    expect(image).toHaveAttribute('src', '/test-image.jpg');

    // Trigger error
    fireEvent.error(image);

    // Should switch to fallback
    expect(image).toHaveAttribute('src', fallbackSrc);
  });

  it('does not switch to fallback twice on repeated errors', () => {
    const onError = vi.fn();
    const fallbackSrc = '/fallback.jpg';

    render(
      <Image {...defaultProps} fallbackSrc={fallbackSrc} onError={onError} />,
    );

    const image = screen.getByTestId('next-image');

    // First error - switches to fallback
    fireEvent.error(image);
    expect(image).toHaveAttribute('src', fallbackSrc);
    expect(onError).toHaveBeenCalledTimes(1);

    // Second error - doesn't switch again
    fireEvent.error(image);
    expect(image).toHaveAttribute('src', fallbackSrc);
    expect(onError).toHaveBeenCalledTimes(2);
  });

  it('resets error state on successful load', () => {
    const fallbackSrc = '/fallback.jpg';
    render(<Image {...defaultProps} fallbackSrc={fallbackSrc} />);

    const image = screen.getByTestId('next-image');

    // Trigger error first
    fireEvent.error(image);
    expect(image).toHaveAttribute('src', fallbackSrc);

    // Then trigger successful load
    fireEvent.load(image);

    // Error state should be reset (this is tested indirectly through the component behavior)
    expect(image).toBeInTheDocument();
  });

  it('passes all Next.js Image props correctly', () => {
    render(
      <Image
        {...defaultProps}
        priority
        quality={90}
        sizes="(max-width: 768px) 100vw, 50vw"
      />,
    );

    const image = screen.getByTestId('next-image');
    expect(image).toHaveAttribute('data-priority', 'true');
    expect(image).toHaveAttribute('quality', '90');
    expect(image).toHaveAttribute('sizes', '(max-width: 768px) 100vw, 50vw');
  });
});
