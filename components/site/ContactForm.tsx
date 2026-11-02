"use client";

import { ValidationError, useForm } from "@formspree/react";
import type { ReactNode } from "react";
import { buttonVariants } from "@/components/ui/button";

// Same Formspree form (and inbox) as the current Request Access modal.
const FORMSPREE_ID = "mrerjnrg";

const FIELD =
  "w-full rounded-[2px] border border-white/[0.1] bg-ground px-4 text-[15px] text-ink placeholder:text-faint transition-[border-color,background-color] duration-200 hover:border-white/20 focus:border-accent";

export function ContactForm() {
  const [state, handleSubmit] = useForm(FORMSPREE_ID);

  if (state.succeeded) {
    return (
      <p role="status" className="text-[16px] leading-[1.6] text-ink">
        Received — we&apos;ll follow up shortly.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <input type="hidden" name="audience" value="Website contact" />
      <Field id="contact-name" label="Name">
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          placeholder="Your name"
          className={`${FIELD} h-12`}
        />
      </Field>
      <Field id="contact-email" label="Email">
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@company.com"
          className={`${FIELD} h-12`}
        />
        <ValidationError
          prefix="Email"
          field="email"
          errors={state.errors}
          className="text-[13px] text-accent"
        />
      </Field>
      <Field id="contact-message" label="Message">
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          className={`${FIELD} resize-none py-3 leading-[1.6]`}
        />
      </Field>
      <button
        type="submit"
        disabled={state.submitting}
        className={buttonVariants({ className: "w-full" })}
      >
        Send
      </button>
    </form>
  );
}

function Field({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-label text-[10px] uppercase tracking-[0.16em] text-faint">
        {label}
      </label>
      {children}
    </div>
  );
}
