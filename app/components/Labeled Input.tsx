import Input from "./Input";

export default function LabelledInput({label, inputText, onInputChanged, className, placeholder, footerDisplay, headerDisplay}: { label: string, inputText: string, onInputChanged: (newInput: string) => void, className?: string, placeholder?: string, footerDisplay?:string, headerDisplay:string }) {
    return (
        <div className={`relative bg-white rounded-md px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-indigo-600  ${className||''}`}>
            <label htmlFor="name" className="block text-xs font-medium text-black bg-white">{label}</label>
            <Input inputText={inputText} onInputChanged={onInputChanged} className={` pl-4`} placeholder={placeholder} footerDisplay={footerDisplay} headerDisplay={headerDisplay}/>
        </div>
    );
}
