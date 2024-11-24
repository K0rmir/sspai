import { render, screen } from '@test-utils';
import { VisualScorer } from './VisualScorer';

describe('Welcome component', () => {
  it('has correct Vite guide link', () => {
    render(<VisualScorer/>);
    expect(screen.getByText('this guide')).toHaveAttribute(
      'href',
      'https://mantine.dev/guides/vite/'
    );
  });
});
