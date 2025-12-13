import { defineType } from "sanity";

export default defineType({
    name: 'gallery',
    title: 'Gallery',
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
            name: 'buttonText',
            title: 'Testo Pulsante',
            type: 'string',
        },
        {
            name: 'images',
            title: 'Immagini',
            type: 'array',
            of: [
                {
                    type: 'image',
                    options: {
                        hotspot: true,
                    },

                },
            ],
            options: {
                layout: 'grid',
            },
        },
    ],
});