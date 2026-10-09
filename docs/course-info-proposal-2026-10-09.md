# Riepilogo dei corsi — applicato

Il gruppo SEO è committato in `064172d`. La struttura con periodo abituale,
frequenza concordata e contributo è approvata e implementata.
I testi sono approvati e pubblicati nei 13 documenti Sanity.
Anteprima del 1° grado ARA: `/anteprima-corso` sul server dev.
La pagina di anteprima restituisce 404 in produzione ed è esclusa dalla sitemap.
L'anteprima legge ora i dati reali da Sanity.

## Modello proposto

Campi opzionali del documento corso:

- `coursePeriod`: periodo abituale del percorso, senza una singola data.
- `enrollmentNote`: ingresso durante il percorso e recupero delle lezioni.
- `contributionNote`: spiegazione del contributo e dei fattori che lo determinano.

Il campo `duration` esistente resta disponibile per durate effettive, lezioni o
ore confermate. Un periodo annuale non va interpretato come obbligo di frequenza
per tutto l'anno. Nessun importo unico o range desunto dall'audit.

## Testi approvati

| Percorso | Periodo abituale |
| --- | --- |
| 1° grado ARA e MiniSub | Da settembre a dicembre oppure da gennaio a maggio. |
| 2° e 3° grado ARA | Da settembre a maggio. |
| Apnea | Da settembre a maggio. |
| Specialità | Da pochi giorni a tre mesi, in base alla specialità. |

Frequenza e inserimento, sia ARA sia apnea:

> Frequenza concordata in base alle tue esigenze, con possibilità di iniziare a corso avviato e recuperare le lezioni.

Contributo, ARA, apnea e MiniSub:

> Il contributo varia in base alla piscina e alla frequenza concordata. Contattaci per conoscere l'importo e cosa comprende.

Frequenza, specialità:

> Frequenza e calendario concordati con gli istruttori in base alle tue esigenze.

Contributo, specialità:

> Il contributo varia in base alla specialità e al percorso concordato. Contattaci per conoscere l'importo e cosa comprende.

La destinazione del contributo va confermata: non viene dichiarato che copra
soltanto la piscina senza verificare eventuali altre voci. I testi non definiscono
il trattamento fiscale delle somme e non sostituiscono le indicazioni del
responsabile amministrativo dell'associazione.

## Applicazione

Campi locali e tipi generati aggiornati. Schema distribuito via CLI dal progetto
Studio locale (workspace effettivo `SubNettuno`, schema `_.schemas.SubNettuno`).
I 13 documenti sono stati aggiornati via MCP e pubblicati dopo confronto delle
bozze con gli originali: modificati soltanto i tre campi del riepilogo.
Lo Studio ospitato è stato poi aggiornato con `sanity deploy` per riconoscere i
nuovi campi. Il workspace è ora normalizzato a `subnettuno`; verificati i tre
campi nello schema distribuito su `https://subnettuno-admin.sanity.studio/`.

Le descrizioni dei corsi ARA che citano febbraio–maggio e le durate apnea in ore
richiedono una verifica di coerenza con il nuovo riepilogo, da approvare prima
di ulteriori modifiche editoriali.
