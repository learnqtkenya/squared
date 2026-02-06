'use client';
import { ContactForm } from "@/components/forms";

export default function ContactPage() {
  return (
    <div className="min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <ContactForm />
    </div>
  );
}