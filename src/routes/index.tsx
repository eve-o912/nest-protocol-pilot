import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Reveal } from '@/components/Reveal'
import { Logo } from '@/components/Logo'
import { Wallet, Brain, CreditCard, ArrowRight, Check, TrendingUp, Shield, Zap } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: IndexComponent,
  head: () => ({
    title: 'Nest — Your business finances, built to work',
    meta: [
      { name: 'description', content: 'Nest unifies every part of your business finances into one living, intelligent system — giving you real-time visibility, AI-powered decisions, and a verified credit identity.' },
    ],
  }),
  notFoundComponent: () => <div>Page not found</div>,
})

function IndexComponent() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo />
            <div className="hidden md:flex items-center gap-8">
              <Link to="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link to="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
                How it works
              </Link>
              <Link to="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/auth">
                <Button variant="ghost">Sign in</Button>
              </Link>
              <Link to="/auth">
                <Button>Get started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-32 sm:py-48">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8 animate-fade-in">
              The financial data layer for African business.
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-fade-in animate-delay-200">
              We are the protocol underneath African business finance.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <Link to="/auth">
              <Button size="lg" className="animate-fade-in animate-delay-300">
                Get early access
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12">
              The data disappears.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-lg sm:text-xl text-muted-foreground text-center mb-8">
              The informal economy generates trillions in transaction data every day. But it vanishes into the void.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-destructive mb-2">No structure</div>
                <p className="text-muted-foreground">Raw data without organization</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-destructive mb-2">No portability</div>
                <p className="text-muted-foreground">Trapped in silos</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-destructive mb-2">No identity</div>
                <p className="text-muted-foreground">No credit history</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={300}>
            <p className="text-lg text-muted-foreground text-center mt-12">
              This is a systemic failure. Not a product gap.
            </p>
          </Reveal>
        </div>
      </section>

      {/* The Protocol */}
      <section className="py-24 sm:py-32 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12">
              The infrastructure layer
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1 text-center">
                  <div className="w-20 h-20 rounded-full bg-muted-foreground/10 flex items-center justify-center mx-auto mb-4">
                    <Wallet className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Raw data</h3>
                  <p className="text-muted-foreground">M-Pesa, bank, till transactions</p>
                </div>
                <div className="text-4xl text-muted-foreground">→</div>
                <div className="flex-1 text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Structure</h3>
                  <p className="text-muted-foreground">Normalized, verified, enriched</p>
                </div>
                <div className="text-4xl text-muted-foreground">→</div>
                <div className="flex-1 text-center">
                  <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-10 h-10 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Financial Passport</h3>
                  <p className="text-muted-foreground">Portable credit identity</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Financial Passport */}
      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12">
              The output: Your Financial Passport
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="max-w-md mx-auto">
              <Card className="border-border bg-card">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <CardTitle>Financial Passport</CardTitle>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      <span className="text-sm text-muted-foreground">Verified</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Credit Score</span>
                      <span className="text-2xl font-bold text-primary">782</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[78%]" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                      <div>
                        <p className="text-sm text-muted-foreground">Cash Growth</p>
                        <p className="font-semibold">+23%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Payment History</p>
                        <p className="font-semibold">98%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Debt Ratio</p>
                        <p className="font-semibold">12%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Business Age</p>
                        <p className="font-semibold">3.2 yrs</p>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-border">
                      <p className="text-xs text-muted-foreground text-center">
                        Portable • Consent-gated • Cryptographically anchored
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Who plugs in */}
      <section className="py-24 sm:py-32 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12">
              Who plugs into Nest
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-border bg-card">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Wallet className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Business Owners</CardTitle>
                  <CardDescription>
                    Connect your financial data. Build your credit identity. Access capital on your terms.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-border bg-card">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-secondary" />
                  </div>
                  <CardTitle>Lenders & Partners</CardTitle>
                  <CardDescription>
                    Access verified, consent-gated financial data. Make better lending decisions. Reduce risk.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-border bg-card">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Developers</CardTitle>
                  <CardDescription>
                    Build on the Nest API. Integrate financial infrastructure into your applications.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-center text-lg text-muted-foreground mt-12">
              Nest is the connective tissue between all three.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 sm:py-32">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              The infrastructure is being built.
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get early access.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button size="lg" className="w-full sm:w-auto">
                Join waitlist
              </Button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Logo />
              <p className="text-muted-foreground mt-2">
                Financial infrastructure for Kenyan businesses.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="#features" className="hover:text-foreground">Features</Link></li>
                <li><Link to="#pricing" className="hover:text-foreground">Pricing</Link></li>
                <li><Link to="#how-it-works" className="hover:text-foreground">How it works</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">About</a></li>
                <li><a href="#" className="hover:text-foreground">Blog</a></li>
                <li><a href="#" className="hover:text-foreground">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground">Terms</a></li>
                <li><a href="#" className="hover:text-foreground">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Nest. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
