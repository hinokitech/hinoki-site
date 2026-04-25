"use client";

import { ValidationError, useForm } from "@formspree/react";
import { useEffect, useId } from "react";

export function RequestAccessModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const titleId = useId();
  const [investorState, submitInvestors] = useForm("mrerjnrg");
  const [partnerState, submitPartners] = useForm("mrerjnrg");

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200]">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="absolute inset-0 overflow-y-auto px-5 py-8 md:px-12">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="mx-auto w-full max-w-[980px] rounded-md border border-border bg-bg-base shadow-lg"
        >
          <div className="flex items-start justify-between gap-6 border-b border-border px-6 py-5">
            <div>
              <div
                id={titleId}
                className="text-[18px] font-medium tracking-[-0.01em] text-fg-primary"
              >
                Request Access
              </div>
              <div className="mt-1 text-[13px] leading-[1.6] text-fg-secondary">
                Choose a path and we’ll follow up.
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-bg-base text-fg-secondary transition-colors duration-200 hover:bg-bg-subtle hover:text-fg-primary"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-2">
            <section className="bg-bg-base px-6 py-6">
              <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
                Investors
              </div>
              <div className="mb-4 text-[14px] leading-[1.7] text-fg-secondary">
                Request our pitch deck and data room
              </div>

              <form onSubmit={submitInvestors} className="flex flex-col gap-3">
                <input type="hidden" name="audience" value="Investors" />
                <Field label="Name">
                  <input
                    name="name"
                    required
                    className="h-10 w-full rounded-md border border-border bg-bg-base px-3 text-[14px] text-fg-primary outline-none transition-colors duration-200 placeholder:text-fg-tertiary focus:border-border-strong"
                    placeholder="Your name"
                  />
                </Field>
                <Field label="Email">
                  <input
                    name="email"
                    type="email"
                    required
                    className="h-10 w-full rounded-md border border-border bg-bg-base px-3 text-[14px] text-fg-primary outline-none transition-colors duration-200 placeholder:text-fg-tertiary focus:border-border-strong"
                    placeholder="you@company.com"
                  />
                </Field>
                <ValidationError
                  field="email"
                  prefix="Email"
                  errors={investorState.errors}
                  className="text-[12px] text-fg-secondary"
                />
                <Field label="I am a">
                  <select
                    name="investor_type"
                    required
                    className="h-10 w-full rounded-md border border-border bg-bg-base px-3 text-[14px] text-fg-primary outline-none transition-colors duration-200 focus:border-border-strong"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select one
                    </option>
                    <option value="Venture investor">Venture investor</option>
                    <option value="Corporate venture">Corporate venture</option>
                    <option value="Family office">Family office</option>
                    <option value="Other">Other</option>
                  </select>
                </Field>

                <button
                  type="submit"
                  disabled={investorState.submitting}
                  className="mt-2 inline-flex h-11 items-center justify-center rounded-md bg-accent px-6 text-[13px] font-medium text-fg-inverse transition-colors duration-200 hover:bg-accent-hover"
                >
                  Request Deck
                </button>
                {investorState.succeeded ? (
                  <div className="text-[12px] leading-[1.6] text-fg-secondary">
                    Received — we&apos;ll follow up shortly.
                  </div>
                ) : null}
              </form>
            </section>

            <section className="bg-bg-base px-6 py-6">
              <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
                Partners
              </div>
              <div className="mb-4 text-[14px] leading-[1.7] text-fg-secondary">
                If your platform requires reflex-speed control, we want to hear
                from you
              </div>

              <form onSubmit={submitPartners} className="flex flex-col gap-3">
                <input type="hidden" name="audience" value="Partners" />
                <Field label="Name">
                  <input
                    name="name"
                    required
                    className="h-10 w-full rounded-md border border-border bg-bg-base px-3 text-[14px] text-fg-primary outline-none transition-colors duration-200 placeholder:text-fg-tertiary focus:border-border-strong"
                    placeholder="Your name"
                  />
                </Field>
                <Field label="Email">
                  <input
                    name="email"
                    type="email"
                    required
                    className="h-10 w-full rounded-md border border-border bg-bg-base px-3 text-[14px] text-fg-primary outline-none transition-colors duration-200 placeholder:text-fg-tertiary focus:border-border-strong"
                    placeholder="you@company.com"
                  />
                </Field>
                <ValidationError
                  field="email"
                  prefix="Email"
                  errors={partnerState.errors}
                  className="text-[12px] text-fg-secondary"
                />
                <Field label="Tell us about your platform.">
                  <textarea
                    name="platform"
                    required
                    rows={4}
                    className="w-full resize-none rounded-md border border-border bg-bg-base px-3 py-2 text-[14px] leading-[1.6] text-fg-primary outline-none transition-colors duration-200 placeholder:text-fg-tertiary focus:border-border-strong"
                    placeholder="Robot type, sensing stack, control loop, constraints…"
                  />
                </Field>

                <button
                  type="submit"
                  disabled={partnerState.submitting}
                  className="mt-2 inline-flex h-11 items-center justify-center rounded-md bg-accent px-6 text-[13px] font-medium text-fg-inverse transition-colors duration-200 hover:bg-accent-hover"
                >
                  Start Conversation
                </button>
                {partnerState.succeeded ? (
                  <div className="text-[12px] leading-[1.6] text-fg-secondary">
                    Received — we&apos;ll follow up shortly.
                  </div>
                ) : null}
              </form>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[12px] text-fg-tertiary">{label}</span>
      {children}
    </label>
  );
}

