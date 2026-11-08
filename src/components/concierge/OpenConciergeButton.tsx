"use client";

import type { ReactNode } from "react";
import { Button, type ButtonProps } from "@/components/atoms/Button";
import { useConciergeStore } from "@/store/concierge-store";
import type { ConciergeIntent } from "@/types/concierge";

type Props = Omit<Extract<ButtonProps, { href?: undefined }>, "onClick" | "children"> & {
  children: ReactNode;
  intent?: ConciergeIntent;
  productId?: string;
};

/** A Button that opens the concierge, optionally with an intent or product in context. */
export function OpenConciergeButton({ intent, productId, children, ...rest }: Props) {
  const open = useConciergeStore((s) => s.open);
  return (
    <Button {...rest} onClick={() => open({ intent, productId })}>
      {children}
    </Button>
  );
}
