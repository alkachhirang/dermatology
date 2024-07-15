export const Arrow = ({ onClick, rotated }) => {
    return (
        <svg
            onClick={onClick}
            className={`cursor-pointer transition-all duration-300 ease-linear ${rotated ? 'rotate-180' : ''}`}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M4 7L10 13L16 7" stroke="#696969" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};
  export const CheckSvg = () => {
    return (
        <svg width="12" height="11" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.35238 9.4389L0.109375 5.1949L1.52338 3.7809L4.35238 6.6089L10.0084 0.951904L11.4234 2.3669L4.35238 9.4369V9.4389Z" fill="#929693" />
        </svg>
    );
};
  export const CheckSvg2 = () => {
    return (
        <svg width="11" height="10" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.75055 4.99304L1.24989 2.49696L0 3.745L3.75055 7.49L10 1.24892L8.75099 0L3.75055 4.99304Z" fill="#6E9277"/>
        </svg>
    );
};


    {/* <div className="w-full mb-3 sm:mb-[14px]">
                                <textarea required className="resize-none bg-offWhite !text-offgrey font-archivo text-base font-normal p-[13px] outline-none w-full border-solid border border-lightgrey"
                                        type="text"
                                        placeholder="Secure Message"
                                        id="SecureMessage"
                                        name="SecureMessage"
                                        rows="1"
                                        cols="10"   
                                        value={formData.SecureMessage}
                                        onChange={handleChange}
                                        autoComplete="off"
                                    />
                                    {formErrors.SecureMessage && (
                                        <p className="error-message font-archivo">{formErrors.SecureMessage}</p>
                                    )}
                                </div> */}