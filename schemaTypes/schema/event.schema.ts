import { defineType } from 'sanity';

export default defineType({
    name: 'event',
    title: 'Evento',
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
            description: 'Breve descrizione dell\'evento che apparirà nella lista'
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
            name: 'eventDate',
            title: 'Data evento',
            type: 'datetime',
            validation: (Rule: any) => Rule.required(),
            description: 'Data e ora dell\'evento'
        },
        {
            name: 'location',
            title: 'Luogo',
            type: 'string',
            description: 'Dove si svolge l\'evento'
        },
        {
            name: 'maxParticipants',
            title: 'Numero massimo partecipanti',
            type: 'number',
            description: 'Limite di partecipanti (opzionale)'
        },
        {
            name: 'registrationRequired',
            title: 'Iscrizione richiesta',
            type: 'boolean',
            description: 'Se l\'evento richiede iscrizione'
        },
        {
            name: 'registrationDeadline',
            title: 'Scadenza iscrizioni',
            type: 'datetime',
            description: 'Data limite per le iscrizioni'
        },
        {
            name: 'price',
            title: 'Prezzo',
            type: 'number',
            description: 'Costo dell\'evento (0 per eventi gratuiti)'
        },
        {
            name: 'featured',
            title: 'In evidenza',
            type: 'boolean',
            description: 'Se selezionato, l\'evento apparirà in evidenza nella homepage'
        }
    ],
    preview: {
        select: {
            title: 'title',
            eventDate: 'eventDate',
            media: 'featuredImage'
        },
        prepare(selection: any) {
            const { title, eventDate, media } = selection;
            const eventDateFormatted = eventDate ? new Date(eventDate).toLocaleDateString('it-IT') : 'Data non specificata';
            return {
                title: title,
                subtitle: `Evento - ${eventDateFormatted}`,
                media: media
            };
        }
    },
    orderings: [
        {
            title: 'Data evento più recente',
            name: 'eventDateDesc',
            by: [
                { field: 'eventDate', direction: 'desc' }
            ]
        },
        {
            title: 'Data evento più vecchio',
            name: 'eventDateAsc',
            by: [
                { field: 'eventDate', direction: 'asc' }
            ]
        },
    ]
});
