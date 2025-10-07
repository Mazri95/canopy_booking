import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Tent, 
  Calendar, 
  MapPin, 
  Star, 
  CheckCircle, 
  ArrowRight,
  Shield,
  Award,
  Clock,
  LogIn,
  User,
  LogOut
} from 'lucide-react';

export default function Index() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    window.location.href = '/';
  };

  const features = [
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Flexible Scheduling",
      description: "Book for any date with instant availability checking"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Vetted Partners",
      description: "All canopy companies are verified and insured"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Premium Quality",
      description: "High-grade materials and professional setup"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Quick Setup",
      description: "Professional installation in just hours"
    }
  ];

  const packages = [
    {
      id: "essential",
      name: "Essential",
      price: "From $299",
      description: "Perfect for intimate gatherings",
      features: ["20x20 ft canopy", "Basic canvas", "Standard setup", "4-hour rental"],
      popular: false
    },
    {
      id: "premium", 
      name: "Premium",
      price: "From $599",
      description: "Ideal for weddings & special events",
      features: ["30x40 ft canopy", "Weather-resistant canvas", "Professional lighting", "8-hour rental", "Side panels included"],
      popular: true
    },
    {
      id: "luxury",
      name: "Luxury",
      price: "From $999", 
      description: "The ultimate event experience",
      features: ["40x60 ft canopy", "Premium canvas", "Full lighting & decor", "12-hour rental", "Climate control", "Dedicated coordinator"],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm fixed w-full top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Tent className="h-8 w-8 text-brand-green" />
            <span className="text-2xl font-bold text-gray-900">CanopyBooking</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#packages" className="text-gray-600 hover:text-brand-green transition-colors">Packages</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-brand-green transition-colors">How It Works</a>
            <a href="#contact" className="text-gray-600 hover:text-brand-green transition-colors">Contact</a>
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm">{user.email}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  className="border-red-300 text-red-600 hover:bg-red-50"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button variant="outline" size="sm" className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Perfect Canopies for
              <span className="text-brand-green block">Every Occasion</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Book premium canopies for weddings, events, and celebrations. 
              We'll match you with the best local providers for a seamless experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/booking">
                <Button size="lg" className="bg-brand-green hover:bg-brand-sage text-white px-8 py-3 text-lg">
                  Start Booking
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="px-8 py-3 text-lg border-brand-green text-brand-green hover:bg-brand-green hover:text-white">
                View Gallery
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose CanopyBooking?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make canopy rental simple, reliable, and stress-free
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-green/10 rounded-full mb-4 text-brand-green">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Package
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find the perfect canopy package for your event size and budget
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg) => (
              <Card key={pkg.id} className={`relative ${pkg.popular ? 'ring-2 ring-brand-green shadow-xl' : ''}`}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-brand-green text-white px-4 py-1">Most Popular</Badge>
                  </div>
                )}
                <CardContent className="p-8">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                    <div className="text-3xl font-bold text-brand-green mb-2">{pkg.price}</div>
                    <p className="text-gray-600 mb-6">{pkg.description}</p>
                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-brand-green mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to={`/booking?package=${pkg.id}`}>
                      <Button 
                        className={`w-full ${pkg.popular ? 'bg-brand-green hover:bg-brand-sage' : 'bg-gray-900 hover:bg-gray-800'} text-white`}
                      >
                        Choose {pkg.name}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple steps to get your perfect canopy setup
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { step: "1", title: "Choose Your Style", description: "Select canopy type, size, and canvas material" },
              { step: "2", title: "Pick Your Package", description: "Choose from Essential, Premium, or Luxury options" },
              { step: "3", title: "Book & Pay", description: "Enter event details and secure your booking" },
              { step: "4", title: "Enjoy Your Event", description: "Professional setup and takedown included" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-green text-white rounded-full text-xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Book Your Perfect Canopy?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trusted us with their special events
          </p>
          <Link to="/booking">
            <Button size="lg" variant="secondary" className="bg-white text-brand-green hover:bg-gray-100 px-8 py-3 text-lg">
              Start Your Booking Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Tent className="h-6 w-6" />
                <span className="text-xl font-bold">CanopyBooking</span>
              </div>
              <p className="text-gray-400">
                Your trusted partner for premium canopy rentals and event solutions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Wedding Canopies</li>
                <li>Event Tents</li>
                <li>Corporate Events</li>
                <li>Party Rentals</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Cancellation Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>Nationwide Service</span>
                </div>
                <div>support@canopybooking.com</div>
                <div>1-800-CANOPY-1</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CanopyBooking. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}