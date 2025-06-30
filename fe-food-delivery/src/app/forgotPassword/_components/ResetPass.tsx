'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

export const ResetPass = ({ formik, nextStep }: any) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errors = await formik.validateForm()
    if (!errors.email) {
      nextStep()
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="h-auto w-[416px] flex flex-col gap-[24px] m-auto"
    >
      <div>
        <p className="text-[24px] font-bold">Reset your password</p>
        <p className="text-gray-500">
          Enter your email to receive a password reset link.
        </p>
      </div>

      <div className="flex flex-col gap-[16px]">
        <div className="flex flex-col gap-[12px]">
          <Input
            placeholder="Enter your email address"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          )}
        </div>
      </div>

      <Button type="submit" className="mt-2">
        Send link
      </Button>

      <div className="flex gap-2 justify-center items-center">
        <p className="text-gray-500 text-sm">Don't have an account?</p>
        <Link href="/signup">
          <Button variant="link" className="text-blue-600 text-sm">
            Sign up
          </Button>
        </Link>
      </div>
    </form>
  )
}
