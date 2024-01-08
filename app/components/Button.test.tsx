import {render, screen} from "@testing-library/react";
import {expect, it} from "@jest/globals";
import Button from "@components/Button";

it('Should render the button', () => {
    render(<Button buttonText="Click me" onButtonPressed={() => {
    }}/>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
});

it('should call the callback when clicked', () => {
    const mockCallback = jest.fn();
    render(<Button buttonText="Click me" onButtonPressed={mockCallback}/>);
    screen.getByText('Click me').click();
    expect(mockCallback).toHaveBeenCalled();
});

it('should take a className', () => {
    render(<Button buttonText="Click me" onButtonPressed={() => {
    }} className={'bg-red-500'}/>);
    expect(screen.getByText('Click me')).toHaveClass('bg-red-500');
});
