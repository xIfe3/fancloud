"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "./actions";

const initial: LoginState = {};

export function LoginForm({ from }: { from: string }) {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    loginAction,
    initial,
  );

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="from" value={from} />
      <div>
        <label
          htmlFor="password"
          className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          className="w-full border border-border bg-card px-3.5 py-3 text-sm font-medium outline-none transition placeholder:text-muted focus:border-brand"
        />
      </div>

      {state.error && (
        <p className="border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-sm font-medium text-red-300">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="btn btn-primary btn-md w-full"
      >
        {pending ? "Signing in…" : "Sign in →"}
      </button>
    </form>
  );
}
