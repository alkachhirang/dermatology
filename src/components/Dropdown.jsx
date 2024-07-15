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
        if (selectedOption2 === 'message' && !regex.message2.test(formData.message2)) {
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
        <div className='mt-[55px]'>
            <div className="container xl:max-w-[1164px] px-3 mx-auto">
                <div className="flex flex-row flex-wrap justify-between items-center">
                    <div className="w-[47%]">
                        <div className="flex gap-4 items-center mb-[10px]">
                            <h1 className="font-kaushan font-normal text-lightGreen text-md leading-[144%]">Appointment</h1>
                            <span className="w-[60px] h-[2px] bg-lightGreen"></span>
                        </div>
                        <h2 className="font-archivo text-darkGreen mb-3 capitalize text-5xl font-semibold max-w-[484px] leading-[130%]">Book Your Appointment Now</h2>
                        <p className="font-archivo text-grey font-normal text-base">Have questions or ready to schedule your appointment? Reach out to our friendly team today. <span className="text-lightGreen cursor-pointer">Click here to Instantly Book Online</span></p>
                        <form className="lg:mt-[10px]" onSubmit={handleSubmit}>
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
                                                className="px-[14px] py-[10px]  flex items-center gap-3 text-offgrey text-opacity-70 text-base font-normal font-archivo cursor-pointer hover:bg-lightgrey"
                                                onClick={() => handleOptionSelect('phoneNumber')}
                                            >
                                                <CustomCheckbox checked={selectedOption === 'phoneNumber'} /> Phone call
                                            </div>
                                            <div
                                                className="px-[14px] py-[10px] flex items-center gap-3 text-offgrey text-opacity-70 text-base font-normal font-archivo cursor-pointer hover:bg-lightgrey"
                                                onClick={() => handleOptionSelect('message')}
                                            >  <CustomCheckbox checked={selectedOption === 'message'} />
                                                Secure Message
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="sm:mb-[14px] mb-3">
                                    {selectedOption === 'message' && (
                                        <div className="w-full">
                                            <textarea
                                                required
                                                className="resize-none placeholder:text-offgrey placeholder:!text-opacity-70 bg-offWhite !text-offgrey text-opacity-70 font-archivo text-base font-normal px-[14px] py-[13px] outline-none w-full border-solid border border-lightgrey"
                                                type="text"
                                                placeholder="Message"
                                                id="message"
                                                name="message"
                                                rows="2"
                                                cols="20"
                                                value={formData.message}
                                                onChange={handleChange}
                                                autoComplete="off"
                                            />
                                            {formErrors.message && (
                                                <p className="error-message font-archivo">{formErrors.message}</p>
                                            )}
                                        </div>
                                    )}
                                    {selectedOption === 'phoneNumber' && (
                                        <div className="w-full mb-3 sm:mb-[14px]">
                                            <input
                                                required
                                                className="text-base bg-offWhite !text-offgrey placeholder:text-offgrey placeholder:!text-opacity-70 text-opacity-70 h-[50px] font-archivo font-normal p-[13px] outline-none w-full border-solid border border-lightgrey"
                                                type="text"
                                                placeholder="Phone Number"
                                                id="phoneNumber"
                                                name="phoneNumber"
                                                value={formData.phoneNumber}
                                                onChange={handleChange}
                                                autoComplete="off"
                                            />
                                            {formErrors.phoneNumber && (
                                                <p className="error-message font-archivo">{formErrors.phoneNumber}</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div>
                                <div className="w-full mb-3 sm:mb-[14px] relative">
                                    <div
                                        className="bg-offWhite px-[14px] py-[13px] w-full border-solid border border-lightgrey flex justify-between items-center cursor-pointer"
                                        onClick={() => setDropdownVisible2(!dropdownVisible2)}
                                    >
                                        <p className="text-offgrey text-opacity-70 font-archivo text-base font-normal">{selectedOption2 === 'message' ? 'More information' : 'Appointment'}</p>
                                        <Arrow onClick={() => setDropdownVisible2(!dropdownVisible2)} rotated={dropdownVisible2} />
                                    </div>
                                    {dropdownVisible2 && (
                                        <div className="absolute top-full left-0 bg-white border border-t-transparent border-solid border-lightgrey w-full z-10 transition-all duration-300">
                                            <div
                                                className="px-[14px] py-[10px]  flex items-center gap-3 text-offgrey text-opacity-70 text-base font-normal font-archivo cursor-pointer hover:bg-lightgrey"
                                                onClick={() => handleOptionSelect2('appointment')}
                                            >
                                                <CustomCheckbox checked={selectedOption2 === 'appointment'} /> appointment
                                            </div>
                                            <div
                                                className="px-[14px] py-[10px] flex items-center gap-3 text-offgrey text-opacity-70 text-base font-normal font-archivo cursor-pointer hover:bg-lightgrey"
                                                onClick={() => handleOptionSelect2('message2')}
                                            >  <CustomCheckbox checked={selectedOption2 === 'message2'} />
                                                information
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {selectedOption2 === 'message2' && (
                                    <div className="w-full mb-3 sm:mb-[14px]">
                                        <textarea
                                            required
                                            className="resize-none placeholder:text-offgrey placeholder:!text-opacity-70 bg-offWhite !text-offgrey text-opacity-70 font-archivo text-base font-normal px-[14px] py-[13px] outline-none w-full border-solid border border-lightgrey"
                                            type="text"
                                            placeholder="Information Requested"
                                            id="message2"
                                            name="message2"
                                            rows="2"
                                            cols="20"
                                            value={formData.message2}
                                            onChange={handleChange}
                                            autoComplete="off"
                                        />
                                        {formErrors.message2 && (
                                            <p className="error-message font-archivo">{formErrors.message2}</p>
                                        )}
                                    </div>
                                )}
                                {selectedOption2 === 'appointment' && (
                                    <div className="w-full mb-3 sm:mb-[14px]">
                                        <textarea
                                            required
                                            className="text-base resize-none bg-offWhite !text-offgrey placeholder:text-offgrey placeholder:!text-opacity-70 text-opacity-70 font-archivo font-normal p-[13px] outline-none w-full border-solid border border-lightgrey"
                                            type="text"
                                            placeholder="Comments/Information Requested"
                                            id="appointment"
                                            name="appointment"
                                            rows="3"
                                            cols="20"
                                            value={formData.appointment}
                                            onChange={handleChange}
                                            autoComplete="off"
                                        />
                                        {formErrors.appointment && (
                                            <p className="error-message font-archivo">{formErrors.appointment}</p>
                                        )}
                                    </div>
                                )}
                            </div>
                            {/*-----------------checkbox-------------------*/}
                            <div className="w-full sm:mb-[32px] mb-[40px] p-[9.5px_2px_9.5px_15px] bg-offGreen">
                                <CheckboxGreen
                                    name="box"
                                    checked={formData.box}
                                    onChange={handleChange}
                                >
                                    <span className="text-black text-opacity-70 font-archiv text-sm font-normal leading-[151%]">   "I hereby request to be contacted for the purpose of obtaining general marketing information about the devices / treatments listed above.  I acknowledge that this information is not medical advice, and that any patient-specific advice or informed consent shall only be obtained at a visit with a qualified professional (MD/PA-C) on our staff."
                                    </span> </CheckboxGreen>
                                {formErrors.box && (
                                    <p onChange={handleChange} className="error-message font-plusJkarta">{formErrors.box}</p>
                                )}
                            </div>
                            <button className="w-full flex justify-center">submit</button>
                        </form>
                        {showSuccessPopup && (
                            <div className="success-popup fixed top-[50%] left-[50%] h-[200px] sm:h-[280px] md:h-[350px] w-full max-w-[300px] sm:max-w-[500px] md:max-w-[550px] lg:max-w-[600px] bg-white border border-solid border-darkYellow p-[20px] sm:p-[40px] rounded shadow-[0px_0px_10px_0px_#0000001A] flex justify-center items-center flex-col translate-x-[-50%] translate-y-[-50%] z-[50]">
                                <p className="mb-[40px] text-black text-xl sm:text-3xl font-semibold font-plusJkarta text-center leading-lg">Your form submitted successfully!</p>
                                <div className="flex justify-center items-center">
                                    <div className='w-full'>
                                        <button onClick={handlePopupClose}>close</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="w-[48%]">
                        <Image src="/assets/images/png/appointment.png" alt="appointment-img" width={546} height={769} />
                    </div>
                </div>
            </div>
        </div>
    );
}
