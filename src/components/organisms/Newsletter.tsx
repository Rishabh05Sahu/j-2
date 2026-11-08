"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";

export function Newsletter() {
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();

  return (
    <div className="mt-8 max-w-md">
      <AnimatePresence mode="wait" initial={false}>
        {done ? (
          <motion.p
            key="done"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 border-b border-ivory/30 py-3 text-sm text-ivory"
            role="status"
          >
            <Check className="h-4 w-4 text-champagne" strokeWidth={1.5} />
            Thank you — you&apos;re on the list.
          </motion.p>
        ) : (
          <motion.form
            key="form"
            exit={{ opacity: 0, y: -6 }}
            onSubmit={handleSubmit(() => setDone(true))}
            noValidate
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <div className="flex items-center border-b border-ivory/30 focus-within:border-ivory">
              <input
                id="newsletter-email"
                type="email"
                placeholder="Your email address"
                autoComplete="email"
                aria-invalid={errors.email ? true : undefined}
                aria-describedby="newsletter-error"
                className="h-12 flex-1 bg-transparent text-sm text-ivory placeholder:text-ivory/45 focus:outline-none focus-visible:outline-none"
                {...register("email", {
                  required: "Please enter your email address.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address.",
                  },
                })}
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex h-11 w-11 items-center justify-center text-ivory transition-transform hover:translate-x-0.5"
              >
                <ArrowRight className="h-4 w-4" strokeWidth={1.4} />
              </button>
            </div>
            <p id="newsletter-error" className="mt-2 min-h-4 text-xs text-champagne" role="alert">
              {errors.email?.message}
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
