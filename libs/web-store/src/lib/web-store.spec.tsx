import { render } from '@testing-library/react';

import WebStore from './web-store';

describe('WebStore', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WebStore />);
    expect(baseElement).toBeTruthy();
  });
});
