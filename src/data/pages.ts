export interface PagesData {
  commons: {
    learnMore: string;
    noPosts: string;
    noPostsDescription: string;
    featured: string;
    allPosts: string;
    publishedAt: string;
    backToList: string;
  };
  states: {
    empty: {
      blog: { title: string; description: string };
      eventi: { title: string; description: string };
      courses: { title: string; description: string };
    };
    loading: {
      default: string;
    };
    error: {
      title: string;
      description: string;
      retry: string;
    };
  };
  ui: {
    ages: {
      minimum: string;
    };
    courses: {
      available: string;
    };
    instructorGrades: {
      M1: string;
      M2: string;
      M3: string;
      MApP1: string;
      MApP2: string;
      MApP3: string;
      PAiAr: string;
      PAiAp: string;
      BM1: string;
      BM2: string;
      MUTA: string;
      FOTOSUB: string;
    };
    maps: {
      clubLocationTitle: string;
    };
    gallery: {
      defaultSubtitle: string;
    };
    forms: {
      errors: {
        required: string;
        invalidEmail: string;
        submitError: string;
      };
      success: {
        messageSent: string;
        subscribed: string;
      };
      loading: {
        sending: string;
        loading: string;
      };
    };
    breadcrumbs: {
      home: string;
      pageLabel: string;
      titles: {
        blog: string;
        eventi: string;
        corsi: string;
        "chi-siamo": string;
        contatti: string;
        storia: string;
        staff: string;
        certificazioni: string;
        galleria: string;
      };
    };
    pagination: {
      previous: string;
      next: string;
      pageFormat: string;
    };
  };
  courses: {
    title: string;
    description: string;
  };
  certifications: {
    title: string;
    description: string;
  };
  staff: {
    title: string;
    description: string;
    collaborators: {
      title: string;
      content: string;
    };
  };
  storia: {
    title: string;
  };
  blog: {
    title: string;
    subtitle: string;
    noPosts: string;
    noPostsDescription: string;
  };
  eventi: {
    title: string;
    subtitle: string;
    participantsLabel: string;
    labels: {
      concluded: string;
      date: string;
      location: string;
      price: string;
      registration: string;
      registrationBy: string;
      registrationRequired: string;
    };
  };
  courseDetail: {
    keyInfo: {
      prerequisites: string;
      maxDepth: string;
      certification: string;
      exam: string;
    };
    sections: {
      description: string;
      whatYouWillLearn: string;
      structure: string;
      kit: string;
      contact: string;
      nextSteps: string;
    };
    descriptions: {
      kit: string;
      contactInfo: string;
      nextSteps: string;
    };
    messageTemplate: (courseTitle: string) => string;
  };
  contact: {
    title: string;
    subtitle: {
      text: string;
      highlight: string;
      formatted: string;
    };
    form: {
      title: string;
      description: string;
      fieldsPlaceholder: {
        name: string;
        email: string;
        phone: string;
        message: string;
      };
      defaultMessage: string;
      submitButton: string;
    };
    contactLabels: {
      title: string;
      openingHoursTitle: string;
      phone: string;
      whatsapp: string;
      email: string;
      address: string;
    };
    socialMediaLabels: {
      title: string;
      description: string;
      facebook: string;
      instagram: string;
      youtube: string;
    };
  };
  newsletter: {
    title: string;
    description: string;
    form: {
      placeholder: string;
      buttonText: string;
    };
  };
}

