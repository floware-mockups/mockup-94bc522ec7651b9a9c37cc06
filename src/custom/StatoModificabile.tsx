// @ts-nocheck
import { customTicker, customTimers } from "../customGuard.ts";
const __mk = customTicker("StatoModificabile");
const { setTimeout, setInterval, clearTimeout, clearInterval } = customTimers("StatoModificabile");
import { Select, useTable, type CellProps } from "../floware";

export default function StatoModificabile({ pageId, rowIndex, value }: CellProps) {__mk();
  const table = useTable(pageId);
  if (!table || table.column("Stato") < 0) return <span>{value}</span>;
  const stati = Array.from(new Set(table.rows.map(r => (__mk(), table.value(r, "Stato"))).filter(s => (__mk(), s !== ""))));
  if (value && !stati.includes(value)) stati.push(value);
  return <div className="min-w-40"><Select label="Stato" value={value} options={stati} onChange={stato => {__mk(); if (stati.includes(stato)) table.setCell(rowIndex, "Stato", stato); }} /></div>;
}
