'use client'

import { useState } from 'react'
import { Right } from './_components/Right'
import { Left } from './_components/Left'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { redirect } from 'next/navigation'
import { useAuth } from '../_components/UserProvider'

const validationSchemaLogin = Yup.object({
  email: Yup.string().required('Email is required').email('Invalid email'),
  password: Yup.string().required('Password is required'),
})

const LogIn = () => {
  const { user, tokenChecker } = useAuth()
  const [step, setStep] = useState(1)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchemaLogin,
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:8000/login', {
          email: values.email,
          password: values.password,
        })

        localStorage.setItem('token', response.data.token)
        await tokenChecker(response.data.token)
        redirect('/')
      } catch (error: any) {
        alert(error.reponse.data.message)
      }
    },
  })

  const nextStep = () => setStep((prev) => prev + 1)
  const prevStep = () => setStep((prev) => prev - 1)

  if (user?.userId) {
    redirect('/')
  }

  return (
    <div className="flex justify-between items-center h-screen">
      <div className="flex-1/5 flex justify-center">
        <Left validationSchemaLogin={validationSchemaLogin} formik={formik} />
      </div>
      <div className="flex-2/5 h-full p-[10px]">
        <Right />
      </div>
    </div>
  )
}

export default LogIn
