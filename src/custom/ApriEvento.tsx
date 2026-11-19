// @ts-nocheck
import { customTicker, customTimers } from "../customGuard.ts";
const __mk = customTicker("ApriEvento");
const { setTimeout, setInterval, clearTimeout, clearInterval } = customTimers("ApriEvento");
import { Button, usePrototype, type CellProps } from "../floware";

export default function ApriEvento({ pageId, rowIndex, value }: CellProps) {__mk();
  const { openDetail } = usePrototype();
  return <Button variant="link" onClick={() => (__mk(), openDetail(pageId, rowIndex))}>{value || "Apri evento"}</Button>;
}
