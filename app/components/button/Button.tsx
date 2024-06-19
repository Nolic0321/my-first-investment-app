type Variant = 'primary' | 'secondary' | 'tertiary';
export type ButtonProps = {
    buttonText: string,
    onButtonPressed: () => void,
    className?: string,
    actionType?: string,
    variant?: Variant
}
export default function Button({buttonText, onButtonPressed, className, variant = 'primary'}: ButtonProps) {
    const variantClassNames: Record<Variant, string> = {
        'primary': 'bg-emerald-700',
        'secondary': 'ring-1 ring-emerald-700 bg-transparent !text-emerald-700',
        'tertiary': 'bg-transparent',
    };

    const variantClassName = variantClassNames[variant] || 'bg-emerald-700';

    return (
        <button
            className={`${className} ${variantClassName} button rounded-md px-2 py-1 text-sm font-semibold shadow-sm`}
            onClick={onButtonPressed}
        >
            {buttonText}
        </button>
    );
}
