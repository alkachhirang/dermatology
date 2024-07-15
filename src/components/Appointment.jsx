'use client';
import Image from "next/image";
import { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import CheckboxGreen from "./CheckboxGreen";
import { contact, information } from "./Helper";

const contactOptions = ["Phone Call", "Secure Message"];
const appointmentOptions = ["Appointment", "More Information"];

export default function Appointment() {
    const [formData, setFormData] = useState({
        name: "",
        lastname: "",
        phoneNumber: "",
        message: "",
        appointmentDetail: "",
        box: false,
    });

    const [formErrors, setFormErrors] = useState({
        name: "",
        lastname: "",
        box: "",
    });

    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [selectedContactOption, setSelectedContactOption] = useState(contactOptions[0]); // default option
    const [selectedAppointmentOption, setSelectedAppointmentOption] = useState(appointmentOptions[0]); // default option

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === "phoneNumber") {
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

    const validateForm = () => {
        const regex = {
            name: /^[a-zA-Z\s]+$/,
            lastname: /^[a-zA-Z\s]+$/,
        };
        const errors = {};
        if (!regex.name.test(formData.name)) {
            errors.name = "Name is invalid.";
        }
        if (!regex.lastname.test(formData.lastname)) {
            errors.lastname = "Last Name is invalid.";
        }
        if (!formData.box) {
            errors.box = "You must agree to the terms of services and privacy policy.";
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            try {
                const response = await fetch('/api/submit-form', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    setShowSuccessPopup(true);
                } else {
                    console.error('Form submission failed');
                }
            } catch (error) {
                console.error('Form submission error:', error);
            }
        }
    };

    const handlePopupClose = () => {
        setShowSuccessPopup(false);
        setFormData({
            name: "",
            lastname: "",
            phoneNumber: "",
            message: "",
            appointmentDetail: "",
            box: false,
        });
        setFormErrors({
            name: "",
            lastname: "",
            box: "",
        });
    };

    const handleContactOptionSelect = (option) => {
        setSelectedContactOption(option);
        setFormData((prevFormData) => ({
            ...prevFormData,
            phoneNumber: option === 'Phone' ? '' : prevFormData.phoneNumber,
            message: option === 'Message' ? '' : prevFormData.message,
        }));
    };

    const handleAppointmentOptionSelect = (option) => {
        setSelectedAppointmentOption(option);
        setFormData((prevFormData) => ({
            ...prevFormData,
            appointmentDetail: "",
        }));
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
                            <Dropdown defaultSelected={selectedContactOption} onSelect={handleContactOptionSelect} dropdownList={contactOptions} />
                            {selectedContactOption === "Phone Call" && (
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
                                </div>
                            )}
                            {selectedContactOption === "Secure Message" && (
                                <div className="w-full mb-3 sm:mb-[14px]">
                                    <textarea
                                        required
                                        className="text-base resize-none bg-offWhite !text-offgrey placeholder:text-offgrey placeholder:!text-opacity-70 text-opacity-70 h-[77px] font-archivo font-normal p-[13px] outline-none w-full border-solid border border-lightgrey"
                                        placeholder="Message"
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        autoComplete="off"
                                    />
                                </div>
                            )}
                            <Dropdown defaultSelected={selectedAppointmentOption} onSelect={handleAppointmentOptionSelect} dropdownList={appointmentOptions} />
                            {selectedAppointmentOption === "Appointment" && (
                                <div className="w-full mb-3 sm:mb-[14px]">
                                   <textarea
                                        required
                                        className="text-base resize-none bg-offWhite !text-offgrey placeholder:text-offgrey placeholder:!text-opacity-70 text-opacity-70 h-[106px] font-archivo font-normal p-[13px] outline-none w-full border-solid border border-lightgrey"
                                        type="text"
                                        placeholder="Comments/Information Requested"
                                        id="appointmentDetail"
                                        name="appointmentDetail"
                                        value={formData.appointmentDetail}
                                        onChange={handleChange}
                                        autoComplete="off"
                                    />
                                </div>
                            )}
                            {selectedAppointmentOption === "More Information" && (
                                <div className="w-full mb-3 sm:mb-[14px]">
                                    <input
                                        required
                                        className="text-base bg-offWhite !text-offgrey placeholder:text-offgrey placeholder:!text-opacity-70 text-opacity-70 h-[50px] font-archivo font-normal p-[13px] outline-none w-full border-solid border border-lightgrey"
                                        type="text"
                                        placeholder="information"
                                        id="appointmentDetail"
                                        name="appointmentDetail"
                                        value={formData.appointmentDetail}
                                        onChange={handleChange}
                                        autoComplete="off"
                                    />
                                </div>
                            )}
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
                            <button type="submit" className="text-white border border-solid border-transparent font-archivo text-8md font-medium px-[24px] py-[14px] leading-[112%] bg-lightGreen uppercase hover:border-lightGreen hover:bg-transparent hover:text-lightGreen transition-all duration-300 ease-linear">Contact Us</button>
                        </form>
                        {showSuccessPopup && (
                            <div className="success-popup fixed top-[50%] left-[50%] h-[200px] sm:h-[280px] md:h-[350px] w-full max-w-[300px] sm:max-w-[500px] md:max-w-[550px] lg:max-w-[600px] bg-white border border-solid border-lightGreen p-[20px] sm:p-[40px] rounded shadow-[0px_0px_10px_0px_#0000001A] flex justify-center items-center flex-col translate-x-[-50%] translate-y-[-50%] z-[50]">
                                <p className="mb-[40px] text-lightGreen text-xl sm:text-3xl font-semibold font-archivo text-center leading-lg">Submit successfully!</p>
                                <div className="flex justify-center items-center">
                                    <div className='w-full'>
                                        <button onClick={handlePopupClose} className="text-white border border-solid border-transparent font-archivo text-8md font-medium px-[24px] py-[14px] leading-[112%] bg-lightGreen uppercase hover:border-lightGreen hover:bg-transparent hover:text-lightGreen transition-all duration-300 ease-linear">OK</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="lg:w-[48%] w-full lg:order-2 order-1">
                        <Image src="/assets/images/png/appointment.png" alt="appointment-img" width={546} height={769} className="lg:w-[546px] lg:h-[769px] w-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}
