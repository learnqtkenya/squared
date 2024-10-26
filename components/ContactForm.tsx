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
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          service_id: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
          template_id: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
          user_id: process.env.NEXT_PUBLIC_EMAILJS_USER_ID,
          template_params: {
            from_name: formData.name,
            reply_to: formData.email,
            message: formData.message,
            to_email: CONTACT_EMAIL
          }
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Contact form submission error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input 
          type="text" 
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Name" 
          className="p-2 border rounded-lg text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          required
        />
        <input 
          type="email" 
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email" 
          className="p-2 border rounded-lg text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>
      <textarea 
        name="message"
        value={formData.message}
        onChange={handleInputChange}
        placeholder="Tell us about your project" 
        className="w-full p-2 border rounded-lg mb-4 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        rows={4}
        required
      />
      <button 
        type="submit" 
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors w-full disabled:bg-blue-400"
        disabled={submitStatus === 'sending'}
      >
        {submitStatus === 'sending' ? 'Sending...' : 'Send Message'}
      </button>
      
      {submitStatus === 'success' && (
        <div className="mt-4 text-green-600">
          Message sent successfully! We'll get back to you soon.
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="mt-4 text-red-600">
          There was an error sending your message. Please try again later.
        </div>
      )}
    </form>
  );
};