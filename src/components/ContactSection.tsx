import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { DoodleUnderline, DoodleTape, DoodleStar } from '@/components/Doodles';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const email = 'hello@alexmorgan.dev';

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSubmitMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsDialogOpen(false);
    }, 1800);
  };

  return (
    <section id="contact" className="py-16 md:py-24 px-6 sm:pl-32 sm:pr-8 max-w-5xl mx-auto">
      <div className="relative">
        {/* Top Washi Tape */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
          <DoodleTape variant="yellow" className="w-32 h-6" />
        </div>

        <Card className="bg-[#fffdf9] sketch-box-thick doodle-shadow-lg p-8 sm:p-12 text-center flex flex-col items-center justify-center relative overflow-hidden">
          {/* Air Mail Hand-Drawn Stamp in Top Right */}
          <div className="hidden sm:block absolute top-6 right-6 border-2 border-dashed border-rose-500 p-2 rotate-6 text-rose-500 font-sketch text-xs uppercase tracking-widest pointer-events-none select-none">
            <span className="block font-bold">AIR MAIL ✈️</span>
            <span>POSTAGE PAID</span>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <DoodleStar size={16} color="#f59e0b" />
            <span className="font-sketch text-xs font-bold uppercase tracking-widest text-slate-500">
              Page 03 // Inbox
            </span>
            <DoodleStar size={16} color="#f59e0b" />
          </div>

          <div className="relative inline-block mb-4">
            <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight font-sans max-w-xl">
              Let’s write something remarkable together.
            </h2>
            <DoodleUnderline color="#f43f5e" className="absolute -bottom-2 left-0 w-full" />
          </div>

          <p className="font-hand text-xl text-slate-700 max-w-md mb-8 leading-snug">
            Open for frontend architecture roles, high-impact consulting, or design system collaborations.
          </p>

          {/* Email Copy Card */}
          <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
            <div className="bg-white sketch-box-sm px-5 py-2.5 text-slate-900 font-mono text-sm font-semibold shadow-doodle-sm">
              {email}
            </div>
            <Button
              variant="default"
              size="default"
              onClick={handleCopy}
              className="font-sketch text-sm tracking-wide"
            >
              {copied ? '✅ Copied to Clipboard!' : '📋 Copy Email'}
            </Button>
          </div>

          <div className="flex items-center gap-3 text-sm font-hand text-slate-600">
            <span>Prefer a quick note?</span>
            <button
              onClick={() => setIsDialogOpen(true)}
              className="font-bold text-slate-900 underline underline-offset-4 hover:text-blue-600 transition-colors cursor-pointer text-base"
            >
              Send a Scribble Message ✍️
            </button>
          </div>
        </Card>
      </div>

      {/* Direct Quick Message Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-slate-900 font-sans">
              Leave a Note
            </DialogTitle>
            <DialogDescription className="text-sm font-hand text-slate-600 text-base">
              Drop your email and a quick message. I’ll write back soon!
            </DialogDescription>
          </DialogHeader>

          {submitted ? (
            <div className="py-8 text-center bg-yellow-50 sketch-box-sm my-2">
              <p className="font-sketch text-base font-bold text-slate-900">
                ✏️ Note dispatched successfully!
              </p>
              <p className="font-hand text-sm text-slate-600 mt-1">
                Thanks for writing. Check your inbox soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitMessage} className="space-y-4 pt-2">
              <div>
                <label className="block font-sketch text-xs font-bold text-slate-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Jane Doe"
                  className="w-full h-10 px-3 text-sm bg-white sketch-box-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block font-sketch text-xs font-bold text-slate-700 mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="jane@example.com"
                  className="w-full h-10 px-3 text-sm bg-white sketch-box-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block font-sketch text-xs font-bold text-slate-700 mb-1">
                  Your Message
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Hi Alex, let's talk about..."
                  className="w-full p-3 text-sm bg-white sketch-box-sm focus:outline-none focus:ring-2 focus:ring-slate-900 resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsDialogOpen(false)}
                  className="font-sketch text-sm"
                >
                  Cancel
                </Button>
                <Button type="submit" variant="default" size="sm" className="font-sketch text-sm">
                  Send Note 🚀
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
