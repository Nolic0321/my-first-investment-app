import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox-next";
import {PaletteTree} from "./palette";
import Nav from "../app/nav";
import ChildDashboard from "../app/dashboard/child-dashboard/ChildDashboard";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/Nav">
                <Nav/>
            </ComponentPreview>
            <ComponentPreview path="/ChildDashboard">
                <ChildDashboard/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;
