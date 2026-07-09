import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Logo } from '@/components/Logo'
import { recordConsent, DOCUMENT_VERSIONS } from '@/lib/legal-consent'
import { supabase } from '@/lib/supabase'

export const Route = createFileRoute('/auth')({
  component: AuthComponent,
  head: () => ({
    title: 'Sign in — Nest',
    meta: [
      { name: 'description', content: 'Sign in to your Nest account' },
    ],
  }),
  notFoundComponent: () => <div>Page not found</div>,
})

function AuthComponent() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (isSignUp) {
        // Sign up with Supabase
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            }
          }
        })

        if (error) throw error

        // Record consent to legal documents on signup
        if (data.user) {
          await recordConsent('terms', DOCUMENT_VERSIONS.terms)
          await recordConsent('privacy', DOCUMENT_VERSIONS.privacy)
        }
      } else {
        // Sign in with Supabase
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) throw error
      }
      
      // Navigate to onboarding after successful auth
      navigate({ to: '/onboarding' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/onboarding`
        }
      })

      if (error) throw error
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google sign-in failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (error) throw error

      setMessage('Password reset email sent! Check your inbox for the reset link.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send reset email. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-border bg-card">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <CardTitle className="text-2xl">
            {isForgotPassword ? 'Reset your password' : isSignUp ? 'Create your account' : 'Welcome back'}
          </CardTitle>
          <CardDescription>
            {isForgotPassword
              ? 'Enter your email to receive a password reset link'
              : isSignUp 
              ? 'Start managing your business finances with Nest'
              : 'Sign in to your Nest account'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isForgotPassword ? (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
              {message && (
                <p className="text-sm text-green-600">{message}</p>
              )}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Sending...' : 'Send reset link'}
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => {
                  setIsForgotPassword(false)
                  setError('')
                  setMessage('')
                }}
              >
                Back to sign in
              </Button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Loading...' : isSignUp ? 'Create account' : 'Sign in'}
              </Button>
              {!isSignUp && (
                <button
                  type="button"
                  onClick={() => setIsForgotPassword(true)}
                  className="w-full text-sm text-primary hover:underline"
                >
                  Forgot your password?
                </button>
              )}
            </form>
          )}
          
          {!isForgotPassword && (
            <>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
              
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleGoogleSignIn}
                disabled={loading}
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </Button>
              
              {isSignUp && (
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground mb-2">
                    By creating an account, you agree to our:
                  </p>
                  <div className="flex gap-2 text-xs">
                    <Link to="/legal/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>
                    <span className="text-muted-foreground">and</span>
                    <Link to="/legal/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </div>
                </div>
              )}
              
              <p className="text-center text-sm text-muted-foreground mt-6">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-primary hover:underline"
                >
                  {isSignUp ? 'Sign in' : 'Create account'}
                </button>
              </p>
            </>
          )}
          
          <div className="text-center mt-4">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
              Back to home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
