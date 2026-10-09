# Pagina Prova gratuita — specifica

## Obiettivo

Creare una pagina unica `/prova-gratuita` per accompagnare chi vuole provare
la subacquea o l'apnea a Bologna. La pagina raccoglie una richiesta di contatto
e lascia al club la conferma di giorno, disponibilità e percorso.

La pagina non mostra date fisse e non promette una prenotazione automatica.
Gli eventi in home restano invariati.

## Contenuti e struttura

### Hero

- H1: `Prova subacquea e apnea a Bologna`
- Testo: `La prima prova in piscina è gratuita e senza impegno. Scegli se vuoi avvicinarti alla subacquea con bombole o all’apnea: concordiamo insieme giorno e percorso.`

### Due percorsi

Card `Prova subacquea`:

> Respira sott’acqua con le bombole, impara a conoscere l’attrezzatura e prova i primi esercizi in piscina insieme a un istruttore.

Card `Prova apnea`:

> Scopri respirazione, rilassamento e primi esercizi di apnea in piscina, sempre seguito dagli istruttori.

### Come funziona

Tre passaggi:

1. Scrivici e indicaci se ti interessa la subacquea o l’apnea.
2. Concordiamo con te una data e le informazioni necessarie per la prova.
3. Vieni in piscina, provi con un istruttore e valuti insieme a noi il percorso.

### Cosa portare

- Costume e asciugamano.
- L’attrezzatura necessaria per la prova viene fornita dal club.
- Certificato medico non agonistico, se già disponibile; il club conferma prima
  della prova cosa serve nel caso specifico.

## Form

Riutilizzare `ContactSection` e `ContactForm` esistenti, senza creare un nuovo
endpoint. Passare:

- `formHiddenFields={{ campaign: "Prova gratuita" }}`;
- `formDefaultMessage="Ciao, sono interessato alla prova gratuita. Mi interessa la subacquea o l’apnea e vorrei concordare una data."`;
- `hasBreadcrumbs={false}`.

Il titolo e la descrizione del form restano quelli condivisi del contatto. Il
messaggio precompilato invita l’utente a specificare il percorso; il club
concorda poi data e disponibilità via risposta.

## Collegamenti

- Aggiornare il CTA desktop e mobile dell’header da `/contatti` a
  `/prova-gratuita`.
- Mantenere `/contatti` per richieste generiche e i contatti diretti.
- La pagina viene inclusa automaticamente nella sitemap tramite il normale
  routing Astro.

## SEO e accessibilità

- Title: `Prova gratuita sub e apnea a Bologna | Club Sub Nettuno`.
- Description: `Richiedi una prova gratuita di subacquea o apnea in piscina a Bologna. Scrivici: concordiamo insieme giorno e percorso, senza impegno.`
- Un solo H1 nella pagina.
- Sezioni con titoli gerarchici e card leggibili senza affidarsi ai soli colori.
- Form con etichette accessibili già fornite dai componenti esistenti.

## Fuori ambito

- Nessun nuovo documento o campo Sanity.
- Nessuna gestione di date o disponibilità in Sanity.
- Nessuna modifica alla sezione eventi della home.
- Nessuna conferma automatica della prenotazione.
