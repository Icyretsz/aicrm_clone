import { render } from '@testing-library/react';

import WebFeature from './web-feature';

describe('WebFeature', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WebFeature />);
    expect(baseElement).toBeTruthy();
  });
});
