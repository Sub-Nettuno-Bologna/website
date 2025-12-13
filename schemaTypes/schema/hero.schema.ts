import { defineType } from "sanity";

export default defineType({
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
            name: 'images',
            of: [
                {
                    name: 'image',
                    options: {
                        hotspot: true,
                    },
                    title: 'Image',
                    type: 'image',
                },
            ],
            options: {
                layout: 'grid',
            },
            title: 'Immagini',
            description: 'Immagini da mostrare nella sezione hero della homepage',
            type: 'array',
        },
        {
            name: 'buttons',
            title: 'Pulsanti',
            type: 'array',
            of: [{ type: 'button' }],
        },
    ],
    name: 'hero',
    title: 'Hero',
    type: 'document',
});