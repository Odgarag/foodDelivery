'use client'

import { useState } from 'react'
import { EmailLeft } from './_components/EmailLeft'
import { PasswordLeft } from './_components/PasswordLeft'
import { Right } from './_components/Right'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { redirect, useRouter } from 'next/navigation'
import axios from 'axios'
import { useAuth } from '../_components/UserProvider'

const validationSchemaLogin = Yup.object({
  email: Yup.string()
    .required('Email is required')
    .test(
      'email',
      'Invalid email. Use a format like example@email.com',
      (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(value)
      }
    ),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[0-9]/, 'Password must contain a number')
    .matches(/[a-z]/, 'Password must contain a lowercase letter')
    .required('Password is required'),
  confirm: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm your password'),
})

const SignUp = () => {
  const { user } = useAuth()
  const [step, setStep] = useState(1)
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirm: '',
    },
    validationSchema: validationSchemaLogin,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          'http://localhost:8000/signup',
          values
        )
        console.log(response)

        router.push('/login')
      } catch (error) {
        alert(JSON.stringify(error))
      }
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
        {step === 1 && <EmailLeft formik={formik} nextStep={nextStep} />}
        {step === 2 && <PasswordLeft formik={formik} prevStep={prevStep} />}
      </div>
      <div className="flex-2/5 h-full p-[10px]">
        <Right />
      </div>
    </div>
  )
}

export default SignUp
