import { RequestHandler } from "express";

export const handleBookings: RequestHandler = async (req, res) => {
  try {
    console.log('📝 Booking request received:', req.body);
    console.log('📝 Request headers:', req.headers);
    
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
    } = req.body;

    if (!canopyType || !canvasType || !eventType || !location || !eventDate || !startTime || !duration || !guestCount || !totalPrice) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // For now, just return a mock booking response
    // In a real app, you'd save this to a database
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

    // Send confirmation email if user email is provided
    if (userEmail) {
      console.log('📧 Would send booking confirmation email to:', userEmail);
      // In a real app, you'd send an actual email here
    }

    console.log('✅ Booking created successfully:', booking);
    res.status(201).json({ booking });
  } catch (err) {
    console.error('❌ Booking error:', err);
    console.error('Error details:', err.message);
    res.status(500).json({ error: 'failed to create booking', details: err.message });
  }
};
