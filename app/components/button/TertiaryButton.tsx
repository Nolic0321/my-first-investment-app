import Button, {ButtonProps} from "@components/button/Button";
export default function TertiaryButton({buttonText, onButtonPressed, className}: ButtonProps) {
	return <Button buttonText={buttonText} onButtonPressed={onButtonPressed} className={`${className} bg-transparent`}/>
}
