import {
  Star,
  FlagTriangleRight,
  FireExtinguisher,
  Users2,
  Image,
  MessageSquare,
  BookOpen,
  CalendarDays,
  Users,
  HelpCircle,
} from "@lucide/astro";

export const headerData = {
  hero: {
    free_trial: "Prova gratuita",
  },
  ui: {
    mobileMenuToggle: "Toggle mobile menu",
  },
  navigation: [
    {
      label: "Chi siamo",
      href: "/chi-siamo",
      icon: Users2,
      dropdown: [
        {
          label: "Staff",
          href: "/chi-siamo/staff",
          icon: Users,
        },
      ],
    },

    {
      label: "Corsi",
      href: "/corsi",
      icon: FireExtinguisher,
      dropdown: [
        {
          label: "Subacquea",
          href: "/corsi/subacquea",
          icon: FireExtinguisher,
        },
        {
          label: "Apnea",
          href: "/corsi/apnea",
          icon: FlagTriangleRight,
        },
        {
          label: "Specialità",
          href: "/corsi/specialita",
          icon: Star,
        },
      ],
    },

    {
      label: "Eventi",
      href: "/eventi",
      icon: CalendarDays,
    },

    // {
    //   label: "Blog",
    //   href: "/blog",
    //   icon: BookOpen,
    // },

    {
      label: "Contatti",
      href: "/contatti",
      icon: MessageSquare,
    },

    {
      label: "Domande frequenti",
      href: "/domande-frequenti",
      icon: HelpCircle,
    },

    // {
    //   label: "Gallery",
    //   href: "/gallery",
    //   icon: Image,
    // },
  ],
};
