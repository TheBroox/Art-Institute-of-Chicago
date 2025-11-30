import { render, screen } from '@testing-library/react';
import App from "./App";

describe('Root app component', () => {

    test('verify AIC title', () => {
        render( <App/>);
        const image = screen.getAllByText('Art Institute of Chicago');
        expect(image).toHaveLength(1);
    })

    test("verify nav links", () => {
        render( <App/>);
        const navLinks = screen.getAllByTestId('navlink');
        expect(navLinks).toHaveLength(3);
    })

});