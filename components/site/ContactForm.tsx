"use client";

import { ValidationError, useForm } from "@formspree/react";
import type { ReactNode } from "react";
import { buttonVariants } from "@/components/ui/button";
import type { SiteCopy } from "@/content/site.en";

// Same Formspree form (and inbox) as the current Request Access modal.
const FORMSPREE_ID = "mrerjnrg";

// The live modal's fields, on the dark surface.
const FIELD =
  "w-full rounded-md border border-edge bg-tint px-4 text-[15px] text-fg-primary outline-none placeholder:text-fg-tertiary transition-colors duration-200 hover:border-edge-strong focus:border-accent/60";

export function ContactForm({ topic }: { topic: SiteCopy["contact"]["topic"] }) {
  const [state, handleSubmit] = useForm(FORMSPREE_ID);

  if (state.succeeded) {
    return (
      <p role="status" className="text-[16px] leading-[1.6] text-fg-primary">
        Received. We’ll follow up shortly.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
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
      <Field id="contact-topic" label={topic.label}>
        <div className="relative">
          <select
            id="contact-topic"
            name="topic"
            required
            defaultValue=""
            className={`${FIELD} h-12 appearance-none pr-11 invalid:text-fg-tertiary`}
          >
            <option value="" disabled>
              {topic.placeholder}
            </option>
            {topic.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <svg
            aria-hidden
            viewBox="0 0 12 12"
            className="pointer-events-none absolute right-4 top-1/2 size-3 -translate-y-1/2 text-fg-tertiary"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2.5 4.5 6 8l3.5-3.5" />
          </svg>
        </div>
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
        className={buttonVariants({ className: "mt-1 w-full" })}
      >
        Send
      </button>
    </form>
  );
}

function Field({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[12px] text-fg-tertiary">
        {label}
      </label>
      {children}
    </div>
  );
}
