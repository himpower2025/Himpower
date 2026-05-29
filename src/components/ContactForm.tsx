"use client";

import React, { useState } from "react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "../lib/firebase";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Web & mobile development",
    budget: "NPR 10k - NPR 25k",
    timeline: "1 - 3 months",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [mailtoLink, setMailtoLink] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus("error");
      setErrorMessage("Please fill in all required fields (Name, Email, Message).");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    const inquiryId = "inq_" + Math.random().toString(36).substring(2, 15);
    const path = `inquiries/${inquiryId}`;

    try {
      // Build the submission document following firestore.rules validation
      const docData = {
        id: inquiryId,
        name: formData.name,
        email: formData.email,
        projectType: formData.projectType,
        budget: formData.budget,
        timeline: formData.timeline,
        message: formData.message,
        status: "pending",
        createdAt: serverTimestamp(), // Match request.time check on rules
      };

      await setDoc(doc(db, "inquiries", inquiryId), docData);

      // Generate pre-populated mailto URL addressed to himpower2025@gmail.com
      const mailtoSubject = `[Himpower Project Brief] From ${formData.name}`;
      const mailtoBody = `Hello Himpower Team,\n\nI have submitted a new project brief through the website. Here are the details of my request:\n\n` +
        `-----------------------------------------\n` +
        `Client Name: ${formData.name}\n` +
        `Email Address: ${formData.email}\n` +
        `Service Required: ${formData.projectType}\n` +
        `Estimated Budget: ${formData.budget}\n` +
        `Desired Timeline: ${formData.timeline}\n` +
        `-----------------------------------------\n\n` +
        `Project Brief Details:\n` +
        `${formData.message}\n\n` +
        `-----------------------------------------\n` +
        `This inquiry matches your secure database record (ID: ${inquiryId}).\n`;

      const generatedMailto = `mailto:himpower2025@gmail.com?subject=${encodeURIComponent(mailtoSubject)}&body=${encodeURIComponent(mailtoBody)}`;
      setMailtoLink(generatedMailto);
      setSubmitStatus("success");

      setFormData({
        name: "",
        email: "",
        projectType: "Web & mobile development",
        budget: "NPR 10k - NPR 25k",
        timeline: "1 - 3 months",
        message: "",
      });

      // Automatically launch the mail client
      try {
        if (typeof window !== "undefined") {
          window.location.href = generatedMailto;
        }
      } catch (err) {
        console.warn("Mail client auto-open failed, showing email backup button", err);
      }
    } catch (err) {
      setSubmitStatus("error");
      setErrorMessage("Failed to submit. Please try again or email us directly.");
      try {
        // Log formatted Firestore Error for diagnostics as per skill guidelines
        handleFirestoreError(err, OperationType.CREATE, path);
      } catch (formattedErr) {
        if (formattedErr instanceof Error) {
          console.error("Diagnostic error summary:", formattedErr.message);
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full rounded-2xl border border-indigo-100 bg-white p-5 shadow-xl sm:p-8 text-slate-900">
      <h3 className="text-xl font-semibold text-slate-950">Send us a project brief</h3>
      <p className="mt-1.5 text-xs text-slate-500">
        Filled details will be securely saved in your Firebase database and sent to us.
      </p>

      {submitStatus === "success" && (
        <div className="mt-6 rounded-xl bg-emerald-50 p-4 border border-emerald-200 text-emerald-800">
          <p className="text-sm font-semibold">🎉 Proposal Received & Saved!</p>
          <p className="mt-1 text-xs leading-5">
            Thank you for reaching out to Himpower! Your project brief has been stored securely in the Firebase Database.
          </p>
          <p className="mt-2 text-xs leading-5">
            We also opened your email composer automatically to send a copy to <strong>himpower2025@gmail.com</strong>. If your browser blocked it, click the button below:
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {mailtoLink && (
              <a
                href={mailtoLink}
                className="inline-flex items-center gap-1.5 rounded-full bg-indigo-600 hover:bg-indigo-700 px-4 py-2 text-xs font-bold text-white transition shadow-md shadow-indigo-600/10 cursor-pointer"
              >
                ✉️ Send Email Copy
              </a>
            )}
            <button
              onClick={() => {
                setSubmitStatus("idle");
                setMailtoLink("");
              }}
              className="rounded-full border border-slate-300 bg-white hover:bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700 transition cursor-pointer"
            >
              Submit another brief
            </button>
          </div>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="mt-6 rounded-xl bg-rose-50 p-4 border border-rose-100 text-rose-800">
          <p className="text-sm font-semibold">Submission failed</p>
          <p className="mt-1 text-xs leading-5">{errorMessage}</p>
        </div>
      )}

      {submitStatus !== "success" && (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="name-input" className="block text-xs font-semibold text-slate-700">
              Your Name *
            </label>
            <input
              id="name-input"
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Minwoo Kim"
              className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="email-input" className="block text-xs font-semibold text-slate-700">
                Email Address *
              </label>
              <input
                id="email-input"
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@company.com"
                className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="projectType-select" className="block text-xs font-semibold text-slate-700">
                Service Required
              </label>
              <select
                id="projectType-select"
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500"
              >
                <option value="Web & mobile development" className="text-slate-900 bg-white">Web & Mobile Dev</option>
                <option value="Maintenance & evolution" className="text-slate-900 bg-white">Maintenance & Evolution</option>
                <option value="Delivery systems" className="text-slate-900 bg-white">Delivery & Operations Systems</option>
                <option value="Education content" className="text-slate-900 bg-white">Education Content Creation</option>
                <option value="Other" className="text-slate-900 bg-white">Other Custom Solutions</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="budget-select" className="block text-xs font-semibold text-slate-700">
                Estimated Budget
              </label>
              <select
                id="budget-select"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500"
              >
                <option value="Under NPR 10k" className="text-slate-900 bg-white">Under NPR 10,000</option>
                <option value="NPR 10k - NPR 25k" className="text-slate-900 bg-white">NPR 10,000 - NPR 25,000</option>
                <option value="NPR 25k - NPR 50k" className="text-slate-900 bg-white">NPR 25,000 - NPR 50,000</option>
                <option value="NPR 50k+" className="text-slate-900 bg-white">NPR 50,000+</option>
              </select>
            </div>

            <div>
              <label htmlFor="timeline-select" className="block text-xs font-semibold text-slate-700">
                Desired Timeline
              </label>
              <select
                id="timeline-select"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500"
              >
                <option value="Less than 1 month" className="text-slate-900 bg-white">Rapid Prototype (&lt; 1 mo)</option>
                <option value="1 - 3 months" className="text-slate-900 bg-white">Standard MVP (1 - 3 mos)</option>
                <option value="3 - 6 months" className="text-slate-900 bg-white">Enterprise Scale (3 - 6 mos)</option>
                <option value="Ongoing" className="text-slate-900 bg-white">Long Term retainer / Ongoing</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="message-textarea" className="block text-xs font-semibold text-slate-700">
              Project Brief *
            </label>
            <textarea
              id="message-textarea"
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your product goals, targeted users, and features..."
              className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <button
            id="submit-proposal-btn"
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 rounded-full py-3 text-sm font-semibold transition bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white shadow-md disabled:opacity-50"
          >
            {isSubmitting ? "Sending brief..." : "Submit Proposal Brief"}
          </button>
        </form>
      )}
    </div>
  );
}
