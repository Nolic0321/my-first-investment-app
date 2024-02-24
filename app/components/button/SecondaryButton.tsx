import Button, {ButtonProps} from "@components/button/Button";
export default function SecondaryButton({buttonText, onButtonPressed, className}: ButtonProps) {
	return <Button buttonText={buttonText} onButtonPressed={onButtonPressed} className={`ring-1 dark:ring-emerald-600 ring-emerald-700 bg-transparent dark:text-emerald-600 text-emerald-700 ${className}`}/>
}
