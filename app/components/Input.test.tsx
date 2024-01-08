import Input from "@components/Input";
import {render, screen} from "@testing-library/react";

it('should render the component', () => {
    let inputText = "test";
   render(<Input onInputChanged={()=>{}} inputText={inputText}/>)
   expect(screen.getByText(inputText)).toBeInTheDocument();
});

