import { Handler } from '@netlify/functions';

export const handler: Handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const bookingData = JSON.parse(event.body || '{}');
    
    console.log('📝 Booking request received:', bookingData);

    const {
      name,
      email,
      phone,
      eventType,
      eventDate,
      eventTime,
      duration,
      guestCount,
      location,
      specialRequests,
      package: packageType
    } = bookingData;

    // Validate required fields
    if (!name || !email || !phone || !eventType || !eventDate || !eventTime || !duration || !guestCount || !location) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Create booking object
    const booking = {
      id: Math.floor(Math.random() * 10000),
      name,
      email,
      phone,
      eventType,
      eventDate: new Date(eventDate),
      eventTime,
      duration,
      guestCount: parseInt(guestCount),
      location,
      specialRequests: specialRequests || null,
      package: packageType,
      status: 'pending',
      createdAt: new Date()
    };

    // Log email notification
    if (email) {
      console.log('📧 Would send booking confirmation email to:', email);
    }

    console.log('✅ Booking created successfully:', booking);

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({ booking }),
    };
  } catch (error) {
    console.error('❌ Booking error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to create booking', details: error.message }),
    };
  }
};