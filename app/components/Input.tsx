export type InputProps = {
    inputText: string,
    onInputChanged: (newInput: string) => void,
    disabled?: boolean,
    className?: string,
    placeholder?: string,
    footerDisplay?: string,
    headerDisplay?: string,
    type?: string,
    inputName?: string
};
export default function Input({ inputText, onInputChanged, disabled, className, placeholder, footerDisplay, headerDisplay, type, inputName }: InputProps) {
    return (
        <div className={'flex text-black relative'}>
            {headerDisplay?
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pr-2 pl-1">
                    {headerDisplay}
                </div> : null}
            <input id={inputName} disabled={disabled} type={type?type:"text"} className={`block w-full border-0 p-0 text-black placeholder:text-gray-400 focus-visible:outline-none sm:text-sm sm:leading-6 hover:bg-emerald-50 ${className || ''} ${headerDisplay?'pl-4':''}`} value={inputText} onChange={e => onInputChanged(e.target.value)} placeholder={placeholder} />
            {footerDisplay?<div className={'pl-2'}>{footerDisplay}</div>:null}
        </div>

    );
}
