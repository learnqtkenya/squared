import React, { useState } from 'react';
import { CONTACT_EMAIL } from '@/lib/constants';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('sending');

    try {
      // Ensure all required IDs are available
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        console.error('Missing required EmailJS configuration');
        setSubmitStatus('error');
        return;
      }

      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: {
            from_name: formData.name,
            reply_to: formData.email,
            message: formData.message,
            to_email: CONTACT_EMAIL
          }
        })
      });

      const responseText = await response.text();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        console.error('EmailJS error:', responseText);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitStatus('error');
    }
  };

  const inputClasses = "p-2 border border-emerald-200 rounded-lg text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-white hover:border-emerald-300 transition-colors outline-none";

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-emerald-100 max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Name"
          className={inputClasses}
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          className={inputClasses}
          required
        />
      </div>

      <textarea
        name="message"
        value={formData.message}
        onChange={handleInputChange}
        placeholder="Tell us about your project"
        className={`w-full ${inputClasses} mb-4`}
        rows={4}
        required
      />

      <button
        type="submit"
        className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors w-full disabled:bg-emerald-400 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
        disabled={submitStatus === 'sending'}
      >
        {submitStatus === 'sending' ? 'Sending...' : 'Send Message'}
      </button>

      {submitStatus === 'success' && (
        <div className="mt-4 text-emerald-600 bg-emerald-50 p-3 rounded-lg border border-emerald-200">
          Message sent successfully! We'll get back to you soon.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mt-4 text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
          There was an error sending your message. Please try again later.
        </div>
      )}
    </form>
  );
};

export default ContactForm;