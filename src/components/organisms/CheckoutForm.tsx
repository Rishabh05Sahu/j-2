"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, CreditCard, Lock, Store, Wallet } from "lucide-react";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/atoms/Button";
import { Input, Select } from "@/components/atoms/Input";
import { Checkbox } from "@/components/atoms/Checkbox";
import { Spinner } from "@/components/atoms/Spinner";
import { FormField } from "@/components/molecules/FormField";
import { formatCurrency } from "@/lib/format-currency";
import { easeLux } from "@/constants/design-tokens";
import { cn } from "@/lib/cn";

export interface CheckoutValues {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  apartment: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  shippingMethod: "standard" | "express";
  giftNote: string;
  paymentMethod: "demo-card" | "demo-wallet" | "boutique";
  acknowledge: boolean;
}

export const STEPS = ["Contact", "Shipping", "Review", "Payment"] as const;

const STEP_FIELDS: (keyof CheckoutValues)[][] = [
  ["email", "firstName", "lastName", "phone"],
  ["address", "city", "region", "postalCode", "country", "shippingMethod"],
  [],
  ["paymentMethod", "acknowledge"],
];

export const EXPRESS_FEE = 35;

const PAYMENT_METHODS = [
  {
    id: "demo-card" as const,
    label: "Demo card",
    description: "Simulated card payment — no card details are requested.",
    icon: CreditCard,
  },
  {
    id: "demo-wallet" as const,
    label: "Demo digital wallet",
    description: "A simulated one-tap wallet confirmation.",
    icon: Wallet,
  },
  {
    id: "boutique" as const,
    label: "Pay at the boutique",
    description: "Reserve now, settle in person (demo).",
    icon: Store,
  },
];

