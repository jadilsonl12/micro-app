'use client'

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { signIn } from "next-auth/react"
import { toast } from "@/components/ui/use-toast"

export function AuthForm() {

    const form = useForm()

    const handleSubmit = form.handleSubmit(async (data) => {
        try {
          await signIn('nodemailer', { email: data.email, redirect: false })

          toast({
            title: 'Magic link sent',
            description: 'Check your email for the magic link to login'
          })
        } catch (error) {
          toast({
            title: 'Error',
            description: 'An error occurred. Please try again.'
          })
        }
    })

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Magic Link Authentication</h1>
          <p className="text-muted-foreground">Enter your email below to receive a magic link to sign in.</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <Label htmlFor="email" className="sr-only">
              Email
            </Label>
            <Input id="email" type="email" placeholder="Enter your email" className="w-full" required {...form.register('email')} />
          </div>
          <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>

          {form.formState.isSubmitting? 'Sending...': 'Send Magic Link'}
          </Button>
        </form>
      </div>
    </div>
  )
}