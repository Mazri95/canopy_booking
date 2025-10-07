import { Request, Response } from "express";

export function handleBookings(req: Request, res: Response) {
  try {
    console.log('📝 Booking request received:', req.body);
    
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
    } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !eventType || !eventDate || !eventTime || !duration || !guestCount || !location) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        message: 'Please fill in all required fields'
      });
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

    console.log('✅ Booking created successfully:', booking);

    res.status(201).json({
      success: true,
      message: 'Booking submitted successfully',
      booking
    });

  } catch (error) {
    console.error('❌ Booking error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}