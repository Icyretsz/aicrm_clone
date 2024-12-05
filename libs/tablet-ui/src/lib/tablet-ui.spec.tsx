import { render } from '@testing-library/react';

import TabletUi from './tablet-ui';

describe('TabletUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TabletUi />);
    expect(baseElement).toBeTruthy();
  });
});
