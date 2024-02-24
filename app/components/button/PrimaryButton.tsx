import Button, {ButtonProps} from "@components/button/Button";
export default function PrimaryButton({buttonText, onButtonPressed, className}: ButtonProps) {
	return <Button buttonText={buttonText} onButtonPressed={onButtonPressed} className={`${className} bg-emerald-700 `}/>
}
