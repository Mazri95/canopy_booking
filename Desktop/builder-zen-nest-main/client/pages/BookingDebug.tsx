import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

export default function BookingDebug() {
  const { user, loading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<string>("");

  const testBooking = async () => {
    console.log('🧪 Starting booking test...');
    console.log('User:', user);
    console.log('Loading:', loading);

    if (!user) {
      setResult('❌ User not authenticated');
      return;
    }

    setIsSubmitting(true);
    setResult('🔄 Testing booking submission...');

    try {
      const bookingData = {
        canopyType: "Pyramid Canopy",
        canvasType: "Standard Canvas",
        accessories: ["String Lighting"],
        eventType: "wedding",
        location: "123 Test Street",
        eventDate: "2024-12-25",
        startTime: "10:00",
        duration: "8",
        guestCount: 50,
        specialRequests: "Debug test booking",
        totalPrice: 100000,
        userEmail: user.email
      };

      console.log('📤 Sending booking data:', bookingData);

      // Use different endpoints for development vs production
      const apiUrl = import.meta.env.DEV 
        ? '/api/bookings' 
        : '/.netlify/functions/bookings';
      
      console.log('Using API URL:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      console.log('📥 Response status:', response.status);
      console.log('📥 Response ok:', response.ok);

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Booking successful:', result);
        setResult('✅ Booking successful! ID: ' + result.booking.id);
      } else {
        const error = await response.json();
        console.error('❌ Booking failed:', error);
        setResult('❌ Booking failed: ' + JSON.stringify(error));
      }
    } catch (error) {
      console.error('❌ Network error:', error);
      setResult('❌ Network error: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Booking Debug Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">Authentication Status:</h3>
              <p>Loading: {loading ? 'Yes' : 'No'}</p>
              <p>User: {user ? user.email : 'Not logged in'}</p>
            </div>

            <div>
              <h3 className="font-semibold">Test Actions:</h3>
              <Button 
                onClick={testBooking} 
                disabled={isSubmitting || !user}
                className="w-full"
              >
                {isSubmitting ? 'Testing...' : 'Test Booking Submission'}
              </Button>
            </div>

            <div>
              <h3 className="font-semibold">Result:</h3>
              <div className="p-4 bg-gray-100 rounded-lg">
                <pre className="whitespace-pre-wrap">{result}</pre>
              </div>
            </div>

            <div>
              <h3 className="font-semibold">Instructions:</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Make sure you're logged in (sign up/sign in first)</li>
                <li>Click "Test Booking Submission"</li>
                <li>Check the browser console (F12) for detailed logs</li>
                <li>Check the server terminal for backend logs</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
