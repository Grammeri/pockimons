import React from 'react';
import { render } from '@testing-library/react';
import MyDocument from '../../pages/_document';
import { vi } from 'vitest';
import { DocumentProps } from 'next/document';

vi.mock('next/document', async (importOriginal) => {
  const original = await importOriginal();
  return {
    __esModule: true,
    ...original,
    Html: (props: DocumentProps) => <html {...props} />,
    Head: (props: DocumentProps) => <head {...props} />,
    Main: (props: DocumentProps) => <main {...props} />,
    NextScript: (props: DocumentProps) => <script {...props} />,
  };
});

describe('Custom Document', () => {
  it('renders the custom document correctly', () => {
    const { container } = render(<MyDocument />);
    expect(container.querySelector('html')).toBeInTheDocument();
    expect(container.querySelector('head')).toBeInTheDocument();
    expect(container.querySelector('main')).toBeInTheDocument();
    expect(container.querySelector('script')).toBeInTheDocument();
  });
});
