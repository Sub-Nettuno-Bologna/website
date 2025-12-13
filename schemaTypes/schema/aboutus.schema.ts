import { defineType } from "sanity";

export default defineType({
    name: 'aboutus',
    title: 'Chi Siamo',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Titolo',
            type: 'string',
        },
        {
            name: 'subtitle',
            title: 'Sottotitolo',
            type: 'text',
        },
        {
            name: 'image',
            title: 'Immagine laterale',
            type: 'image',
        },
        {
            name: 'imageCaption',
            title: 'Didascalia Immagine Laterale',
            type: 'string',
        },
        {
            name: 'features',
            title: 'Caratteristiche',
            type: 'array',
            of: [{ type: 'list' }],
        },
        {
            name: 'cardSections',
            title: 'Sezioni aggiuntive',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'title', title: 'Titolo', type: 'string' },
                        { name: 'description', title: 'Descrizione', type: 'text' },
                        { name: 'icon', title: 'Icona', type: 'lucide-icon' },
                        {
                            name: 'cta',
                            title: 'Pulsante',
                            description: '(opzionale) Pulsante che porta a una pagina',
                            type: 'object',
                            fields: [
                                { name: 'href', title: 'URL', type: 'string' },
                                { name: 'text', title: 'Testo', type: 'string' },
                            ],
                            options: { collapsible: true },
                        },
                    ],
                },
            ],
        },
    ],
});