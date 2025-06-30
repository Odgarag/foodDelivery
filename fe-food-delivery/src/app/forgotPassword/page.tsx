'use client'

import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { redirect, useRouter } from 'next/navigation'
import { Right } from './_components/Right'
import { ResetPass } from './_components/ResetPass'
import { Otp } from './_components/Otp'
import { Create } from './_components/Create'
import { useAuth } from '../_components/UserProvider'

const validationSchema = Yup.object({
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  code: Yup.string()
    .required('Verification code is required')
    .matches(/^\d{4}$/, 'Code must be exactly 4 digits'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[0-9]/, 'Password must contain a number')
    .matches(/[a-z]/, 'Password must contain a lowercase letter')
    .required('Password is required'),
  confirm: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm your password'),
})

const Forgot = () => {
  const { user } = useAuth()
  const [step, setStep] = useState(1)
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      email: '',
      code: '',
      password: '',
      confirm: '',
    },
    validationSchema,
    onSubmit: (values) => {
      // console.log('Submitted:', values)
      router.push('/login')
    },
  })

  const nextStep = () => setStep((prev) => prev + 1)
  const prevStep = () => setStep((prev) => prev - 1)

  if (user) {
    redirect('/')
  }

  return (
    <div className="flex justify-between items-center h-screen">
      <div className="flex-1/5 flex justify-center">
        {step === 1 && <ResetPass formik={formik} nextStep={nextStep} />}
        {step === 2 && (
          <Otp formik={formik} nextStep={nextStep} prevStep={prevStep} />
        )}
        {step === 3 && <Create formik={formik} prevStep={prevStep} />}
      </div>
      <div className="flex-2/5 h-full p-[10px]">
        <Right />
      </div>
    </div>
  )
}

export default Forgot
