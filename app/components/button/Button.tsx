export type ButtonProps = {
    buttonText: string,
    onButtonPressed: () => void,
    className?: string,
    actionType?: string
}
export default function Button({buttonText, onButtonPressed, className}: ButtonProps) {
    return (
        <button
            className={` ${className || ''} button rounded-md px-2 py-1 text-sm font-semibold shadow-sm text-emerald-50`}
            onClick={onButtonPressed}>
            {buttonText}
        </button>
    );
}
