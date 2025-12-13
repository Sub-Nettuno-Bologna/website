import { defineType } from 'sanity';

export default defineType({
    name: 'course',
    title: 'Corsi',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Titolo',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            description: "Per costruire l'indirizzo della pagina",
            options: {
                source: 'title',
                maxLength: 96,
                slugify: (input) =>
                    input
                        .toLowerCase()
                        .replace(/[\s-°:]+/g, '-')
                        .slice(0, 200),
            },
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'subtitle',
            title: 'Sottotitolo',
            type: 'portableText',
            description: 'Sottotitolo visibile come anteprima del corso e nella pagina del dettaglio del corso',
        },
        {
            name: 'description',
            title: 'Descrizione dettagliata del corso',
            type: 'portableText',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'image',
            title: 'Immagine',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'duration',
            title: 'Durata corso',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'level',
            title: 'Livello corso',
            type: 'string',
            options: {
                list: [
                    { title: 'Bambini', value: 'Bambini' },
                    { title: 'Principiante', value: '⭐ Principiante' },
                    { title: 'Intermedio', value: '⭐⭐ Intermedio' },
                    { title: 'Avanzato', value: '⭐⭐⭐ Avanzato' },
                    { title: 'Tutti i livelli', value: 'Tutti i livelli' },
                ],
            },
            validation: (Rule) => Rule.required(),
        },

        {
            name: 'certification',
            title: 'Certificazione rilasciata',
            type: 'string',
            description: 'Es: P1 / CMAS 1 Star Diver',
        },
        {
            name: 'maxDepth',
            title: 'Profondità Massima (solo per corsi di subacquea)',
            description: 'Es: "18m", "30m"',
            type: 'string',
            options: {
                list: [
                    { title: '18m', value: '18m' },
                    { title: '30m', value: '30m' },
                    { title: '40m', value: '40m' },
                ],
            },
        },
        {
            name: 'prerequisites',
            title: 'Prerequisiti',
            type: 'array',
            of: [{
                type: 'string',
                validation: (Rule) => Rule.max(100).error('Ogni prerequisito non può superare i 100 caratteri')
            }],
            description: 'Lista dei prerequisiti per il corso (max 100 caratteri per elemento)',
        },
        {
            name: 'whatYouWillLearn',
            title: 'Cosa Imparerai',
            type: 'array',
            of: [{
                type: 'string',
                validation: (Rule) => Rule.max(100).error('Ogni prerequisito non può superare i 100 caratteri')
            }],
            description: 'Obiettivi di apprendimento del corso',
        },
        {
            name: 'capabilities',
            title: 'Capacità esame finale',
            type: 'array',
            of: [{
                type: 'string',
                validation: (Rule) => Rule.max(100).error('Ogni prerequisito non può superare i 100 caratteri')
            }],
            description: 'Capacità raggiunte nell\'esame finale (solo per corsi di apnea)',
        },
        {
            name: 'structure',
            title: 'Struttura del Corso',
            type: 'array',
            of: [{ type: 'list' }],
            description: 'Elenco flessibile degli elementi della struttura (titolo, descrizione, icona)'
        },
        {
            name: 'kit',
            title: 'Kit Incluso',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Cosa è incluso nel prezzo del corso',
        },
        {
            name: 'nextCourses',
            title: 'Corsi Consigliati',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'course' }] }],
            description: 'Corsi consigliati dopo il completamento di questo corso',
        },
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'subtitle',
            media: 'image',
            level: 'level',
            certification: 'certification',
        },
        prepare({ title = 'No title', subtitle, media, level, certification }) {
            const displaySubtitle = certification || subtitle || level || '';
            return {
                title,
                subtitle: displaySubtitle,
                media,
            };
        },
    },
});