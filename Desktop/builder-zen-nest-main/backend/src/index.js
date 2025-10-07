import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import prisma from './prismaClient.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Email configuration (for demo purposes - in production use proper email service)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'demo@canopybooking.com',
    pass: process.env.EMAIL_PASS || 'demo-password'
  }
});

// Function to send booking confirmation email
const sendBookingConfirmation = async (booking, userEmail) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER || 'demo@canopybooking.com',
      to: userEmail,
      subject: `Booking Confirmation #${booking.id} - CanopyBooking`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #059669;">Booking Confirmation</h2>
          <p>Thank you for your booking! Here are your booking details:</p>
          
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Booking Details</h3>
            <p><strong>Booking ID:</strong> #${booking.id}</p>
            <p><strong>Canopy Type:</strong> ${booking.canopyType}</p>
            <p><strong>Canvas Type:</strong> ${booking.canvasType}</p>
            <p><strong>Accessories:</strong> ${booking.accessories.join(', ') || 'None'}</p>
            <p><strong>Event Type:</strong> ${booking.eventType}</p>
            <p><strong>Location:</strong> ${booking.location}</p>
            <p><strong>Date:</strong> ${new Date(booking.eventDate).toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${booking.startTime}</p>
            <p><strong>Duration:</strong> ${booking.duration} hours</p>
            <p><strong>Guest Count:</strong> ${booking.guestCount}</p>
            <p><strong>Total Price:</strong> $${(booking.totalPrice / 100).toFixed(2)}</p>
            ${booking.specialRequests ? `<p><strong>Special Requests:</strong> ${booking.specialRequests}</p>` : ''}
          </div>
          
          <p>We'll contact you soon to confirm the final details. If you have any questions, please call us at 1-800-CANOPY-1.</p>
          
          <p style="color: #6b7280; font-size: 14px;">
            Best regards,<br>
            The CanopyBooking Team
          </p>
        </div>
      `
    };

    // Send real email
    await transporter.sendMail(mailOptions);
    console.log('📧 Booking confirmation email sent to:', userEmail);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'missing bearer token' });
  try {
    const secret = process.env.JWT_SECRET || 'dev-secret';
    const payload = jwt.verify(token, secret);
    req.user = payload;
    next();
  } catch (err) {
    res.status(401).json({ error: 'invalid token' });
  }
}

function requireAdmin(req, res, next) {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'admin access required' });
  }
  next();
}

app.get('/', (_req, res) => {
  res.send('Backend running 🚀');
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/db-check', async (_req, res) => {
  try {
    const userCount = await prisma.user.count();
    res.json({ ok: true, usersCount: userCount });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.get('/products', async (_req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json({ products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed to fetch products' });
  }
});

app.post('/admin/products', authMiddleware, requireAdmin, async (req, res) => {
  try {
    const { name, description, priceCents, imageUrl } = req.body || {};
    const product = await prisma.product.create({
      data: { name, description, priceCents, imageUrl },
    });
    res.status(201).json({ product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed to create product' });
  }
});

app.put('/admin/products/:id', authMiddleware, requireAdmin, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, description, priceCents, imageUrl } = req.body || {};
    const product = await prisma.product.update({
      where: { id },
      data: { name, description, priceCents, imageUrl },
    });
    res.json({ product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed to update product' });
  }
});

app.delete('/admin/products/:id', authMiddleware, requireAdmin, async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.product.delete({ where: { id } });
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed to delete product' });
  }
});

// Booking endpoints
app.post('/bookings', async (req, res) => {
  try {
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

    let userId = null;
    if (userEmail) {
      const user = await prisma.user.findUnique({ where: { email: userEmail } });
      if (user) userId = user.id;
    }

    const booking = await prisma.booking.create({
      data: {
        userId,
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
        status: 'pending'
      }
    });

    // Send confirmation email if user email is provided
    if (userEmail) {
      await sendBookingConfirmation(booking, userEmail);
    }

    res.status(201).json({ booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed to create booking' });
  }
});

app.get('/bookings', async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { id: true, email: true, name: true } } }
    });
    res.json({ bookings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed to fetch bookings' });
  }
});

app.put('/bookings/:id/status', authMiddleware, requireAdmin, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;
    
    if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const booking = await prisma.booking.update({
      where: { id },
      data: { status }
    });

    res.json({ booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed to update booking status' });
  }
});

app.post('/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: 'email and password are required' });
    }
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: 'email already in use' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: passwordHash, name: name || null, role: 'USER' },
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    });
    
    // Generate JWT token for new user
    const secret = process.env.JWT_SECRET || 'dev-secret';
    const token = jwt.sign({ sub: user.id, role: user.role }, secret, { expiresIn: '7d' });
    
    res.status(201).json({ 
      user,
      token 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'registration failed' });
  }
});

app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: 'email and password are required' });
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'invalid credentials' });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'invalid credentials' });
    }
    const secret = process.env.JWT_SECRET || 'dev-secret';
    const token = jwt.sign({ sub: user.id, role: user.role }, secret, { expiresIn: '7d' });
    res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'login failed' });
  }
});

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});