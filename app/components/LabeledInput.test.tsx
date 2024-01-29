import {render, screen} from "@testing-library/react";
import LabeledInput from "@components/LabeledInput";
it('should render a label and input', () => {
    render(<LabeledInput label="test" inputText="test" onInputChanged={()=>{}}/>);
    expect(screen.getByText("test")).toBeInTheDocument();
});
