"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn, formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Spark } from "@/components/ui/graphics";

type Step = "gate" | "joining" | "queue" | "granted";
const EASE = [0.16, 1, 0.3, 1] as const;

export function AccessFlow({
  name,
  image,
  accessCode,
  price,
  units,
}: {
  name: string;
  image: string;
  accessCode: string;
  price: number;
  units: number;
}) {
  const [step, setStep] = useState<Step>("gate");
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [position, setPosition] = useState(0);
  const [startPos, setStartPos] = useState(0);
  const [reserve, setReserve] = useState(600); // 10:00 reservation
  const [unitsLeft, setUnitsLeft] = useState(units);
  const inputRef = useRef<HTMLInputElement>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (code.trim().toUpperCase() === accessCode.toUpperCase()) {
      setError(false);
      setStep("joining");
    } else {
      setError(true);
      inputRef.current?.focus();
    }
  }

  // joining → queue
  useEffect(() => {
    if (step !== "joining") return;
    const p = 800 + Math.floor(Math.random() * 1400);
    const t = setTimeout(() => {
      setStartPos(p);
      setPosition(p);
      setStep("queue");
    }, 1700);
    return () => clearTimeout(t);
  }, [step]);

  // queue position drains to zero
  useEffect(() => {
    if (step !== "queue") return;
    const id = setInterval(() => {
      setPosition((prev) => {
        const next = prev - Math.max(1, Math.round(prev * 0.06));
        if (next <= 0) {
          clearInterval(id);
          setStep("granted");
          return 0;
        }
        return next;
      });
    }, 180);
    return () => clearInterval(id);
  }, [step]);

  // reservation timer + faux live inventory
  useEffect(() => {
    if (step !== "granted") return;
    const id = setInterval(() => {
      setReserve((r) => Math.max(0, r - 1));
      setUnitsLeft((u) => (Math.random() > 0.7 ? Math.max(1, u - 1) : u));
    }, 1000);
    return () => clearInterval(id);
  }, [step]);

  const progress =
    startPos > 0 ? Math.min(100, ((startPos - position) / startPos) * 100) : 0;
  const mm = String(Math.floor(reserve / 60)).padStart(2, "0");
  const ss = String(reserve % 60).padStart(2, "0");

  return (
    <div className="crosshairs relative overflow-hidden rounded-[var(--radius-lg)] border border-line bg-coal">
      {/* ambient image */}
      <div className="absolute inset-0 opacity-25">
        <Image src={image} alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-coal via-coal/70 to-coal/40" />
      </div>

      <div className="relative flex min-h-[460px] flex-col items-center justify-center p-8 text-center sm:p-14">
        <AnimatePresence mode="wait">
          {/* ---------------- GATE ---------------- */}
          {step === "gate" && (
            <motion.div
              key="gate"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="w-full max-w-md"
            >
              <Spark size={22} className="mx-auto mb-6 text-ash" />
              <p className="eyebrow mb-4">Protected Drop</p>
              <h3 className="text-h3 font-display font-light">
                Enter your access code
              </h3>
              <p className="mx-auto mt-3 max-w-xs text-sm text-ash">
                Members received their code by email. Try{" "}
                <button
                  type="button"
                  onClick={() => setCode(accessCode)}
                  className="text-bone underline underline-offset-4"
                >
                  {accessCode}
                </button>{" "}
                to preview the experience.
              </p>

              <motion.form
                onSubmit={submit}
                animate={error ? { x: [0, -10, 10, -6, 6, 0] } : {}}
                transition={{ duration: 0.4 }}
                className="mt-8"
              >
                <input
                  ref={inputRef}
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    setError(false);
                  }}
                  placeholder="ACCESS CODE"
                  aria-label="Access code"
                  className={cn(
                    "w-full rounded-[var(--radius-pill)] border bg-void/60 px-6 py-4 text-center font-mono text-sm uppercase tracking-[0.3em] text-bone placeholder:text-ash focus:outline-none",
                    error ? "border-bone" : "border-line-strong focus:border-bone",
                  )}
                />
                {error && (
                  <p className="mt-3 text-xs uppercase tracking-[0.2em] text-bone">
                    Invalid code — access denied
                  </p>
                )}
                <div className="mt-6 flex flex-col items-center gap-4">
                  <Button magnetic={false} className="w-full justify-center">
                    Unlock the drop
                  </Button>
                  <button
                    type="button"
                    className="text-xs uppercase tracking-[0.2em] text-ash transition-colors hover:text-bone"
                  >
                    Join the waitlist →
                  </button>
                </div>
              </motion.form>
            </motion.div>
          )}

          {/* ---------------- JOINING ---------------- */}
          {step === "joining" && (
            <motion.div
              key="joining"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center"
            >
              <motion.div
                className="mb-6 h-10 w-10 rounded-full border border-line-strong border-t-bone"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
              />
              <p className="eyebrow">Securing your place…</p>
            </motion.div>
          )}

          {/* ---------------- QUEUE ---------------- */}
          {step === "queue" && (
            <motion.div
              key="queue"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="w-full max-w-md"
            >
              <p className="eyebrow mb-6">● You are in the queue</p>
              <p className="text-sm text-ash">People ahead of you</p>
              <div className="my-2 font-display text-[clamp(3.5rem,12vw,7rem)] font-light tabular-nums leading-none">
                {position.toLocaleString()}
              </div>

              <div className="mt-6 h-px w-full overflow-hidden bg-line">
                <motion.div
                  className="h-full bg-bone"
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear", duration: 0.18 }}
                />
              </div>
              <div className="mt-4 flex justify-between font-mono text-xs text-ash">
                <span>Live position</span>
                <span>{Math.round(progress)}% — hold tight</span>
              </div>
              <p className="mt-8 text-xs text-ash">
                Do not refresh. Your place is held automatically.
              </p>
            </motion.div>
          )}

          {/* ---------------- GRANTED ---------------- */}
          {step === "granted" && (
            <motion.div
              key="granted"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="w-full max-w-md"
            >
              <motion.div
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.6, ease: EASE }}
              >
                <Spark size={28} className="mx-auto mb-5 text-bone" />
              </motion.div>
              <p className="eyebrow mb-3">Access granted</p>
              <h3 className="text-h3 font-display font-light">You&apos;re in.</h3>
              <p className="mt-3 text-sm text-ash">
                {name} is reserved for you.
              </p>

              <div className="mt-8 flex items-center justify-center gap-8">
                <div className="text-center">
                  <div className="font-display text-h3 font-light tabular-nums">
                    {mm}:{ss}
                  </div>
                  <span className="eyebrow text-[0.55rem]">Reserved for</span>
                </div>
                <div className="h-10 w-px bg-line" />
                <div className="text-center">
                  <div className="font-display text-h3 font-light tabular-nums">
                    {unitsLeft}
                  </div>
                  <span className="eyebrow text-[0.55rem]">Units left</span>
                </div>
              </div>

              <div className="mt-8">
                <Button
                  href="/shop/faith-wool-overcoat"
                  magnetic={false}
                  className="w-full justify-center"
                >
                  Secure it — {formatPrice(price)}
                </Button>
              </div>
              {reserve === 0 && (
                <p className="mt-4 text-xs uppercase tracking-[0.2em] text-ash">
                  Reservation expired — rejoin the queue
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
