import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { SignIn } from '@/components/auth/SignIn';
import { SignUp } from '@/components/auth/SignUp';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Loader2,
  LogIn,
  UserPlus,
  User,
  LogOut
} from 'lucide-react';

export default function Booking() {
  const [searchParams] = useSearchParams();
  const { user, loading: authLoading, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  const handleLogout = async () => {
    await signOut();
    window.location.href = '/';
  };

  // Get user display name
  const getUserDisplayName = () => {
    if (!user) return '';
    return user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'User';
  };
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    eventTime: '',
    duration: '',
    guestCount: '',
    location: '',
    specialRequests: '',
    package: searchParams.get('package') || 'essential'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Update form data when user is authenticated
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.user_metadata?.full_name || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  const packages = [
    { id: 'essential', name: 'Essential', price: 'From RM 1,299' },
    { id: 'premium', name: 'Premium', price: 'From RM 2,599' },
    { id: 'luxury', name: 'Luxury', price: 'From RM 4,299' }
  ];

  const eventTypes = [
    'Wedding',
    'Corporate Event',
    'Birthday Party',
    'Anniversary',
    'Graduation',
    'Festival',
    'Other'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user is authenticated
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Determine API URL based on environment
      const isProduction = window.location.hostname !== 'localhost';
      const apiUrl = isProduction 
        ? '/.netlify/functions/bookings'
        : '/api/bookings';

      console.log('Submitting booking to:', apiUrl);
      console.log('Form data:', formData);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userId: user.id,
          userEmail: user.email
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      console.log('Success response:', result);

      setSubmitStatus('success');
    } catch (error) {
      console.error('Booking submission error:', error);
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to submit booking');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-brand-green hover:text-brand-sage">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">{getUserDisplayName()}</span>
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
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowAuthModal(true)}
                className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Book Your Perfect Canopy</h1>
            <p className="text-xl text-gray-600">
              Fill out the form below and we'll match you with the best canopy provider for your event
            </p>
          </div>

          {submitStatus === 'success' && (
            <Alert className="mb-6 border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Booking submitted successfully! We'll contact you within 24 hours to confirm your reservation.
              </AlertDescription>
            </Alert>
          )}

          {submitStatus === 'error' && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {errorMessage || 'Failed to submit booking. Please try again.'}
              </AlertDescription>
            </Alert>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Event Details</CardTitle>
                  <CardDescription>
                    Tell us about your event so we can find the perfect canopy for you
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleBookingSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            required
                            placeholder="Your full name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            required
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          required
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    {/* Event Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Event Information</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="eventType">Event Type *</Label>
                          <Select value={formData.eventType} onValueChange={(value) => handleInputChange('eventType', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select event type" />
                            </SelectTrigger>
                            <SelectContent>
                              {eventTypes.map((type) => (
                                <SelectItem key={type} value={type}>{type}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="package">Package *</Label>
                          <Select value={formData.package} onValueChange={(value) => handleInputChange('package', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select package" />
                            </SelectTrigger>
                            <SelectContent>
                              {packages.map((pkg) => (
                                <SelectItem key={pkg.id} value={pkg.id}>
                                  {pkg.name} - {pkg.price}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="eventDate">Event Date *</Label>
                          <Input
                            id="eventDate"
                            type="date"
                            value={formData.eventDate}
                            onChange={(e) => handleInputChange('eventDate', e.target.value)}
                            required
                            min={new Date().toISOString().split('T')[0]}
                          />
                        </div>
                        <div>
                          <Label htmlFor="eventTime">Start Time *</Label>
                          <Input
                            id="eventTime"
                            type="time"
                            value={formData.eventTime}
                            onChange={(e) => handleInputChange('eventTime', e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="duration">Duration *</Label>
                          <Select value={formData.duration} onValueChange={(value) => handleInputChange('duration', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select duration" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="4-hours">4 hours</SelectItem>
                              <SelectItem value="8-hours">8 hours</SelectItem>
                              <SelectItem value="12-hours">12 hours</SelectItem>
                              <SelectItem value="full-day">Full day</SelectItem>
                              <SelectItem value="multi-day">Multi-day</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="guestCount">Expected Guest Count *</Label>
                        <Input
                          id="guestCount"
                          type="number"
                          value={formData.guestCount}
                          onChange={(e) => handleInputChange('guestCount', e.target.value)}
                          required
                          placeholder="Number of guests"
                          min="1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Event Location *</Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          required
                          placeholder="Full address of your event"
                        />
                      </div>
                      <div>
                        <Label htmlFor="specialRequests">Special Requests</Label>
                        <Textarea
                          id="specialRequests"
                          value={formData.specialRequests}
                          onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                          placeholder="Any specific requirements, decorations, or special arrangements..."
                          rows={4}
                        />
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-brand-green hover:bg-brand-sage text-white py-3 text-lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Submitting Booking...
                        </>
                      ) : (
                        'Submit Booking Request'
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Booking Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Date: {formData.eventDate || 'Not selected'}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>Time: {formData.eventTime || 'Not selected'}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>Guests: {formData.guestCount || 'Not specified'}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span className="truncate">{formData.location || 'Not specified'}</span>
                  </div>
                  
                  {formData.package && (
                    <div className="pt-4 border-t">
                      <div className="text-sm font-medium text-gray-900">
                        {packages.find(p => p.id === formData.package)?.name} Package
                      </div>
                      <div className="text-sm text-gray-600">
                        {packages.find(p => p.id === formData.package)?.price}
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t">
                    <div className="text-sm text-gray-600">
                      <strong>What happens next?</strong>
                    </div>
                    <ul className="text-xs text-gray-500 mt-2 space-y-1">
                      <li>• We'll review your request</li>
                      <li>• Match you with local providers</li>
                      <li>• Send you quotes within 24 hours</li>
                      <li>• Confirm your booking</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Authentication Modal */}
      <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              {authMode === 'signin' ? 'Sign In to Continue' : 'Create Account'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {authMode === 'signin' ? (
              <SignIn 
                onSuccess={handleAuthSuccess}
                onSwitchToSignUp={() => setAuthMode('signup')}
              />
            ) : (
              <SignUp 
                onSuccess={handleAuthSuccess}
                onSwitchToSignIn={() => setAuthMode('signin')}
              />
            )}
            <div className="text-center">
              <button
                onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
                className="text-sm text-brand-green hover:underline"
              >
                {authMode === 'signin' ? (
                  <>
                    <UserPlus className="inline h-4 w-4 mr-1" />
                    Don't have an account? Sign up
                  </>
                ) : (
                  <>
                    <LogIn className="inline h-4 w-4 mr-1" />
                    Already have an account? Sign in
                  </>
                )}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}