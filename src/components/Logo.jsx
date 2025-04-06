import React from 'react'

const Logo = ({value}) => {
    return (
        <div className="w-full flex flex-col items-center">
            <div className={`w-full flex justify-center items-center mb-${value}`}>
                <h1 className="text-4xl font-extrabold text-[#0077B6] text-center">
                    Doctor<span className="font-normal text-[#34A0A4]">Desk</span>
                </h1>
            </div>    
        </div>
    )
}

export default Logo