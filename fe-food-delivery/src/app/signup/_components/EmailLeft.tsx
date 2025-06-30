'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

export const EmailLeft = ({ formik, nextStep }: any) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formik.errors.email && formik.values.email) {
      nextStep()
    }
  }
  const emailInput = {
    value: formik.values.email,
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="h-auto w-[416px] flex flex-col gap-[24px] m-auto"
    >
      <div>
        <p className="text-[24px] font-bold">Create your account</p>
        <p className="text-gray-500">
          Sign up to explore your favorite dishes.
        </p>
      </div>

      <div className="flex flex-col gap-[12px]">
        <Input
          name="email"
          placeholder="Enter your email address"
          {...emailInput}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        )}
      </div>

      <Button type="submit">Let's Go</Button>

      <div className="flex gap-2 justify-center items-center">
        <p className="text-gray-500">Already have an account?</p>
        <Link href="/login">
          <Button variant="link" className="text-blue-600 text-sm">
            Log in
          </Button>
        </Link>
      </div>
    </form>
  )
}
