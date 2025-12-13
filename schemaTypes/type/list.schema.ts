import { defineType } from 'sanity';

export const list = defineType({
    name: 'list',
    title: 'Lista',
    type: 'object',
    fields: [
        {
            name: 'title',
            title: 'Titolo',
            type: 'string',
            validation: (Rule) => Rule.required()
        },
        {
            name: 'description',
            title: 'Descrizione',
            type: 'text'
        },
        {
            name: 'icon',
            title: 'Icona',
            type: 'lucide-icon'
        }
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'description',
            icon: 'icon'
        },
        prepare({ title, subtitle }) {
            return {
                title: title || 'Elemento lista',
                subtitle
            };
        }
    }
});