export function CheckoutForm({
  shippingCost,
  onStepChange,
  onComplete,
  reviewSlot,
}: {
  shippingCost: number;
  onStepChange?: (step: number, values: Partial<CheckoutValues>) => void;
  onComplete: (values: CheckoutValues) => void;
  reviewSlot: React.ReactNode;
}) {
  const [step, setStep] = useState(0);
  const [processing, setProcessing] = useState(false);
  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    control,
    formState: { errors },
  } = useForm<CheckoutValues>({
    mode: "onTouched",
    defaultValues: {
      country: "United States",
      shippingMethod: "standard",
      paymentMethod: "demo-card",
      acknowledge: false,
    },
  });

  const shippingMethod = useWatch({ control, name: "shippingMethod" });
  const paymentMethod = useWatch({ control, name: "paymentMethod" });

  const goTo = (next: number) => {
    setStep(next);
    onStepChange?.(next, getValues());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const next = async () => {
    const ok = await trigger(STEP_FIELDS[step]);
    if (ok) goTo(step + 1);
  };

  const submit = handleSubmit((values) => {
    setProcessing(true);
    setTimeout(() => onComplete(values), 1400);
  });

  const values = getValues();

  return (
    <form onSubmit={submit} noValidate aria-label="Checkout">
      {/* Stepper */}
      <ol className="mb-10 grid grid-cols-4 gap-2" aria-label="Checkout progress">
        {STEPS.map((label, i) => (
          <li key={label}>
            <button
              type="button"
              disabled={i > step}
              onClick={() => i < step && goTo(i)}
              aria-current={i === step ? "step" : undefined}
              className="flex w-full flex-col items-start gap-2 text-left disabled:cursor-default"
            >
              <span
                className={cn(
                  "h-px w-full transition-colors duration-500",
                  i <= step ? "bg-espresso" : "bg-line",
                )}
              />
              <span
                className={cn(
                  "flex items-center gap-1.5 text-[0.625rem] uppercase tracking-[0.16em]",
                  i === step ? "text-charcoal" : i < step ? "text-stone" : "text-stone/60",
                )}
              >
                {i < step && <Check className="h-3 w-3" strokeWidth={2} />}
                <span className="hidden min-[400px]:inline">{label}</span>
                <span className="min-[400px]:hidden">{i + 1}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.3, ease: easeLux }}
        >
          {step === 0 && (
            <fieldset>
              <legend className="font-serif text-3xl font-light text-charcoal">Contact information</legend>
              <p className="mt-2 text-sm text-stone">We&apos;ll send your demo confirmation here.</p>
              <div className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                <FormField id="email" label="Email" error={errors.email?.message} className="sm:col-span-2">
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    invalid={!!errors.email}
                    aria-describedby="email-message"
                    {...register("email", {
                      required: "Please enter your email.",
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Please enter a valid email." },
                    })}
                  />
                </FormField>
                <FormField id="firstName" label="First name" error={errors.firstName?.message}>
                  <Input
                    id="firstName"
                    autoComplete="given-name"
                    invalid={!!errors.firstName}
                    aria-describedby="firstName-message"
                    {...register("firstName", { required: "Please enter your first name." })}
                  />
                </FormField>
                <FormField id="lastName" label="Last name" error={errors.lastName?.message}>
                  <Input
                    id="lastName"
                    autoComplete="family-name"
                    invalid={!!errors.lastName}
                    aria-describedby="lastName-message"
                    {...register("lastName", { required: "Please enter your last name." })}
                  />
                </FormField>
                <FormField
                  id="phone"
                  label="Phone (optional)"
                  hint="Only used for delivery updates."
                  error={errors.phone?.message}
                  className="sm:col-span-2"
                >
                  <Input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    invalid={!!errors.phone}
                    aria-describedby="phone-message"
                    {...register("phone", {
                      pattern: { value: /^[+()\d\s-]{7,}$/, message: "Please enter a valid phone number." },
                    })}
                  />
                </FormField>
              </div>
            </fieldset>
          )}

          {step === 1 && (
            <fieldset>
              <legend className="font-serif text-3xl font-light text-charcoal">Shipping</legend>
              <div className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                <FormField id="address" label="Address" error={errors.address?.message} className="sm:col-span-2">
                  <Input
                    id="address"
                    autoComplete="address-line1"
                    invalid={!!errors.address}
                    aria-describedby="address-message"
                    {...register("address", { required: "Please enter your street address." })}
                  />
                </FormField>
                <FormField id="apartment" label="Apartment, suite (optional)" className="sm:col-span-2">
                  <Input id="apartment" autoComplete="address-line2" {...register("apartment")} />
                </FormField>
                <FormField id="city" label="City" error={errors.city?.message}>
                  <Input
                    id="city"
                    autoComplete="address-level2"
                    invalid={!!errors.city}
                    aria-describedby="city-message"
                    {...register("city", { required: "Please enter your city." })}
                  />
                </FormField>
                <FormField id="region" label="State / Region" error={errors.region?.message}>
                  <Input
                    id="region"
                    autoComplete="address-level1"
                    invalid={!!errors.region}
                    aria-describedby="region-message"
                    {...register("region", { required: "Please enter your state or region." })}
                  />
                </FormField>
                <FormField id="postalCode" label="Postal code" error={errors.postalCode?.message}>
                  <Input
                    id="postalCode"
                    autoComplete="postal-code"
                    invalid={!!errors.postalCode}
                    aria-describedby="postalCode-message"
                    {...register("postalCode", {
                      required: "Please enter your postal code.",
                      pattern: { value: /^[A-Za-z0-9\s-]{3,10}$/, message: "Please enter a valid postal code." },
                    })}
                  />
                </FormField>
                <FormField id="country" label="Country" error={errors.country?.message}>
                  <Select id="country" autoComplete="country-name" {...register("country", { required: true })}>
                    {["United States", "Canada", "United Kingdom", "France", "Australia", "Japan"].map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </Select>
                </FormField>
              </div>

              <div className="mt-8">
                <p className="eyebrow mb-3 text-stone">Delivery method</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    {
                      id: "standard",
                      label: "Insured standard",
                      sub: "3–5 business days",
                      price: shippingCost === 0 ? "Complimentary" : formatCurrency(shippingCost),
                    },
                    {
                      id: "express",
                      label: "Insured express",
                      sub: "1–2 business days",
                      price: formatCurrency(EXPRESS_FEE),
                    },
                  ].map((m) => (
                    <label
                      key={m.id}
                      className={cn(
                        "flex cursor-pointer items-center gap-3 border p-4 transition-colors",
                        shippingMethod === m.id ? "border-espresso bg-cream/60" : "border-line hover:border-charcoal/40",
                      )}
                    >
                      <input type="radio" value={m.id} className="sr-only" {...register("shippingMethod")} />
                      <span
                        aria-hidden
                        className={cn(
                          "flex h-4 w-4 items-center justify-center rounded-full border",
                          shippingMethod === m.id ? "border-espresso" : "border-charcoal/40",
                        )}
                      >
                        {shippingMethod === m.id && <span className="h-2 w-2 rounded-full bg-espresso" />}
                      </span>
                      <span className="flex-1">
                        <span className="block text-sm text-charcoal">{m.label}</span>
                        <span className="block text-xs text-stone">{m.sub}</span>
                      </span>
                      <span className="text-sm text-charcoal">{m.price}</span>
                    </label>
                  ))}
                </div>
              </div>

              <FormField id="giftNote" label="Gift note (optional)" className="mt-8" hint="Hand-written on our ivory card.">
                <Input id="giftNote" maxLength={140} {...register("giftNote")} />
              </FormField>
            </fieldset>
          )}

          {step === 2 && (
            <section aria-labelledby="review-title">
              <h2 id="review-title" className="font-serif text-3xl font-light text-charcoal">
                Review your order
              </h2>
              <div className="mt-8 grid gap-6 border-y border-line py-6 text-sm sm:grid-cols-2">
                <div>
                  <div className="flex items-center justify-between">
                    <p className="eyebrow text-stone">Contact</p>
                    <button type="button" onClick={() => goTo(0)} className="text-xs text-charcoal underline underline-offset-4">
                      Edit
                    </button>
                  </div>
                  <p className="mt-2 text-charcoal">
                    {values.firstName} {values.lastName}
                  </p>
                  <p className="text-stone">{values.email}</p>
                  {values.phone && <p className="text-stone">{values.phone}</p>}
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <p className="eyebrow text-stone">Ship to</p>
                    <button type="button" onClick={() => goTo(1)} className="text-xs text-charcoal underline underline-offset-4">
                      Edit
                    </button>
                  </div>
                  <p className="mt-2 text-charcoal">
                    {values.address}
                    {values.apartment && `, ${values.apartment}`}
                  </p>
                  <p className="text-stone">
                    {values.city}, {values.region} {values.postalCode}
                  </p>
                  <p className="text-stone">{values.country}</p>
                  <p className="mt-2 text-xs text-stone">
                    {values.shippingMethod === "express" ? "Insured express (1–2 days)" : "Insured standard (3–5 days)"}
                  </p>
                </div>
              </div>
              <div className="mt-6">{reviewSlot}</div>
            </section>
          )}

          {step === 3 && (
            <fieldset>
              <legend className="font-serif text-3xl font-light text-charcoal">Payment</legend>
              <p className="mt-2 flex items-center gap-2 text-sm text-stone">
                <Lock className="h-3.5 w-3.5" strokeWidth={1.5} />
                This is a demonstration. No payment details are requested or processed.
              </p>
              <div className="mt-8 grid gap-3">
                {PAYMENT_METHODS.map((m) => (
                  <label
                    key={m.id}
                    className={cn(
                      "flex cursor-pointer items-center gap-4 border p-4 transition-colors sm:p-5",
                      paymentMethod === m.id ? "border-espresso bg-cream/60" : "border-line hover:border-charcoal/40",
                    )}
                  >
                    <input type="radio" value={m.id} className="sr-only" {...register("paymentMethod", { required: true })} />
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ivory text-espresso ring-1 ring-line">
                      <m.icon className="h-4 w-4" strokeWidth={1.4} />
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm text-charcoal">{m.label}</span>
                      <span className="block text-xs text-stone">{m.description}</span>
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        "flex h-5 w-5 items-center justify-center rounded-full border",
                        paymentMethod === m.id ? "border-espresso bg-espresso text-ivory" : "border-charcoal/30",
                      )}
                    >
                      {paymentMethod === m.id && <Check className="h-3 w-3" strokeWidth={2} />}
                    </span>
                  </label>
                ))}
              </div>
              <div className="mt-6">
                <Checkbox
                  label="I understand this is a demo order and nothing will be charged or shipped."
                  {...register("acknowledge", { required: "Please confirm to place your demo order." })}
                />
                {errors.acknowledge && (
                  <p role="alert" className="mt-1 text-xs text-rose">
                    {errors.acknowledge.message}
                  </p>
                )}
              </div>
            </fieldset>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-10 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => goTo(step - 1)}
            className="inline-flex h-11 items-center gap-2 text-[0.6875rem] uppercase tracking-[0.16em] text-charcoal"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.4} /> Back
          </button>
        ) : (
          <Button href="/cart" variant="link">
            Return to bag
          </Button>
        )}
        {step < 3 ? (
          <Button size="lg" onClick={next} icon={<ArrowRight className="h-4 w-4" strokeWidth={1.4} />}>
            {step === 2 ? "Continue to payment" : "Continue"}
          </Button>
        ) : (
          <Button type="submit" size="lg" disabled={processing} className="min-w-[240px]">
            {processing ? (
              <span className="flex items-center gap-3">
                <Spinner label="Placing your demo order" /> Placing order…
              </span>
            ) : (
              "Place Demo Order"
            )}
          </Button>
        )}
      </div>
    </form>
  );
}
