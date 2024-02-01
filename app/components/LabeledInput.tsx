import Input from "./Input";

export type LabelledInputProps = {
    label: string;
    inputText: string;
    onInputChanged: (newInput: string) => void;
    className?: string;
    placeholder?: string;
    footerDisplay?:string;
    headerDisplay?:string;
    disabled?: boolean;
    name: string;
    type?: string;
}

export default function LabelledInput({label, inputText, onInputChanged, className, placeholder, footerDisplay, headerDisplay, disabled, name, type}: LabelledInputProps) {
    return (
        <div className={`relative bg-white rounded-md px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-emerald-700  ${className||''}`}>
            <label htmlFor={name} className="block text-xs font-medium text-black bg-white">{label}</label>
            <Input className={'px-0'} type={type} inputName={name} inputText={inputText} onInputChanged={onInputChanged} placeholder={placeholder} footerDisplay={footerDisplay} headerDisplay={headerDisplay} disabled={disabled}/>
        </div>
    );
}
