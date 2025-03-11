export type ButtonProps = {
	buttonText: string,
	onButtonPressed: () => void,
	className?: string
}
export default function Button({buttonText, onButtonPressed, className}: ButtonProps) {
	return (
		<button className={`rounded-md bg-emerald-800 px-2 py-1 text-sm font-semibold text-white shadow-xs hover:bg-emerald-700 ${className ||''}`} onClick={onButtonPressed}>{buttonText}</button>
	);
}
