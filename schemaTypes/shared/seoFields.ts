import { defineField } from "sanity";

export const seoFields = [
  defineField({
    name: "seoTitle",
    title: "Titolo SEO",
    type: "string",
    description: "Opzionale. Se vuoto, il sito usa il titolo della pagina con Bologna e Club Sub Nettuno. Inserisci qui il titolo completo, incluso il brand.",
    validation: (rule) => rule.max(65).warning("Un titolo lungo potrebbe essere tagliato nei risultati di ricerca."),
  }),
  defineField({
    name: "seoDescription",
    title: "Descrizione SEO",
    type: "text",
    rows: 3,
    description: "Opzionale. Se vuota, il sito ricava un estratto dal primo paragrafo della pagina. Per la home mantiene la descrizione generale del sito.",
    validation: (rule) => rule.max(160).warning("Una descrizione lunga potrebbe essere tagliata nei risultati di ricerca."),
  }),
];
