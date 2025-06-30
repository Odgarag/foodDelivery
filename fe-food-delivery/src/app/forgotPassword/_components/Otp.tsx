'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronLeft } from 'lucide-react'

export const Otp = ({ prevStep, nextStep, formik }: any) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errors = await formik.validateForm()
    if (!errors.email && !errors.code) {
      nextStep()
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="h-auto w-[416px] flex flex-col gap-[24px] m-auto"
    >
      <Button
        type="button"
        variant="secondary"
        className="w-[40px]"
        onClick={prevStep}
      >
        <ChevronLeft />
      </Button>

      <div>
        <p className="text-[24px] font-bold">Please verify your email</p>
        <p className="text-gray-500">
          We just sent a verification code to your email. Enter the 6-digit code
          below.
        </p>
      </div>

      <div className="flex flex-col gap-[16px]">
        <div className="flex flex-col gap-[12px]">
          <Input
            placeholder="Enter 6-digit code"
            name="code"
            value={formik.values.code}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            maxLength={6}
          />
          {formik.touched.code && formik.errors.code && (
            <div className="text-red-500 text-sm">{formik.errors.code}</div>
          )}
        </div>
      </div>

      <Button type="submit" className="mt-2">
        Verify
      </Button>
    </form>
  )
}
