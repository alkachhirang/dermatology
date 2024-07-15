
'use client';
import Image from "next/image";
import { useState, useEffect } from "react";
import { Arrow } from "./Icon";
import CustomCheckbox from "./CustomCheckbox";
import CheckboxGreen from "./CheckboxGreen";

export default function Appointment() {
    const [formData, setFormData] = useState({
        name: "",
        lastname: "",
        SecureMessage: "",
        message: "",
        phoneNumber: "",
        MoreInformation: "",
        message2: "",
        appointment: "",
        box: false,
    });
    const [formErrors, setFormErrors] = useState({
        name: "",
        lastname: "",
        SecureMessage: "",
        message: "",
        phoneNumber: "",
        MoreInformation: "",
        message2: "",
        appointment: "",
        box: "",
    });
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState('message');
    const [dropdownVisible2, setDropdownVisible2] = useState(false);
    const [selectedOption2, setSelectedOption2] = useState('message2');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === "phoneNumber") {
            // Only allow digits and ensure the length is at most 10
            const cleanedValue = value.replace(/\D/g, "").slice(0, 10);
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: cleanedValue,
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const regex = {
            name: /^[a-zA-Z\s]+$/,
            lastname: /^[a-zA-Z\s]+$/,
            SecureMessage: /^\S+/,
            message: /^\S+/,
            phoneNumber: /^[0-9]{10}$/,
            MoreInformation: /^\S+/,
            message2: /^\S+/,
            appointment: /^\S+/,
        };
        const errors = {};
        if (!regex.name.test(formData.name)) {
            errors.name = "Name is invalid.";
        }
        if (!regex.lastname.test(formData.lastname)) {
            errors.lastname = "Last Name is invalid.";
        }
        if (!regex.SecureMessage.test(formData.SecureMessage)) {
            errors.SecureMessage = "SecureMessage is invalid.";
        }
        if (selectedOption === 'message' && !regex.message.test(formData.message)) {
            errors.message = "Message is invalid.";
        }
        if (selectedOption === 'phoneNumber' && !regex.phoneNumber.test(formData.phoneNumber)) {
            errors.phoneNumber = "Phone number is invalid.";
        }
        if (!regex.MoreInformation.test(formData.MoreInformation)) {
            errors.MoreInformation = "MoreInformation is invalid.";
        }
        if (selectedOption2 === 'message2' && !regex.message2.test(formData.message2)) {
            errors.message2 = "Message2 is invalid.";
        }
        if (selectedOption2 === 'appointment' && !regex.appointment.test(formData.appointment)) {
            errors.appointment = "appointment  is invalid.";
        }
        if (!formData.box) {
            errors.box = "You must agree to the terms of services and privacy policy.";
        }
        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
            setShowSuccessPopup(true);
        }
    };

    const handlePopupClose = () => {
        setShowSuccessPopup(false);
        setFormData({
            name: "",
            lastname: "",
            SecureMessage: "",
            message: "",
            phoneNumber: "",
            MoreInformation: "",
            message2: "",
            appointment: "",
            box: false,
        });
        setFormErrors({
            name: "",
            lastname: "",
            SecureMessage: "",
            message: "",
            phoneNumber: "",
            MoreInformation: "",
            message2: "",
            appointment: "",
            box: "",
        });
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setFormData((prevFormData) => ({
            ...prevFormData,
            message: option === 'phoneNumber' ? '' : prevFormData.message,
            phoneNumber: option === 'message' ? '' : prevFormData.phoneNumber,
        }));
        setDropdownVisible(false);
    };

    const handleOptionSelect2 = (option) => {
        setSelectedOption2(option);
        setFormData((prevFormData) => ({
            ...prevFormData,
            message2: option === 'appointment' ? '' : prevFormData.message2,
            appointment: option === 'message2' ? '' : prevFormData.appointment,
        }));
        setDropdownVisible2(false);
    };

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (!e.target.closest(".success-popup")) {
                handlePopupClose();
            }
        };
        if (showSuccessPopup) {
            document.addEventListener("mousedown", handleOutsideClick);
        } else {
            document.removeEventListener("mousedown", handleOutsideClick);
        }

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [showSuccessPopup]);

    return (
        <div className='mt-[55px] mb-[54px]'>
            <div className="container xl:max-w-[1164px] px-3 mx-auto">
                <div className="flex flex-row flex-wrap justify-between items-center">
                    <div className="lg:w-[47.81%] w-full lg:order-1 order-2">
                        <div className="flex gap-4 items-center justify-center lg:justify-start mb-[10px]">
                            <h1 className="font-kaushan font-normal text-lightGreen text-md leading-[144%]">Appointment</h1>
                            <span className="w-[60px] h-[2px] bg-lightGreen"></span>
                        </div>
                        <h2 className="font-archivo text-darkGreen mb-3 uppercase text-5xl font-semibold lg:max-w-[484px] leading-[130%] text-center lg:text-start">Book Your Appointment Now</h2>
                        <p className="font-archivo text-grey font-normal text-base text-center lg:text-start">Have questions or ready to schedule your appointment? Reach out to our friendly team today. <span className="text-lightGreen cursor-pointer">Click here to Instantly Book Online</span></p>
                        <form className="mt-[24px]" onSubmit={handleSubmit}>
                            <div className='flex sm:flex-row flex-col sm:gap-4'>
                                <div className="lg:max-w-[265px] w-full mb-3 sm:mb-[14px]">
                                    <input
                                        required
                                        className="text-base bg-offWhite !text-offgrey placeholder:text-offgrey placeholder:!text-opacity-70 text-opacity-70 h-[50px] font-archivo font-normal p-[13px] outline-none w-full border-solid border border-lightgrey"
                                        type="text"
                                        placeholder="First Name"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        autoComplete="off"
                                    />
                                    {formErrors.name && (
                                        <p className="error-message font-archivo">{formErrors.name}</p>
                                    )}
                                </div>
                                <div className="lg:max-w-[265px] w-full mb-3 sm:mb-[14px]">
                                    <input
                                        required
                                        className="text-base bg-offWhite !text-offgrey placeholder:text-offgrey placeholder:!text-opacity-70 text-opacity-70 h-[50px] font-archivo font-normal p-[13px] outline-none w-full border-solid border border-lightgrey"
                                        type="text"
                                        placeholder="Last Name"
                                        id="lastname"
                                        name="lastname"
                                        value={formData.lastname}
                                        onChange={handleChange}
                                        autoComplete="off"
                                    />
                                    {formErrors.lastname && (
                                        <p className="error-message font-archivo">{formErrors.lastname}</p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <div className="w-full mb-3 sm:mb-[14px] relative">
                                    <div
                                        className="bg-offWhite px-[14px] py-[13px] w-full border-solid border border-lightgrey flex justify-between items-center cursor-pointer"
                                        onClick={() => setDropdownVisible(!dropdownVisible)}
                                    >
                                        <p className="text-offgrey text-opacity-70 font-archivo text-base font-normal">{selectedOption === 'message' ? 'Secure Message' : 'Phone call'}</p>
                                        <Arrow onClick={() => setDropdownVisible(!dropdownVisible)} rotated={dropdownVisible} />
                                    </div>
                                    {dropdownVisible && (
                                        <div className="absolute top-full left-0 bg-white border border-t-transparent border-solid border-lightgrey w-full z-10">
                                            <div
                                                className="bg-offWhite px-[14px] py-[13px] w-full border-b border-b-lightgrey cursor-pointer"
                                                onClick={() => handleOptionSelect('message')}
                                            >
                                                <p className="text-offgrey text-opacity-70 font-archivo text-base font-normal">Secure Message</p>
                                            </div>
                                            <div
                                                className="bg-offWhite px-[14px] py-[13px] w-full cursor-pointer"
                                                onClick={() => handleOptionSelect('phoneNumber')}
                                            >
                                                <p className="text-offgrey text-opacity-70 font-archivo text-base font-normal">Phone call</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="w-full mb-3 sm:mb-[14px]">
                                    {selectedOption === 'message' && (
                                        <input
                                            required
                                            className="text-base bg-offWhite !text-offgrey placeholder:text-offgrey placeholder:!text-opacity-70 text-opacity-70 h-[50px] font-archivo font-normal p-[13px] outline-none w-full border-solid border border-lightgrey"
                                            type="text"
                                            placeholder="Secure Message"
                                            id="SecureMessage"
                                            name="SecureMessage"
                                            value={formData.SecureMessage}
                                            onChange={handleChange}
                                            autoComplete="off"
                                        />
                                    )}
                                    {selectedOption === 'phoneNumber' && (
                                        <input
                                            required
                                            className="text-base bg-offWhite !text-offgrey placeholder:text-offgrey placeholder:!text-opacity-70 text-opacity-70 h-[50px] font-archivo font-normal p-[13px] outline-none w-full border-solid border border-lightgrey"
                                            type="tel"
                                            placeholder="Phone Number"
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            autoComplete="off"
                                        />
                                    )}
                                    {selectedOption === 'message' && formErrors.SecureMessage && (
                                        <p className="error-message font-archivo">{formErrors.SecureMessage}</p>
                                    )}
                                    {selectedOption === 'phoneNumber' && formErrors.phoneNumber && (
                                        <p className="error-message font-archivo">{formErrors.phoneNumber}</p>
                                    )}
                                </div>
                            </div>
                            <div className="w-full mb-3 sm:mb-[14px]">
                                <input
                                    required
                                    className="text-base bg-offWhite !text-offgrey placeholder:text-offgrey placeholder:!text-opacity-70 text-opacity-70 h-[50px] font-archivo font-normal p-[13px] outline-none w-full border-solid border border-lightgrey"
                                    type="text"
                                    placeholder="More Information"
                                    id="MoreInformation"
                                    name="MoreInformation"
                                    value={formData.MoreInformation}
                                    onChange={handleChange}
                                    autoComplete="off"
                                />
                                {formErrors.MoreInformation && (
                                    <p className="error-message font-archivo">{formErrors.MoreInformation}</p>
                                )}
                            </div>
                            <div>
                                <div className="w-full mb-3 sm:mb-[14px] relative">
                                    <div
                                        className="bg-offWhite px-[14px] py-[13px] w-full border-solid border border-lightgrey flex justify-between items-center cursor-pointer"
                                        onClick={() => setDropdownVisible2(!dropdownVisible2)}
                                    >
                                        <p className="text-offgrey text-opacity-70 font-archivo text-base font-normal">{selectedOption2 === 'message2' ? 'Message2' : 'appointment'}</p>
                                        <Arrow onClick={() => setDropdownVisible2(!dropdownVisible2)} rotated={dropdownVisible2} />
                                    </div>
                                    {dropdownVisible2 && (
                                        <div className="absolute top-full left-0 bg-white border border-t-transparent border-solid border-lightgrey w-full z-10">
                                            <div
                                                className="bg-offWhite px-[14px] py-[13px] w-full border-b border-b-lightgrey cursor-pointer"
                                                onClick={() => handleOptionSelect2('message2')}
                                            >
                                                <p className="text-offgrey text-opacity-70 font-archivo text-base font-normal">Message2</p>
                                            </div>
                                            <div
                                                className="bg-offWhite px-[14px] py-[13px] w-full cursor-pointer"
                                                onClick={() => handleOptionSelect2('appointment')}
                                            >
                                                <p className="text-offgrey text-opacity-70 font-archivo text-base font-normal">appointment</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="w-full mb-3 sm:mb-[14px]">
                                    {selectedOption2 === 'message2' && (
                                        <input
                                            required
                                            className="text-base bg-offWhite !text-offgrey placeholder:text-offgrey placeholder:!text-opacity-70 text-opacity-70 h-[50px] font-archivo font-normal p-[13px] outline-none w-full border-solid border border-lightgrey"
                                            type="text"
                                            placeholder="Message2"
                                            id="message2"
                                            name="message2"
                                            value={formData.message2}
                                            onChange={handleChange}
                                            autoComplete="off"
                                        />
                                    )}
                                    {selectedOption2 === 'appointment' && (
                                        <input
                                            required
                                            className="text-base bg-offWhite !text-offgrey placeholder:text-offgrey placeholder:!text-opacity-70 text-opacity-70 h-[50px] font-archivo font-normal p-[13px] outline-none w-full border-solid border border-lightgrey"
                                            type="text"
                                            placeholder="appointment"
                                            id="appointment"
                                            name="appointment"
                                            value={formData.appointment}
                                            onChange={handleChange}
                                            autoComplete="off"
                                        />
                                    )}
                                    {selectedOption2 === 'message2' && formErrors.message2 && (
                                        <p className="error-message font-archivo">{formErrors.message2}</p>
                                    )}
                                    {selectedOption2 === 'appointment' && formErrors.appointment && (
                                        <p className="error-message font-archivo">{formErrors.appointment}</p>
                                    )}
                                </div>
                            </div>
                            <div className="w-full flex items-start gap-2 mb-3 sm:mb-[14px]">
                                <CustomCheckbox id="box" name="box" checked={formData.box} onChange={handleChange} />
                                <label htmlFor="box" className="text-offgrey text-opacity-70 font-archivo text-base font-normal">I agree to the <span className="text-lightGreen">terms of services</span> and <span className="text-lightGreen">privacy policy</span></label>
                            </div>
                            {formErrors.box && (
                                <p className="error-message font-archivo">{formErrors.box}</p>
                            )}
                            <div className="w-full">
                                <button
                                    type="submit"
                                    className="bg-darkGreen text-white text-base font-archivo font-semibold py-[13px] px-[54px] uppercase"
                                >
                                    Contact us
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="lg:w-[47.81%] w-full order-1 lg:order-2 mb-[30px] lg:mb-0">
                        <Image
                            src="/appointment.jpg"
                            alt="Appointment"
                            width={581}
                            height={693}
                            layout="responsive"
                        />
                    </div>
                </div>
            </div>
            {showSuccessPopup && (
                <div className="success-popup fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg text-center">
                        <h2 className="text-xl font-semibold mb-4">Success!</h2>
                        <p className="mb-4">Your form has been successfully submitted.</p>
                        <button
                            className="bg-darkGreen text-white py-2 px-4 rounded"
                            onClick={handlePopupClose}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
