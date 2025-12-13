import { defineType } from 'sanity';

export default defineType({
    name: 'newsletter',
    title: 'Newsletter',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Titolo',
            type: 'string',
        },
        {
            name: 'description',
            title: 'Descrizione',
            type: 'text',
        },
        {
            name: 'form',
            title: 'Form',
            type: 'object',
            fields: [
                {
                    name: 'placeholder',
                    title: 'Placeholder',
                    type: 'string',
                },
                {
                    name: 'buttonText',
                    title: 'Testo Pulsante',
                    type: 'string',
                },
            ],
        },
    ],
}); 