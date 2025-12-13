import { defineType } from 'sanity';
import { orderRankField } from '@sanity/orderable-document-list';

export default defineType({
    name: 'course-category',
    title: 'Categoria Corsi',
    type: 'document',
    fields: [
        orderRankField({ type: 'course-category' }),
        {
            name: 'title',
            title: 'Titolo',
            type: 'string',
            validation: (Rule: any) => Rule.required().max(100)
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'description',
            title: 'Descrizione',
            type: 'text',
            rows: 3,
            description: 'Breve descrizione della categoria che apparirà come anteprima nella lista'
        },
        {
            name: 'image',
            title: 'Immagine della categoria',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    title: 'Testo immagine della categoria',
                    type: 'string',
                    description: 'Importante per SEO e accessibilità'
                }
            ]
        },
        {
            name: 'courses',
            title: 'Corsi',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'course' }] }]
        }
    ],
    orderings: [
        {
            title: 'Ordine manuale',
            name: 'orderRankAsc',
            by: [{ field: 'orderRank', direction: 'asc' }]
        }
    ],
    preview: {
        select: {
            title: 'title',
            media: 'image'
        },
        prepare(selection: any) {
            const { title, media } = selection;
            return {
                title: title,
                subtitle: `Categoria Corsi`,
                media: media
            };
        }
    },

});
