import type { InputHTMLAttributes } from 'react';

type CheckBoxProps = InputHTMLAttributes<HTMLInputElement>

export default function CheckBox(props: CheckBoxProps) {
    return (
        <input {...props} type='checkbox' className='size-[16px] cursor-pointer relative top-px accent-black'></input>
    )
}