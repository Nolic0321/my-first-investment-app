import React from 'react';

export type InputProps = {
    inputText: string,
    onInputChanged?: (newInput: string) => void,
    onBlur?: (inputValue: string) => void,
    onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void,
    disabled?: boolean,
    className?: string,
    placeholder?: string,
    footerDisplay?: string,
    headerDisplay?: string,
    type?: string,
    inputName?: string
};
export default function Input({ inputText, onInputChanged, disabled, className, placeholder, footerDisplay, headerDisplay, type, inputName, onKeyPress, onBlur }: InputProps) {
    return (
        <div className={'flex text-black relative'}>
            {headerDisplay?
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pr-2 pl-1">
                    {headerDisplay}
                </div> : null}
            <input
                id={inputName}
                disabled={disabled}
                type={type?type:"text"}
                step={"0.01"}
                className={` px-3 block w-full rounded-md  border-0 p-0 text-black placeholder:text-gray-400 focus-visible:outline-hidden sm:text-sm sm:leading-6 hover:bg-emerald-50 ${className || ''} ${headerDisplay?'pl-4':''}`}
                value={inputText}
                onChange={e => onInputChanged && onInputChanged(e.target.value)}
                onBlur={e => onBlur && onBlur((e.target as HTMLInputElement).value)}
                placeholder={placeholder}
                onKeyDown={onKeyPress} />
            {footerDisplay?<div className={'pl-2'}>{footerDisplay}</div>:null}
        </div>

    );
}
