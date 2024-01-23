import Input from "./Input";

export default function LabelledInput({label, inputText, onInputChanged, className, placeholder, footerDisplay, headerDisplay, disabled}: { label: string, inputText: string, onInputChanged: (newInput: string) => void, className?: string, placeholder?: string, footerDisplay?:string, headerDisplay?:string, disabled?: boolean }) {
    return (
        <div className={`relative bg-white rounded-md px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-indigo-600  ${className||''}`}>
            <label htmlFor={"input"} className="block text-xs font-medium text-black bg-white">{label}</label>
            <Input inputName={"input"} inputText={inputText} onInputChanged={onInputChanged} placeholder={placeholder} footerDisplay={footerDisplay} headerDisplay={headerDisplay} disabled={disabled}/>
        </div>
    );
}
