export type InputProps = {
    inputText: string,
    onInputChanged: (newInput: string) => void,
    className?: string,
    placeholder?: string,
    footerDisplay?: string
};
export default function Input({ inputText, onInputChanged, className, placeholder, footerDisplay }: InputProps) {
    return (
        <div className={'flex text-black'}>
        <input className={`block w-full border-0 p-0 text-black placeholder:text-gray-400 focus-visible:outline-none sm:text-sm sm:leading-6 hover:bg-emerald-50 ${className || ''}`} value={inputText} onChange={e => onInputChanged(e.target.value)} placeholder={placeholder} />
            {footerDisplay?<div className={'pl-2'}>{footerDisplay}</div>:null}
        </div>

    );
}
