'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { useEffect } from 'react'

export const Left = ({ formik }: any) => {
  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (!formik.errors.password && !formik.errors.email) {
      formik.handleSubmit()
    }
  }
  const passwordInput = {
    value: formik.values.password,
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
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
        <p className="text-[24px] font-bold">Log in</p>
        <p className="text-gray-500">Log in to enjoy your favorite dishes.</p>
      </div>

      <div className="flex flex-col gap-[16px]">
        <div className="flex flex-col gap-[12px]">
          <Input
            placeholder="Enter your email address"
            name="email"
            {...emailInput}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          )}
        </div>
        <div className="flex flex-col gap-[12px]">
          <Input
            type="password"
            name="password"
            placeholder="Password"
            {...passwordInput}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Link href={'./forgotPassword'}>
            <Button variant="link" className="text-sm" type="button">
              Forgot password?
            </Button>
          </Link>
        </div>
      </div>

      <Button type="submit" className="mt-2">
        Let's Go
      </Button>

      <div className="flex gap-2 justify-center items-center">
        <p className="text-gray-500 text-sm">Don't have an account?</p>
        <Link href={'./signup'}>
          <Button
            variant="link"
            className="text-blue-600 text-sm"
            type="button"
          >
            Sign up
          </Button>
        </Link>
      </div>
    </form>
  )
}
