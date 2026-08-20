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

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const email = 'hello@alexmorgan.dev';

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
    <section id="contact" className="py-16 md:py-24 px-6 max-w-5xl mx-auto">
      <Card className="glass-panel p-8 sm:p-12 text-center flex flex-col items-center justify-center relative overflow-hidden border-white/90">
        <span className="text-xs font-semibold uppercase tracking-widest text-slate-400 block mb-3">
          Get In Touch
        </span>
        <h2 className="text-3xl sm:text-5xl font-semibold text-slate-900 tracking-tight mb-4 max-w-xl">
          Let’s build something clear and meaningful.
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-md mb-8 leading-relaxed">
          Open for full-time roles, contract advisory, or select freelance projects.
        </p>

        {/* Email Copy Card */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
          <div className="glass-pill px-5 py-2.5 rounded-xl text-slate-900 font-mono text-sm border-slate-300/80 shadow-sm">
            {email}
          </div>
          <Button variant="default" size="default" onClick={handleCopy}>
            {copied ? 'Copied to Clipboard!' : 'Copy Email'}
          </Button>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
          <span>Or write directly:</span>
          <button
            onClick={() => setIsDialogOpen(true)}
            className="text-slate-900 underline underline-offset-4 hover:opacity-80 transition-opacity"
          >
            Send Quick Message
          </button>
        </div>
      </Card>

      {/* Direct Quick Message Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-slate-900">
              Send a Message
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-500">
              Leave your details below and I’ll respond within 24 hours.
            </DialogDescription>
          </DialogHeader>

          {submitted ? (
            <div className="py-8 text-center glass-panel rounded-xl border-slate-200">
              <p className="text-sm font-semibold text-slate-900">Message sent successfully!</p>
              <p className="text-xs text-slate-500 mt-1">Thank you for reaching out.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmitMessage} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Jane Doe"
                  className="w-full h-10 px-3 text-sm rounded-xl border border-slate-200/80 bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-slate-950"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="jane@example.com"
                  className="w-full h-10 px-3 text-sm rounded-xl border border-slate-200/80 bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-slate-950"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Message
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Hi Alex, I'd love to talk about..."
                  className="w-full p-3 text-sm rounded-xl border border-slate-200/80 bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-slate-950 resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <Button type="button" variant="ghost" size="sm" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="default" size="sm">
                  Send Message
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
