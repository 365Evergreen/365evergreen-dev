# ContactForm Component

## Purpose
A responsive contact form with validation and submission handling.

## Props
None. The component manages its own state internally.

## Usage
```tsx
import { ContactForm } from '@/components';

export function ContactPage() {
  return (
    <div>
      <h1>Contact us</h1>
      <ContactForm />
    </div>
  );
}
```

## Features
- Two-column layout for name, email, and phone fields (desktop)
- Single-column layout for enquiry type and message
- Full client-side validation
- Loading state during submission
- Success and error feedback messages
- Form reset after successful submission
- Accessible with proper labels and ARIA attributes
- Responsive design that stacks on mobile

## Fields
1. **First name** (required) - Text input
2. **Last name** (required) - Text input
3. **Email** (required) - Email input with validation
4. **Phone** (optional) - Tel input
5. **How can we help** (required) - Select dropdown with predefined options
6. **Message** (required) - Textarea with minimum 6 rows

## Styling
Uses CSS Modules via `styles.module.css`. The form layout adapts to screen size:
- Mobile: All fields stacked (1 column)
- Tablet/Desktop (768px+): Name, email, and phone in 2-column grid
- Enquiry type and message remain full-width on all screens

## Form Submission
Currently contains placeholder submission logic. To connect to a backend:

1. Replace the TODO in `handleSubmit` with your API call
2. Update the endpoint to match your backend service
3. Handle response status codes appropriately

Example implementation:
```tsx
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
});

if (!response.ok) {
  throw new Error('Submission failed');
}
```

## Admin Configuration
Dropdown options can be customised in the `helpWith` select element. Update the option values and labels as needed for your use case.
