/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ShieldCheck, CreditCard, QrCode, ClipboardCheck, Sparkles, CheckCircle2 } from "lucide-react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  price: number;
}

export default function CheckoutModal({ isOpen, onClose, price }: CheckoutModalProps) {
  const [step, setStep] = useState<"form" | "pay" | "success">("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "card">("pix");
  const [copied, setCopied] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  // Form submit
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      alert("Please enter your name and email address.");
      return;
    }
    setStep("pay");
  };

  // Simulating PIX code copy
  const handleCopyPix = () => {
    setCopied(true);
    navigator.clipboard.writeText(`00020101021226830014br.gov.bcb.pix2561api.pix.pagamentos/v2/cob/${price.toFixed(2)}/packdefrasespagodebaixo`);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simulating payment verification
  const handleVerifyPayment = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setStep("success");
    }, 2000);
  };

  const resetModal = () => {
    setStep("form");
    setName("");
    setEmail("");
    setWhatsapp("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetModal}
            className="absolute inset-0 bg-brand-dark/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            className="relative w-full max-w-lg rounded-2xl border border-white/[0.08] bg-brand-card overflow-hidden shadow-2xl shadow-brand-orange/10 z-10"
          >
            {/* Top orange decorative gradient line */}
            <div className="h-1.5 w-full bg-gradient-to-r from-brand-orange to-brand-amber" />

            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-white/[0.05]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-brand-orange" />
                <span className="text-sm font-semibold tracking-wide text-white uppercase font-display">
                  100% Secure Checkout
                </span>
              </div>
              <button
                onClick={resetModal}
                className="p-1.5 rounded-full hover:bg-white/[0.05] text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Switcher */}
            <div className="p-6">
              {step === "form" && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                >
                  <div className="text-center mb-6">
                    <span className="text-xs font-mono font-medium text-brand-orange uppercase">
                      Step 1 of 2
                    </span>
                    <h3 className="text-xl font-bold text-white mt-1">
                      Billing & Access Details
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Enter your details below to receive your private portal login and instant video access.
                    </p>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 uppercase mb-1.5">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Brandon Taylor"
                        className="w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.02] text-white placeholder-slate-500 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 uppercase mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. brandon@gmail.com"
                        className="w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.02] text-white placeholder-slate-500 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 uppercase mb-1.5">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        placeholder="e.g. (555) 234-5678"
                        className="w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.02] text-white placeholder-slate-500 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all text-sm"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 mt-2 rounded-xl bg-gradient-to-r from-brand-orange to-brand-amber font-bold text-white text-base hover:opacity-90 transition-all cursor-pointer shadow-lg shadow-brand-orange/20 flex justify-center items-center gap-2"
                    >
                      Proceed to Payment • ${price.toFixed(2)}
                    </button>
                  </form>
                </motion.div>
              )}

              {step === "pay" && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <span className="text-xs font-mono font-medium text-brand-orange uppercase">
                      Step 2 of 2
                    </span>
                    <h3 className="text-xl font-bold text-white mt-1">
                      Choose Your Payment Method
                    </h3>
                  </div>

                  {/* Selector tab */}
                  <div className="grid grid-cols-2 gap-2 bg-black/40 p-1.5 rounded-xl border border-white/[0.05]">
                    <button
                      onClick={() => setPaymentMethod("card")}
                      className={`flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        paymentMethod === "card"
                          ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/20"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <CreditCard className="w-4.5 h-4.5" />
                      Credit / Debit Card
                    </button>
                    <button
                      onClick={() => setPaymentMethod("pix")}
                      className={`flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        paymentMethod === "pix"
                          ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/20"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <QrCode className="w-4.5 h-4.5" />
                      Instant Digital Pass
                    </button>
                  </div>

                  {paymentMethod === "card" ? (
                    <div className="space-y-4">
                      {/* Mock Credit Card Form */}
                      <div className="bg-gradient-to-br from-brand-card to-slate-900 border border-white/[0.06] p-5 rounded-2xl space-y-4">
                        <div className="flex justify-between items-center text-slate-400">
                          <span className="text-2xs font-mono uppercase tracking-widest font-semibold">SECURE CARD PAYMENT</span>
                          <CreditCard className="w-6 h-6 text-brand-orange" />
                        </div>
                        
                        <div>
                          <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Card Number</label>
                          <input
                            type="text"
                            placeholder="4444 5555 6666 7777"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-white/[0.08] bg-black/40 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-brand-orange text-xs"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Expiration</label>
                            <input
                              type="text"
                              placeholder="MM/YY"
                              className="w-full px-3.5 py-2.5 rounded-lg border border-white/[0.08] bg-black/40 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-brand-orange text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">CVC</label>
                            <input
                              type="text"
                              placeholder="123"
                              className="w-full px-3.5 py-2.5 rounded-lg border border-white/[0.08] bg-black/40 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-brand-orange text-xs"
                            />
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={handleVerifyPayment}
                        disabled={isVerifying}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-orange to-brand-amber font-bold text-white text-base hover:opacity-90 transition-all cursor-pointer shadow-lg shadow-brand-orange/20 flex justify-center items-center gap-2"
                      >
                        {isVerifying ? (
                          <>
                            <div className="w-4.5 h-4.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Processing Secure Order...
                          </>
                        ) : (
                          `Complete Order • $${price.toFixed(2)}`
                        )}
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center bg-black/20 border border-white/[0.05] p-5 rounded-2xl space-y-4">
                      {/* Simulated QR Code via SVG */}
                      <div className="p-3 bg-white rounded-xl shadow-lg relative">
                        <svg className="w-36 h-36 text-black" viewBox="0 0 100 100">
                          {/* Outer QR Borders */}
                          <rect x="5" y="5" width="25" height="25" fill="currentColor" />
                          <rect x="8" y="8" width="19" height="19" fill="white" />
                          <rect x="11" y="11" width="13" height="13" fill="currentColor" />

                          <rect x="70" y="5" width="25" height="25" fill="currentColor" />
                          <rect x="73" y="8" width="19" height="19" fill="white" />
                          <rect x="76" y="11" width="13" height="13" fill="currentColor" />

                          <rect x="5" y="70" width="25" height="25" fill="currentColor" />
                          <rect x="8" y="73" width="19" height="19" fill="white" />
                          <rect x="11" y="76" width="13" height="13" fill="currentColor" />

                          {/* Center mockup noise */}
                          <rect x="35" y="35" width="30" height="30" fill="currentColor" />
                          <rect x="38" y="38" width="24" height="24" fill="white" />
                          <rect x="42" y="42" width="16" height="16" fill="currentColor" />

                          {/* Random noise squares */}
                          <rect x="35" y="5" width="8" height="12" fill="currentColor" />
                          <rect x="50" y="10" width="12" height="6" fill="currentColor" />
                          <rect x="45" y="20" width="15" height="8" fill="currentColor" />
                          <rect x="5" y="35" width="12" height="15" fill="currentColor" />
                          <rect x="22" y="45" width="8" height="8" fill="currentColor" />
                          <rect x="5" y="55" width="6" height="10" fill="currentColor" />
                          <rect x="15" y="60" width="15" height="5" fill="currentColor" />

                          <rect x="70" y="35" width="10" height="15" fill="currentColor" />
                          <rect x="85" y="45" width="10" height="10" fill="currentColor" />
                          <rect x="75" y="58" width="20" height="7" fill="currentColor" />
                          <rect x="35" y="70" width="15" height="10" fill="currentColor" />
                          <rect x="55" y="75" width="10" height="12" fill="currentColor" />
                          <rect x="35" y="85" width="30" height="8" fill="currentColor" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="px-2 py-0.5 rounded bg-brand-orange text-white font-mono text-[9px] font-bold shadow-md">
                            INSTANT PASS ${price.toFixed(2)}
                          </div>
                        </div>
                      </div>

                      <div className="text-center space-y-1">
                        <p className="text-sm font-semibold text-white">Instant One-Click Order</p>
                        <p className="text-xs text-slate-400">Click below to claim instant access to your account:</p>
                      </div>

                      {/* Verify simulated button */}
                      <button
                        onClick={handleVerifyPayment}
                        disabled={isVerifying}
                        className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-600/50 font-bold text-white text-sm transition-all cursor-pointer shadow-lg shadow-emerald-500/10 flex justify-center items-center gap-2"
                      >
                        {isVerifying ? (
                          <>
                            <div className="w-4.5 h-4.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Activating your portal access...
                          </>
                        ) : (
                          "Confirm Order & Get Instant Access!"
                        )}
                      </button>
                    </div>
                  )}
                </motion.div>
              )}

              {step === "success" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-6 space-y-6"
                >
                  {/* Glowing success seal */}
                  <div className="flex justify-center">
                    <div className="relative w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                      <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping" />
                      <CheckCircle2 className="w-8 h-8 relative z-10" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-2xs font-mono font-bold tracking-widest text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full uppercase">
                      PAYMENT APPROVED
                    </span>
                    <h3 className="text-2xl font-extrabold text-white font-display tracking-tight mt-3">
                      Access Unlocked! 🎸
                    </h3>
                    <p className="text-sm text-slate-300 px-4">
                      Welcome aboard <strong>{name}</strong>! Your payment of ${price.toFixed(2)} was successful. Your <strong>The Bass Lick Library</strong> access has been granted.
                    </p>
                  </div>

                  {/* Mail mockup instructions */}
                  <div className="mx-auto max-w-sm bg-black/30 border border-white/[0.05] p-4 rounded-xl text-left text-xs text-slate-400 space-y-2.5">
                    <div className="flex items-center gap-2 text-brand-amber font-semibold">
                      <Sparkles className="w-4 h-4 text-brand-orange" />
                      Login instructions sent to:
                    </div>
                    <div className="font-mono text-slate-200 select-all underline bg-white/[0.02] px-2 py-1 rounded border border-white/[0.03]">
                      {email}
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-slate-400 pl-1">
                      <li>Check your inbox and spam folder.</li>
                      <li>Stream the video breakdown lessons in your private portal.</li>
                      <li>Practice with high-quality audio backing tracks.</li>
                    </ul>
                  </div>

                  <button
                    onClick={resetModal}
                    className="w-full py-4 mt-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 font-bold text-white text-base hover:opacity-90 transition-all cursor-pointer shadow-lg shadow-emerald-500/15"
                  >
                    Return to Main Page
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
