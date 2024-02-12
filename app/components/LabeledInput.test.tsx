import {fireEvent, render, screen} from "@testing-library/react";
import LabeledInput from "@components/LabeledInput";
import Input from "@components/Input";

it('should render a label and input', () => {
    render(<LabeledInput name={'test'} label="test" inputText="test" onInputChanged={()=>{}}/>);
    expect(screen.getByText("test")).toBeInTheDocument();
});



it('should respond to the onKeyPress event',async () =>{
    let inputText = "1";
    let enterPressed = false;
    render(<Input onInputChanged={()=>{}} inputText={inputText} onKeyPress={(e)=>{if(e.key === 'Enter'){enterPressed = true}}}/>)
    const inputElement = screen.getByDisplayValue(inputText);
    fireEvent.keyDown(inputElement,{key:'Enter',code:'Enter'});
    expect(enterPressed).toBeTruthy();
});
