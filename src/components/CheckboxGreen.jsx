import React from 'react';
import { CheckSvg2 } from './Icon';

const CheckboxGreen = ({ name, checked, onChange }) => {
    return (
        <label className="flex gap-[10px] cursor-pointer items-start">
            <input
                required
                type="checkbox"
                name={name}
                className="hidden"
                checked={checked}
                onChange={onChange}
            />
            <span className={`w-[18px] h-[18px] border-[2.5px] border-cGreen rounded-sm flex-shrink-0 flex justify-center items-center ${checked ? 'bg-offWhite' : ''}`}>
                {checked && (
                    <CheckSvg2 />
                )}
            </span>
            <span className="text-black text-opacity-70 font-archivo text-sm font-normal leading-[151%] mt-[- 4px]">"I hereby request to be contacted for the purpose of obtaining general marketing information about the devices / treatments listed above.  I acknowledge that this information is not medical advice, and that any patient-specific advice or informed consent shall only be obtained at a visit with a qualified professional (MD/PA-C) on our staff."
            </span>
        </label>
    );
};
export default CheckboxGreen;