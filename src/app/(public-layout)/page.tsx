import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Car,
  QrCode,
  Smartphone,
  Users,
  Calendar,
  Shield,
  Star,
  CheckCircle,
  ArrowRight,
  BarChart3,
  MapPin,
  Zap,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
            🚀 Revolutionizing Vehicle Rentals
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-500  to-purple-500 bg-clip-text text-transparent">
            Book, Scan, Drive
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            The simplest way to rent vehicles. Owners list their cars, renters
            book instantly, and QR codes make pickup seamless. No paperwork, no
            hassle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg">
              Start as Owner
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline">
              Find a Vehicle
              <Car className="ml-2 w-4 h-4" />
            </Button>
          </div>

          {/* Hero Image/Demo */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Smartphone className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Book Online</h3>
                  <p className="text-sm text-gray-600">
                    Find and reserve your perfect vehicle
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <QrCode className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Get QR Code</h3>
                  <p className="text-sm text-gray-600">
                    Receive instant booking confirmation
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Car className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Drive Away</h3>
                  <p className="text-sm text-gray-600">
                    Owner scans, you&lsquo;re ready to go!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How Renta Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A seamless experience for both vehicle owners and renters
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* For Renters */}
            <div>
              <h3 className="text-2xl font-bold mb-8 text-center">
                For Renters
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Browse & Book</h4>
                    <p className="text-gray-600">
                      Find the perfect vehicle, check availability, and book
                      instantly with just a few clicks.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Receive QR Code</h4>
                    <p className="text-gray-600">
                      Get your unique QR code confirmation immediately after
                      booking. No waiting, no paperwork.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Quick Pickup</h4>
                    <p className="text-gray-600">
                      Visit the owner&lsquo;s location, show your QR code, and
                      drive away. It&lsquo;s that simple!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Owners */}
            <div>
              <h3 className="text-2xl font-bold mb-8 text-center">
                For Vehicle Owners
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">List Your Vehicle</h4>
                    <p className="text-gray-600">
                      Create your account, add vehicle details, photos, and set
                      your availability and pricing.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Receive Bookings</h4>
                    <p className="text-gray-600">
                      Get notified when someone books your vehicle. View all
                      booking details in your dashboard.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Scan & Confirm</h4>
                    <p className="text-gray-600">
                      Simply scan the renter&lsquo;s QR code to confirm the
                      booking. Instant verification and peace of mind.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage vehicle rentals efficiently
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <QrCode className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>QR Code Technology</CardTitle>
                <CardDescription>
                  Instant booking confirmation and seamless pickup process with
                  secure QR codes
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Owner Dashboard</CardTitle>
                <CardDescription>
                  Comprehensive analytics, booking management, and revenue
                  tracking in one place
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Smart Scheduling</CardTitle>
                <CardDescription>
                  Automated availability management and booking conflict
                  prevention
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-yellow-600" />
                </div>
                <CardTitle>Secure Payments (Soon)</CardTitle>
                <CardDescription>
                  Protected transactions with automatic payouts and fraud
                  prevention
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle>Owner Location Tracking</CardTitle>
                <CardDescription>
                  GPS integration for easy vehicle location and pickup
                  coordination
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle>Instant Notifications</CardTitle>
                <CardDescription>
                  Real-time updates for bookings, confirmations, and important
                  alerts
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Choose Renta?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">No Paperwork Hassle</h3>
                    <p className="text-gray-600">
                      Skip the lengthy forms and documentation. Our QR code
                      system eliminates paperwork entirely.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Instant Confirmation</h3>
                    <p className="text-gray-600">
                      Get immediate booking confirmation and start your rental
                      process within minutes.
                    </p>
                  </div>
                </div>
                {/* <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Secure & Reliable</h3>
                    <p className="text-gray-600">
                      Bank-level security with encrypted transactions and
                      verified user profiles.
                    </p>
                  </div>
                </div> */}
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">24/7 Support</h3>
                    <p className="text-gray-600">
                      Round-the-clock customer support to help you with any
                      questions or issues.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-100 to-purple-100 rounded-2xl p-8">
              <div className="text-center">
                <div className="relative w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Image src={"/logos/renta-logo.svg"} alt="renta-logo" fill />
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  🚀 Join the Renta Community
                </h3>
                <p className="mb-6">
                  Book, Scan, and Drive - It&lsquo;s that Simple.
                </p>
                {/* <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">10K+</div>
                    <div className="text-sm text-gray-600">Active Users</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">
                      5K+
                    </div>
                    <div className="text-sm text-gray-600">Vehicles Listed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      50K+
                    </div>
                    <div className="text-sm text-gray-600">
                      Successful Rentals
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Choose the plan that works best for your business
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 border-gray-200">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Starter</CardTitle>
                <div className="text-3xl font-bold mt-4">Free</div>
                <CardDescription>Perfect for individual owners</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    Up to 2 vehicles
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    Basic dashboard
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    QR code scanning
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    5% transaction fee
                  </li>
                </ul>
                <Button
                  className="w-full mt-6 bg-transparent"
                  variant="outline"
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-500 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-500">Most Popular</Badge>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Professional</CardTitle>
                <div className="text-3xl font-bold mt-4">
                  $29<span className="text-lg font-normal">/month</span>
                </div>
                <CardDescription>For growing rental businesses</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    Up to 10 vehicles
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    Advanced analytics
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    Priority support
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    3% transaction fee
                  </li>
                </ul>
                <Button className="w-full mt-6">Start Free Trial</Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Enterprise</CardTitle>
                <div className="text-3xl font-bold mt-4">
                  $99<span className="text-lg font-normal">/month</span>
                </div>
                <CardDescription>For large fleet operations</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    Unlimited vehicles
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    Custom integrations
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    24/7 phone support
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    1% transaction fee
                  </li>
                </ul>
                <Button
                  className="w-full mt-6 bg-transparent"
                  variant="outline"
                >
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-400 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Vehicle Rental Business?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of vehicle owners and renters who have simplified
            their rental experience with Renta.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-500 hover:bg-gray-100"
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              Schedule a Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
