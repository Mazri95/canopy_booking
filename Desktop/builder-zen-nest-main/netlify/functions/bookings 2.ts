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
      canopyType,
      canvasType,
      accessories,
      eventType,
      location,
      eventDate,
      startTime,
      duration,
      guestCount,
      specialRequests,
      totalPrice,
      userEmail
    } = bookingData;

    // Validate required fields
    if (!canopyType || !canvasType || !eventType || !location || !eventDate || !startTime || !duration || !guestCount || !totalPrice) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Create booking object
    const booking = {
      id: Math.floor(Math.random() * 10000),
      canopyType,
      canvasType,
      accessories: accessories || [],
      eventType,
      location,
      eventDate: new Date(eventDate),
      startTime,
      duration,
      guestCount: parseInt(guestCount),
      specialRequests: specialRequests || null,
      totalPrice: parseInt(totalPrice),
      userEmail,
      status: 'pending',
      createdAt: new Date()
    };

    // Log email notification
    if (userEmail) {
      console.log('📧 Would send booking confirmation email to:', userEmail);
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

