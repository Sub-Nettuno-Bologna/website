import { defineType } from "sanity";

export default defineType({
  fields: [
    {
      name: "name",
      title: "Nome",
      type: "string",
    },
    {
      name: "instructor_grade",
      title: "Istruttore di",
      type: "array",
      of: [
        {
          type: "string",
          options: {
            list: [
              { title: "Istruttore 1° grado ARA (M1)", value: "M1" },
              { title: "Istruttore 2° grado ARA (M2)", value: "M2" },
              { title: "Istruttore 3° grado ARA (M3)", value: "M3" },
              { title: "Istruttore 1° grado Apnea (MApP1)", value: "MApP1" },
              { title: "Istruttore 2° grado Apnea (MApP2)", value: "MApP2" },
              { title: "Istruttore 3° grado Apnea (MApP3)", value: "MApP3" },
              { title: "Aiuto Istruttore ARA (PAiAr)", value: "PAiAr" },
              { title: "Aiuto Istruttore Apnea (PAiAp)", value: "PAiAp" },
              { title: "Istruttore Biologia marina", value: "BM" },
              { title: "Istruttore Mini sub", value: "MINISUB" },
              { title: "Istruttore muta stagna", value: "MUTA" },
              { title: "Istruttore Fotografia subacquea", value: "FOTOSUB" },
            ],
          },
        },
      ],
      options: {
        layout: "grid",
      },
    },
    {
      name: "description",
      title: "Descrizione",
      type: "portableText",
    },
    {
      name: "image",
      title: "Foto",
      type: "image",
      validation: (Rule) => Rule.optional(),
    },
    {
      initialValue: true,
      name: "active",
      title: "Attivo?",
      type: "boolean",
    },
    {
      hidden: ({ document }) => !document?.active,
      initialValue: false,
      name: "council",
      title: "Membro del consiglio?",
      type: "boolean",
    },
    {
      hidden: ({ document }) => !document?.active || !document?.council,
      name: "council_seat",
      options: {
        layout: "dropdown",
        list: [
          "Presidente",
          "Vicepresidente",
          "Consigliere",
          "Segretario",
          "Tesoriere",
        ],
      },
      title: "Posto nel consiglio",
      type: "string",
    },
  ],
  name: "team",
  preview: {
    select: {
      media: "image",
      title: "name",
    },
  },
  title: "Team",
  type: "document",
});
