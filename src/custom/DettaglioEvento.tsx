// @ts-nocheck
import { customTicker, customTimers } from "../customGuard.ts";
const __mk = customTicker("DettaglioEvento");
const { setTimeout, setInterval, clearTimeout, clearInterval } = customTimers("DettaglioEvento");
import { Button, Drawer, Field, Badge, useTable, type DetailProps } from "../floware";

export default function DettaglioEvento({ pageId, rowIndex, close }: DetailProps) {__mk();
  const table = useTable(pageId);
  const row = table?.rows[rowIndex];
  const campi = ["Evento", "Tipo", "Luogo", "Data", "Referente", "Stato"];
  return <Drawer title="Dettaglio evento" side="right" onClose={close} footer={<Button variant="secondary" onClick={close}>Chiudi</Button>}>
    {!table || !row ? <p>Evento non disponibile.</p> : <div className="space-y-4 text-(--mk-text)">
      {campi.map(campo => {__mk();
        const indice = table.column(campo);
        const valore = indice < 0 ? "Campo non disponibile" : table.value(row, campo) || "Non indicato";
        return <Field key={campo} label={campo}>{campo === "Stato" ? <Badge tone="primary">{valore}</Badge> : <span className="break-words">{valore}</span>}</Field>;
      })}
    </div>}
  </Drawer>;
}
