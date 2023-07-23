import React from "react";
import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import Index from "../pages";
import MySavings from "../pages/MySavings.tsx";

const ComponentPreviews = () => {
	return (
		<Previews palette={<PaletteTree/>}>
			<ComponentPreview path="/Index">
				<Index/>
			</ComponentPreview>
			<ComponentPreview path="/MySavings">
				<MySavings/>
			</ComponentPreview>
		</Previews>
	);
};

export default ComponentPreviews;
