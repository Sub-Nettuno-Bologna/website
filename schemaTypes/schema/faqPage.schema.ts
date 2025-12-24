import { defineType } from "sanity";

export default defineType({
  name: "faqPage",
  title: "Pagina FAQ",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Titolo",
      type: "string",
      validation: (Rule: any) => Rule.required(),
      initialValue: "Domande Frequenti",
    },
    {
      name: "description",
      title: "Descrizione",
      type: "text",
      description:
        "Breve descrizione della pagina (usata per meta description SEO)",
      rows: 3,
    },
    {
      name: "faqs",
      title: "Domande Frequenti",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "question",
              title: "Domanda",
              type: "string",
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: "answer",
              title: "Risposta",
              type: "text",
              validation: (Rule: any) => Rule.required(),
              rows: 4,
            },
          ],
          preview: {
            select: {
              title: "question",
              subtitle: "answer",
            },
            prepare(selection: any) {
              const { title, subtitle } = selection;
              return {
                title: title || "Domanda senza titolo",
                subtitle: subtitle ? subtitle.substring(0, 60) + "..." : "",
              };
            },
          },
        },
      ],
      validation: (Rule: any) =>
        Rule.min(1).error("Aggiungi almeno una domanda"),
    },
    {
      name: "updatedAt",
      title: "Ultimo aggiornamento",
      type: "datetime",
      description: "Data dell'ultimo aggiornamento delle FAQ",
      initialValue: () => new Date().toISOString(),
    },
  ],
  preview: {
    select: {
      title: "title",
      faqCount: "faqs",
    },
    prepare(selection: any) {
      const { title, faqCount } = selection;
      const count = Array.isArray(faqCount) ? faqCount.length : 0;
      return {
        title: title || "Pagina FAQ",
        subtitle: `${count} domande`,
      };
    },
  },
});
