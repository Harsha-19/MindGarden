import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gamepad2, Search, Shield, Users } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-lg border-b border-border backdrop-blur-md bg-opacity-95 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Gamepad2 className="text-primary text-2xl mr-2 drop-shadow-lg" />
              <span className="text-xl font-bold gaming-title">GameHub</span>
            </div>
            <Button 
              onClick={() => window.location.href = "/api/login"}
              className="gaming-button text-white px-6 py-2"
            >
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background via-purple-900/20 to-green-900/20 text-foreground py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-repeat" style={{
            backgroundImage: "url('data:image/svg+xml;utf8,<svg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"><g fill=\"none\" fill-rule=\"evenodd\"><g fill=\"%23a855f7\" fill-opacity=\"0.1\"><circle cx=\"30\" cy=\"30\" r=\"2\"/></g></g></svg>')"
          }}></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 gaming-title">
            Discover Amazing Games
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-muted-foreground leading-relaxed">
            Buy and sell digital games from indie developers to AAA studios. 
            Connect with a global community of gamers and developers.
          </p>
          <Button 
            size="lg" 
            className="gaming-button text-white px-8 py-3 text-lg font-semibold"
            onClick={() => window.location.href = "/api/login"}
          >
            Get Started
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold gaming-title mb-4">
              Why Choose GameHub?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The premier marketplace for digital games with features designed for both buyers and sellers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <Card className="gaming-card group">
              <CardContent className="p-6 text-center">
                <div className="p-3 bg-accent/10 rounded-full w-fit mx-auto mb-4">
                  <Search className="h-8 w-8 text-accent group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Easy Discovery</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Find games with powerful search and filtering tools. Browse by category, price, and popularity.
                </p>
              </CardContent>
            </Card>

            <Card className="gaming-card group">
              <CardContent className="p-6 text-center">
                <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Secure Platform</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Safe and secure transactions with buyer protection and seller verification systems.
                </p>
              </CardContent>
            </Card>

            <Card className="gaming-card group">
              <CardContent className="p-6 text-center">
                <div className="p-3 bg-purple-500/10 rounded-full w-fit mx-auto mb-4">
                  <Users className="h-8 w-8 text-purple-400 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Global Community</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Connect with developers and gamers worldwide. Support indie developers and discover hidden gems.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted/30 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold gaming-title mb-4">
            Ready to Start Your Gaming Journey?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Join thousands of gamers and developers already using GameHub to buy, sell, and discover amazing games.
          </p>
          <Button 
            size="lg" 
            onClick={() => window.location.href = "/api/login"}
            className="gaming-button text-white px-8 py-3 text-lg font-semibold"
          >
            Join GameHub Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center items-center">
            <div className="flex items-center">
              <Gamepad2 className="text-primary text-xl mr-2" />
              <span className="font-bold gaming-title">GameHub</span>
            </div>
          </div>
          <p className="text-center text-muted-foreground text-sm mt-4">
            © 2024 GameHub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}