import Image from "next/image";

export default function Appointment() {
    return (
        <div className='mt-[55px]'>
            <div className="container xl:max-w-[1164px] px-3 mx-auto">
                <div className="flex flex-row flex-wrap justify-between items- center">
                    <div className="w-[47%]">
                        <div className="flex gap-4 items-center mb-[10px]">
                            <h1 className="font-kaushan font-normal text-lightGreen text-md leading-[144%]">Appointment</h1>
                            <span className="w-[60px] h-[2px] bg-lightGreen"></span>
                        </div>
                        <h2 className="font-archivo text-darkGreen mb-3 capitalize text-5xl font-semibold max-w-[484px] leading-[130%]">Book Your Appointment Now</h2>
                    <p className="font-archivo text-grey font-normal text-base">Have questions or ready to schedule your appointment? Reach out to our friendly team today. <span className="text-lightGreen cursor-pointer">Click  here  to  Instantly  Book  Online</span></p>
                    </div>
                    <div className="w-[48%]">
                        <Image src="/assets/images/png/appointment.png" alt="appointment-img" width={546} height={769} />
                    </div>
                </div>
            </div>
        </div>
    );
}