export const pagesData: PagesData = {
  commons: {
    learnMore: "Scopri di più",
    noPosts: "Nessun articolo disponibile",
    noPostsDescription: "Torna presto per leggere i nostri ultimi articoli!",
    featured: "In evidenza",
    allPosts: "Tutti gli articoli",
    publishedAt: "Pubblicato il",
    backToList: "Torna alla lista",
  },
  states: {
    empty: {
      blog: {
        title: "Nessun articolo disponibile",
        description: "Torna presto per leggere i nostri ultimi articoli!",
      },
      eventi: {
        title: "Nessun evento in programma",
        description: "Torna a trovarci, stiamo pianificando nuove attività!",
      },
      courses: {
        title: "Nessuna categoria disponibile",
        description: "I corsi saranno disponibili a breve, resta sintonizzato!",
      },
    },
    loading: {
      default: "Caricamento...",
    },
    error: {
      title: "Si è verificato un errore",
      description: "Qualcosa è andato storto. Riprova tra qualche istante.",
      retry: "Riprova",
    },
  },
  certifications: {
    title: "Certificazione e brevetto",
    description:
      "Al termine del corso, non solo riceverai il brevetto ufficiale che ti abilita a immergerti in sicurezza, ma entrerai a far parte di una grande comunità di subacquei riconosciuta a livello internazionale. Il tuo brevetto sarà valido in tutto il mondo e ti permetterà di esplorare i fondali marini ovunque tu vada! ",
  },
  courses: {
    title: "I Nostri Corsi",
    description:
      "Scopri il nostro percorso formativo completo, dai primi passi nel mondo subacqueo fino alle specializzazioni avanzate",
  },
  staff: {
    title: "Il Nostro Team",
    description:
      "I membri del Club SubNettuno, sono tutti volontari! Quello che li accomuna è la passione per la subacquea e la voglia di condividere questa passione con gli altri.",
    collaborators: {
      title: "Collaboratori",
      content:
        "I nostri corsi non sarebbero comunque possibili senza l'aiuto di tutti i soci impegnati nel percorso formativo per diventare i futuri istruttori del Club Sub Nettuno.",
    },
  },
  storia: {
    title: "La storia della subacquea",
  },
  blog: {
    title: "Blog",
    subtitle:
      "Scopri le ultime novità, consigli e storie dal mondo della subacquea",
    noPosts: "Nessun articolo disponibile",
    noPostsDescription: "Torna presto per leggere i nostri ultimi articoli!",
  },
  eventi: {
    title: "Eventi",
    subtitle: "Partecipa ai nostri eventi, gite e attività speciali",
    participantsLabel: "Max. partecipanti:",
    labels: {
      active: "Evento attivo",
      concluded: "Evento concluso",
      date: "Data",
      location: "Luogo",
      price: "Prezzo",
      registration: "Iscrizione",
      registrationBy: "entro",
      registrationRequired: "obbligatoria",
    },
  },
  courseDetail: {
    keyInfo: {
      prerequisites: "Prerequisiti",
      maxDepth: "Profondità Massima",
      certification: "Certificazione",
      exam: "Prova finale",
    },
    sections: {
      description: "Descrizione del corso",
      whatYouWillLearn: "Cosa Imparerai",
      structure: "Struttura del corso",
      kit: "Kit didattico incluso",
      contact: "Chiedi informazioni",
      nextSteps: "Prossimi passi",
    },
    descriptions: {
      kit: "Tutto il necessario per iniziare la tua avventura subacquea.",
      contactInfo:
        "Contattaci per informazioni e iscrizioni, ti offriremo la prima lezione gratuita dove potrai provare a immergerti in totale sicurezza con i nostri istruttori certificati",
      nextSteps: "Continua la tua formazione con i nostri corsi consigliati:",
    },
    messageTemplate: (courseTitle: string) =>
      `Ciao, sono interessato al corso ${courseTitle}.`,
  },
  contact: {
    title: "Contattaci",
    subtitle: {
      text: "Pronto a iniziare la tua avventura subacquea? Contattaci",
      highlight: "la prima prova è gratuita",
      formatted:
        "Pronto a iniziare la tua avventura subacquea? Contattaci la prima prova è gratuita!",
    },
    form: {
      title: "Scrivici",
      description:
        "Sei interessato a un corso? Hai domande? Scrivici! O se preferisci, contattaci tramite i nostri social.",
      fieldsPlaceholder: {
        name: "Nome",
        email: "Email",
        phone: "Telefono",
        message: "Il tuo messaggio...",
      },
      defaultMessage: "Ciao, sono interessato a una lezione di prova gratuita.",
      submitButton: "Invia Messaggio",
    },
    contactLabels: {
      title: "Contatti",
      openingHoursTitle: "Orari segreteria",
      phone: "Telefono",
      whatsapp: "WhatsApp",
      email: "Email",
      address: "Dove siamo?",
    },
    socialMediaLabels: {
      facebook: "Seguici su Facebook",
      instagram: "Seguici su Instagram",
      youtube: "Seguici su YouTube",
      title: "Seguici sui Social",
      description: "Rimani aggiornato sulle nostre attività e eventi",
    },
  },
  newsletter: {
    title: "Vuoi rimanere aggiornato su tutti gli eventi?",
    description:
      "Iscriviti alla nostra newsletter per non perderti nessuna uscita!",
    form: {
      placeholder: "La tua email",
      buttonText: "Iscriviti",
    },
  },
  ui: {
    ages: {
      minimum: "14+ anni",
    },
    courses: {
      available: "corsi disponibili",
    },
    instructorGrades: {
      M1: "Istruttore 1° grado ARA (M1)",
      M2: "Istruttore 2° grado ARA (M2)",
      M3: "Istruttore 3° grado ARA (M3)",
      MApP1: "Istruttore 1° grado Apnea (MApP1)",
      MApP2: "Istruttore 2° grado Apnea (MApP2)",
      MApP3: "Istruttore 3° grado Apnea (MApP3)",
      PAiAr: "Aiuto Istruttore ARA (PAiAr)",
      PAiAp: "Aiuto Istruttore Apnea (PAiAp)",
      BM1: "Istruttore 1° grado Biologia marina",
      BM2: "Istruttore 2° grado Biologia marina",
      MUTA: "Istruttore muta stagna",
      FOTOSUB: "Istruttore Fotografia subacquea",
    },
    maps: {
      clubLocationTitle: "Mappa della sede del Club Sub Nettuno Bologna",
    },
    gallery: {
      defaultSubtitle: "Le nostre foto",
    },
    forms: {
      errors: {
        required: "Campo obbligatorio",
        invalidEmail: "Email non valida",
        submitError: "Errore nell'invio, riprova più tardi",
      },
      success: {
        messageSent: "Messaggio inviato con successo!",
        subscribed: "Iscrizione completata con successo!",
      },
      loading: {
        sending: "Invio in corso...",
        loading: "Caricamento...",
      },
    },
    breadcrumbs: {
      home: "Home",
      pageLabel: "Pagina",
      titles: {
        blog: "Blog",
        eventi: "Eventi",
        corsi: "Corsi",
        "chi-siamo": "Chi siamo",
        contatti: "Contatti",
        storia: "Storia",
        staff: "Staff",
        certificazioni: "Certificazioni",
        galleria: "Galleria",
      },
    },
    pagination: {
      previous: "Prec.",
      next: "Succ.",
      pageFormat: "Pagina {currentPage} di {totalPages}",
    },
  },
};

export type ContactForm = PagesData["contact"]["form"];
