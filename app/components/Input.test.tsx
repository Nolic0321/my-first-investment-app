import Input from "@components/Input";
import {render, screen} from "@testing-library/react";

it('should render the component', () => {
    let inputText = "test";
   render(<Input onInputChanged={(value:string)=>{ inputText = value;}} inputText={inputText}/>)
   expect(screen.getByDisplayValue(inputText)).toBeInTheDocument();
});

