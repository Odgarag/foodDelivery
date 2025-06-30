'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const Create = ({ formik, prevStep }: any) => {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   const errors = await formik.validateForm()
  //   if (!errors.password && !errors.confirm) {
  //     formik.handleSubmit()
  //   }
  // }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errors = await formik.validateForm()
    if (!errors.password && !errors.confirmPassword) {
      const res = await fetch('http://localhost:8000/updatedPassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formik.values.email,
          password: formik.values.password,
        }),
      })

      if (res.ok) {
        alert('Password reset successful!')
        router.push('/login')
      } else {
        alert('Failed to reset password')
      }
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
        <p className="text-[24px] font-bold">Create new password</p>
        <p className="text-gray-500">
          Set a new password with a combination of letters and numbers for
          better security.
        </p>
      </div>

      <div className="flex flex-col gap-[16px]">
        <div className="flex flex-col gap-[12px]">
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            name="password"
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
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="text-red-500 text-sm">
              {' '}
              {formik.errors.confirmPassword}
            </div>
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
        Create password
      </Button>
    </form>
  )
}
