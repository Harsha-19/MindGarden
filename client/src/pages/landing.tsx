import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gamepad2, Search, Shield, Users } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Gamepad2 className="text-accent text-2xl mr-2" />
              <span className="text-xl font-bold text-primary">GameHub</span>
            </div>
            <Button onClick={() => window.location.href = "/api/login"}>
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-accent text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Discover Amazing Games
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Buy and sell digital games from indie developers to AAA studios. 
            Connect with a global community of gamers and developers.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-slate-100"
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
            <h2 className="text-3xl font-bold text-primary mb-4">
              Why Choose GameHub?
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              The premier marketplace for digital games with features designed for both buyers and sellers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Search className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Easy Discovery</h3>
                <p className="text-slate-600">
                  Find games with powerful search and filtering tools. Browse by category, price, and popularity.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Shield className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Secure Platform</h3>
                <p className="text-slate-600">
                  Safe and secure transactions with buyer protection and seller verification systems.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Global Community</h3>
                <p className="text-slate-600">
                  Connect with developers and gamers worldwide. Support indie developers and discover hidden gems.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-100 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Ready to Start Your Gaming Journey?
          </h2>
          <p className="text-slate-600 text-lg mb-8">
            Join thousands of gamers and developers already using GameHub to buy, sell, and discover amazing games.
          </p>
          <Button 
            size="lg" 
            onClick={() => window.location.href = "/api/login"}
          >
            Join GameHub Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center items-center">
            <div className="flex items-center">
              <Gamepad2 className="text-accent text-xl mr-2" />
              <span className="font-bold text-primary">GameHub</span>
            </div>
          </div>
          <p className="text-center text-slate-500 text-sm mt-4">
            © 2024 GameHub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
