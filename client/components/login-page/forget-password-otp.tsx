"use client"

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"

import { useState } from "react"

export default function ForgetPasswordOtp() {
    const [value,  setValue] = useState("")
    const [isValid, setIsValid] = useState(false)

    const onComplete = () => {
        setIsValid(value === "123456")
    }

    return (
        <>
        <InputOTP 
        maxLength={6} value={value} onChange={(value) => {
            setValue(value)
        }}
        onComplete={onComplete}>
            <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
            </InputOTPGroup>
        </InputOTP>
        {isValid && <span>AI simmmm</span>}
        </>
    )
}