import Button, {ButtonProps} from "@components/button/Button";
export default function SecondaryButton({buttonText, onButtonPressed, className}: ButtonProps) {
	return <Button buttonText={buttonText} onButtonPressed={onButtonPressed} className={`${className} ring-1 ring-emerald-700 bg-transparent !text-emerald-700`}/>
}
