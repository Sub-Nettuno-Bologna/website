export const button = {
    name: 'button',
    title: 'Pulsante',
    type: 'object',
    fields: [
        {
            name: 'text',
            title: 'Testo',
            type: 'string',
        },
        {
            name: 'href',
            title: 'URL',
            type: 'url',
            validation: (Rule: any) => Rule.uri({
                allowRelative: true,
                scheme: ['http', 'https', 'mailto', 'tel'],
            }),
        },
        {
            name: 'variant',
            title: 'Stile Pulsante',
            type: 'string',
            options: {
                list: ['default', 'secondary', 'outline', 'ghost', 'link', 'white'],
            },
        },
    ],
}