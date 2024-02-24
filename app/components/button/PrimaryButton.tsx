import Button, {ButtonProps} from "@components/button/Button";
export default function PrimaryButton({buttonText, onButtonPressed, className}: ButtonProps) {
	return <Button buttonText={buttonText} onButtonPressed={onButtonPressed} className={`dark:bg-emerald-600 bg-emerald-700  ${className}`}/>
}
