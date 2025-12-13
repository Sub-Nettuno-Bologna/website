import { defineType } from 'sanity';

export default defineType({
    name: 'blog',
    title: 'Post Blog',
    type: 'document',
    fields: [
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
            name: 'excerpt',
            title: 'Estratto',
            type: 'text',
            rows: 3,
            description: 'Breve descrizione del post che apparirà come anteprima nella lista'
        },
        {
            name: 'featuredImage',
            title: 'Immagine in evidenza',
            type: 'image',
            options: {
                hotspot: true,
            },

        },
        {
            name: 'content',
            title: 'Contenuto',
            type: 'portableText',
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [
                {
                    type: 'string',
                    options: {
                        list: [
                            { title: 'Corsi', value: 'corsi' },
                            { title: 'Uscite', value: 'uscite' },
                            { title: 'News', value: 'news' },
                            { title: 'Promozioni', value: 'promozioni' },
                            { title: 'Altro', value: 'altro' },
                        ],
                    },
                },
            ],
            options: {
                layout: 'grid',
            },
        },
        {
            name: 'publishedAt',
            title: 'Data',
            type: 'datetime',
            initialValue: new Date().toISOString(),
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'featured',
            title: 'In evidenza',
            type: 'boolean',
            description: 'Se selezionato, il post apparirà in evidenza nella homepage'
        }
    ],
    preview: {
        select: {
            title: 'title',
            media: 'featuredImage'
        },
        prepare(selection: any) {
            const { title, media } = selection;
            return {
                title: title,
                subtitle: `Blog`,
                media: media
            };
        }
    },
    orderings: [
        {
            title: 'Data più recente',
            name: 'publishedAtDesc',
            by: [
                { field: 'publishedAt', direction: 'desc' }
            ]
        },
        {
            title: 'Data più vecchio',
            name: 'publishedAtAsc',
            by: [
                { field: 'publishedAt', direction: 'asc' }
            ]
        }
    ]
});
