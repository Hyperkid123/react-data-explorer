import * as React from 'react';
import { render, screen } from '@testing-library/react'
import DataExplorer, {
    functions
} from '..';

it('should pass', () => {
    render(<DataExplorer
        apis={[]}
        schema={[]}
        functions={functions}
        onSchemaChange={() => ({})}
    />);
    expect(screen).toBe(true);
    // expect(container).toMatchSnapshot();
});