'use client';
import React, { useRef, useState, useEffect } from "react";
import { Arrow, CheckSvg } from "./Icon";

const Dropdown = ({ defaultSelected, onSelect, dropdownList }) => {
    const [dropdownActive, setDropdownActive] = useState(false);
    const [selectedOption, setSelectedOption] = useState(defaultSelected);
    const catMenu = useRef(null);

    const closeOpenMenus = (e) => {
        if (
            dropdownActive &&
            catMenu.current &&
            !catMenu.current.contains(e.target)
        ) {
            setDropdownActive(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", closeOpenMenus);
        return () => {
            document.removeEventListener("mousedown", closeOpenMenus);
        };
    }, [dropdownActive]);

    const handleSelect = (value) => {
        setSelectedOption(value);
        if (onSelect) {
            onSelect(value);
        }
        setDropdownActive(false);
    };

    return (
        <div ref={catMenu} className="w-full relative">
            <div
                onClick={() => {
                    setDropdownActive(!dropdownActive);
                }}
                className="flex justify-between items-center border border-black border-opacity-5 px-3.5 py-[13px] cursor-pointer mb-[14px]"
            >
                <p className="text-base font-archivo text-offgrey text-opacity-70 font-normal">
                    {selectedOption || dropdownList[0]} {/* Ensure default fallback */}
                </p>{" "}
                <span
                    className={`common-transition ${dropdownActive ? "rotate-180" : "rotate-0"
                        }`}
                >
                    <Arrow />
                </span>
            </div>
            <div
                className={`flex flex-col gap-[15px] py-[15px] absolute z-10 top-full left-0 w-full border duration-300 border-opacity-5 transition-transform border-black border-t-0 overflow-hidden text-base bg-white text-dove-gray text-opacity-70 ${dropdownActive
                        ? "h-auto opacity-100 visible translate-y-0"
                        : "h-0 opacity-0 invisible -translate-y-5"
                    }`}
            >
                {dropdownList.map((value, index) => (
                    <div key={index} className="w-full px-4">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={selectedOption === value}
                                onChange={() => handleSelect(value)}
                                className="hidden"
                            />
                            <div className="min-w-4 min-h-4 border-[2px] border-lightBlack rounded-sm bg-white flex items-center justify-center pt-[0.5px]">
                                {selectedOption === value ? <CheckSvg /> : ""}
                            </div>
                            <span className="w-full text-offgrey common-transition cursor-pointer text-base text-opacity-70 font-normal">
                                {value}
                            </span>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dropdown;