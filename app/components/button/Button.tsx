export type ButtonProps = {
    buttonText: string,
    onButtonPressed: () => void,
    className?: string,
    actionType?: string
}
export default function Button({buttonText, onButtonPressed, className}: ButtonProps) {
    return (
        <button
            className={`button rounded-md px-2 py-1 text-sm font-semibold shadow-sm dark:text-gray-950 text-gray-200 ${className || ''}`}
            onClick={onButtonPressed}>
            {buttonText}
        </button>
    );
}
