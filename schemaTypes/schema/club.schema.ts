import { defineType } from 'sanity';

export default defineType({
    fields: [
        {
            name: 'clubName',
            title: 'Nome del Club',
            type: 'string',
        },
        {
            name: 'subtitle',
            title: 'Sottotitolo',
            type: 'string',
        },
        {
            name: 'description',
            title: 'Descrizione',
            type: 'text',
        },
        {
            name: 'logo',
            title: 'Logo del club',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'cf',
            title: 'Codice fiscale',
            type: 'string',
        },
        {
            name: 'piva',
            title: 'Partita IVA',
            type: 'string',
        },
        {
            name: 'address',
            title: 'Indirizzo',
            type: 'string',
        },
        {
            name: 'addressLink',
            title: 'Link google maps',
            type: 'string',
        },
        {
            name: 'phone',
            title: 'Telefono',
            type: 'string',
        },
        {
            name: 'phoneSchedule',
            title: 'Orario disponibilità telefono',
            type: 'string',
        },
        {
            name: 'openingHours',
            title: 'Orari segretaria',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'dayOfWeek',
                            title: 'Giorni della Settimana',
                            type: 'array',
                            of: [{ type: 'string' }],
                            options: {
                                list: [
                                    { title: 'Lunedì', value: 'Monday' },
                                    { title: 'Martedì', value: 'Tuesday' },
                                    { title: 'Mercoledì', value: 'Wednesday' },
                                    { title: 'Giovedì', value: 'Thursday' },
                                    { title: 'Venerdì', value: 'Friday' },
                                    { title: 'Sabato', value: 'Saturday' },
                                    { title: 'Domenica', value: 'Sunday' },
                                ],
                            },
                        },
                        {
                            name: 'opens',
                            title: 'Apertura',
                            type: 'string',
                            description: 'Formato: HH:MM (es: 19:00)',
                        },
                        {
                            name: 'closes',
                            title: 'Chiusura',
                            type: 'string',
                            description: 'Formato: HH:MM (es: 22:00)',
                        },
                    ],
                },
            ],
        },
        {
            name: 'whatsapp',
            title: 'Whatsapp',
            type: 'array',
            of: [{ type: 'string' }],
        },
        {
            name: 'email',
            title: 'Email',
            type: 'string',
        },
        {
            name: 'instagram',
            title: 'Instagram',
            type: 'string',
        },
        {
            name: 'facebook',
            title: 'Facebook',
            type: 'string',
        },
        {
            name: 'other',
            title: 'Altri contatti',
            type: 'portableText',
        }
    ],
    name: 'club',
    title: 'Club',
    type: 'document',
});