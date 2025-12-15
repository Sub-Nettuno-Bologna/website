import { defineAction, ActionError } from "astro:actions";
import {
  RESEND_API_KEY,
  RESEND_TO_EMAIL,
  RESEND_FROM_EMAIL,
} from "astro:env/server";
import { Resend } from "resend";
import { z } from "astro:schema";

const ContactSchema = z.object({
  name: z.string().min(1, "Il nome è obbligatorio"),
  email: z.string().email("Formato email non valido"),
  phone: z.string().optional(),
  message: z.string().min(1, "Il messaggio è obbligatorio"),
  "bot-field": z.string().optional(),
  campaign: z.string().optional(),
});

const getResendClient = () => {
  // IMPORTANT: don't throw at module init. If env vars are missing in production,
  // a top-level throw can prevent the actions module from loading, and Astro will
  // surface it as "Expected `server` export ... Received undefined."
  if (!RESEND_API_KEY) {
    throw new ActionError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Configurazione server mancante (RESEND_API_KEY).",
    });
  }
  return new Resend(RESEND_API_KEY);
};

const getEmailConfig = () => {
  if (!RESEND_TO_EMAIL) {
    throw new ActionError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Configurazione server mancante (RESEND_TO_EMAIL).",
    });
  }
  if (!RESEND_FROM_EMAIL) {
    throw new ActionError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Configurazione server mancante (RESEND_FROM_EMAIL).",
    });
  }
  return { to: RESEND_TO_EMAIL, from: RESEND_FROM_EMAIL };
};

const getMessage = (
  name: string,
  email: string,
  message: string,
  phone?: string,
  campaign?: string
): string => {
  let result = `${message}\n\n${email}`;
  if (name) {
    result += `\n${name}`;
  }
  if (phone) {
    result += `\n${phone}`;
  }
  if (campaign) {
    result += `\n\nCampagna: ${campaign}`;
  }
  return result;
};

export const server = {
  validate: defineAction({
    accept: "form",
    input: ContactSchema,
    handler: async () => {
      return { ok: true } as const;
    },
  }),

  contact: defineAction({
    accept: "form",
    input: ContactSchema,
    handler: async (input) => {
      const {
        name,
        email,
        phone,
        message,
        "bot-field": botField,
        campaign,
      } = input;

      // Honeypot check
      if (botField) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "Richiesta non valida",
        });
      }

      const emailSubject = campaign
        ? `[${campaign}] Nuovo messaggio da ${name} - SubNettuno.it`
        : `Nuovo messaggio da ${name} - SubNettuno.it`;
      const emailText = getMessage(name, email, message, phone, campaign);

      try {
        const resend = getResendClient();
        const { to, from } = getEmailConfig();

        const result = await resend.emails.send({
          from,
          to: [to],
          replyTo: email,
          subject: emailSubject,
          text: emailText,
        });

        if (result.error) {
          throw new ActionError({
            code: "INTERNAL_SERVER_ERROR",
            message: result.error.message || "Errore invio email",
          });
        }

        console.info("Message sent: %s", result.data?.id);

        return {
          success: true,
          message:
            "Messaggio inviato con successo! Ti risponderemo al più presto.",
        };
      } catch (error) {
        console.error("Error sending email:", error);
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Errore invio form",
        });
      }
    },
  }),
};
