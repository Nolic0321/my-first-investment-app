import Input from "@components/Input";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

it('should render the component', () => {
    let inputText = "test";
   render(<Input onInputChanged={(value:string)=>{ inputText = value;}} inputText={inputText}/>)
   expect(screen.getByDisplayValue(inputText)).toBeInTheDocument();
});

it('should render a header if one is provided',() =>{
    let inputText = "test";
    let headerText = "$";
    render(<Input onInputChanged={(value:string)=>{ inputText = value;}} inputText={inputText} headerDisplay={headerText}/>)
    expect(screen.getByText(headerText)).toBeInTheDocument();
});

it('should render a footer if one is provided',() =>{
    let inputText = "test";
    let footerText = "USD";
    render(<Input onInputChanged={(value:string)=>{ inputText = value;}} inputText={inputText} footerDisplay={footerText}/>)
    expect(screen.getByText(footerText)).toBeInTheDocument();
});

it('should disable the input if disabled is true',() =>{
    let inputText = "test";
    render(<Input onInputChanged={(value:string)=>{ inputText = value;}} inputText={inputText} disabled={true}/>)
    expect(screen.getByDisplayValue(inputText)).toBeDisabled();
});

it('should take on the type provided',() =>{
    let inputText = "1";
    let type = "number";
    render(<Input onInputChanged={(value:string)=>{ inputText = value;}} inputText={inputText} type={type}/>)
    expect(screen.getByDisplayValue(inputText)).toHaveAttribute("type",type);
});

it('should fired the onInputChanged event when the input is changed',async () =>{
    let inputText = "1";
    const newValue = "2";
    let inputChanged = false;
    render(<Input onInputChanged={()=>{inputChanged = true;}} inputText={inputText}/>)
    const inputElement = screen.getByDisplayValue(inputText);
    await user.type(inputElement,newValue);
    expect(inputChanged).toBeTruthy();
});
