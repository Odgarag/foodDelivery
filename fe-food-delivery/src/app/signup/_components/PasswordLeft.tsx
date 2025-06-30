'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronLeft } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export const PasswordLeft = ({ formik, prevStep }: any) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formik.errors.password && !formik.errors.confirm) {
      formik.handleSubmit()
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
        <p className="text-[24px] font-bold">Create a strong password</p>
        <p className="text-gray-500">
          Create a strong password with letters and numbers.
        </p>
      </div>

      <div className="flex flex-col gap-[16px]">
        <div className="flex flex-col gap-[12px]">
          <Input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          )}
        </div>

        <div className="flex flex-col gap-[12px]">
          <Input
            type={showPassword ? 'text' : 'password'}
            name="confirm"
            placeholder="Confirm password"
            value={formik.values.confirm}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.confirm && formik.errors.confirm && (
            <div className="text-red-500 text-sm">{formik.errors.confirm}</div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="showPassword"
            checked={showPassword}
            onCheckedChange={() => setShowPassword(!showPassword)}
          />
          <label htmlFor="showPassword" className="text-sm">
            Show password
          </label>
        </div>
      </div>

      <Button type="submit" className="mt-2">
        Let's Go
      </Button>

      <div className="flex gap-2 justify-center items-center">
        <p className="text-gray-500 text-sm">Already have an account?</p>
        <Button
          variant="link"
          className="text-blue-600 text-sm"
          onClick={() => formik.handleSubmit()}
        >
          Log in
        </Button>
      </div>
    </form>
  )
}
