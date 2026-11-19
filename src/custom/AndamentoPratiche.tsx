// @ts-nocheck
import { customTicker, customTimers } from "../customGuard.ts";
const __mk = customTicker("AndamentoPratiche");
const { setTimeout, setInterval, clearTimeout, clearInterval } = customTimers("AndamentoPratiche");
import { Card, Badge, useTable } from "../floware";

function dataOrdinabile(testo: string) {__mk();
  const parti = testo.trim().split("/");
  const iso = testo.trim().split("-");
  const giorno = Number(parti.length === 3 ? parti[0] : iso[2]);
  const mese = Number(parti.length === 3 ? parti[1] : iso[1]);
  const anno = Number(parti.length === 3 ? parti[2] : iso[0]);
  if (!anno || !mese || !giorno || anno < 1000 || anno > 9999) return "";
  const data = new Date(anno, mese - 1, giorno);
  if (data.getFullYear() !== anno || data.getMonth() !== mese - 1 || data.getDate() !== giorno) return "";
  return String(anno) + "-" + String(mese).padStart(2, "0") + "-" + String(giorno).padStart(2, "0");
}

export default function AndamentoPratiche() {__mk();
  const table = useTable("elenco");
  if (!table || table.column("Data") < 0 || table.column("Stato") < 0) return <Card title="Andamento delle pratiche"><p>Servono le colonne Data e Stato nella pagina Elenco.</p></Card>;
  const pratiche = table.rows.map(r => ((__mk(), { data: dataOrdinabile(table.value(r, "Data")), stato: table.value(r, "Stato") || "Senza stato" }))).filter(r => (__mk(), r.data !== ""));
  const date = Array.from(new Set(pratiche.map(r => (__mk(), r.data)))).sort();
  const stati = Array.from(new Set(pratiche.map(r => (__mk(), r.stato))));
  const serie = date.map(data => ((__mk(), { data, totale: pratiche.filter(r => (__mk(), r.data === data)).length })));
  const massimo = serie.reduce((n, r) => (__mk(), Math.max(n, r.totale)), 1);
  const etichetta = (data: string) => (__mk(), data.split("-").reverse().join("/"));
  const tempo = (data: string) => (__mk(), new Date(Number(data.split("-")[0]), Number(data.split("-")[1]) - 1, Number(data.split("-")[2])).getTime());
  const inizio = date.length ? tempo(date[0]) : 0;
  const fine = date.length ? tempo(date[date.length - 1]) : 0;
  const x = (data: string) => (__mk(), fine === inizio ? 300 : 30 + (tempo(data) - inizio) / (fine - inizio) * 540);
  return <div className="space-y-4 text-(--mk-text)">
    <Card title="Andamento delle pratiche">
      <p className="text-sm text-(--mk-muted)">Fonte: Elenco. Conteggi per Data e stato attuale, non cronologia dei cambi di stato. Modifiche conservate solo in memoria.</p>
      <div className="flex flex-wrap gap-3 my-3"><Badge tone="primary">{pratiche.length} pratiche con data valida</Badge><Badge tone="neutral">{table.rows.length - pratiche.length} senza data valida</Badge></div>
      {!date.length ? <p>Nessuna data valida da rappresentare.</p> : <>
        <h3 className="font-semibold">Volume nel tempo</h3>
        <svg viewBox="0 0 600 170" className="w-full" role="img" aria-label="Numero di pratiche per data">
          <title>Pratiche per data; scala verticale da zero a {massimo}</title>
          <line x1="20" y1="140" x2="580" y2="140" stroke="var(--mk-border)" />
          {serie.map(r => (__mk(), <g key={r.data}><title>{etichetta(r.data)}: {r.totale} pratiche</title><line x1={x(r.data)} y1="140" x2={x(r.data)} y2={140 - r.totale / massimo * 110} stroke="var(--mk-primary)" strokeWidth="8" /><text x={x(r.data)} y={132 - r.totale / massimo * 110} textAnchor="middle" fontSize="12" fill="var(--mk-text)">{r.totale}</text></g>))}
        </svg>
        <div className="flex justify-between text-xs text-(--mk-muted)"><span>{etichetta(date[0])}</span><span>{etichetta(date[date.length - 1])}</span></div>
      </>}
    </Card>
    {date.length > 0 && <Card title="Andamento distinto per stato">
      <p className="text-sm text-(--mk-muted)">Stesso intervallo temporale e stessa scala verticale per tutti i grafici: da 0 a {massimo} pratiche.</p>
      <div className="grid gap-4 md:grid-cols-2 mt-4">{stati.map(stato => {__mk();
        const valori = date.map(data => ((__mk(), { data, n: pratiche.filter(r => (__mk(), r.data === data && r.stato === stato)).length })));
        const punti = valori.map(r => (__mk(), String(x(r.data)) + "," + String(100 - r.n / massimo * 75))).join(" ");
        return <div key={stato} className="rounded-lg border border-(--mk-border) p-3"><h3 className="font-semibold">{stato} · {pratiche.filter(r => (__mk(), r.stato === stato)).length}</h3><svg viewBox="0 0 600 120" className="w-full" role="img" aria-label={"Andamento: " + stato}><title>{stato}</title><line x1="20" y1="100" x2="580" y2="100" stroke="var(--mk-border)" /><polyline points={punti} fill="none" stroke="var(--mk-primary)" strokeWidth="3" />{valori.map(r => (__mk(), <circle key={r.data} cx={x(r.data)} cy={100 - r.n / massimo * 75} r="4" fill="var(--mk-primary)"><title>{etichetta(r.data)}: {r.n}</title></circle>))}</svg><p className="text-xs text-(--mk-muted)">{valori.map(r => (__mk(), etichetta(r.data) + ": " + r.n)).join(" · ")}</p></div>;
      })}</div>
    </Card>}
  </div>;
}
