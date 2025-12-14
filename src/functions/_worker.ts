/**
 * Cloudflare Worker API for contact form
 * Handles POST /contact requests and sends emails via Resend API
 */

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  "bot-field"?: string;
}

interface Env {
  RESEND_API_KEY: string;
  RESEND_FROM_EMAIL: string;
  RESEND_TO_EMAIL: string;
  ALLOWED_ORIGINS?: string; // Comma-separated list of allowed origins
}

// Default allowed origins
const DEFAULT_ALLOWED_ORIGINS = [
  "https://subnettuno.it",
  "https://www.subnettuno.it",
  "http://localhost:4321", // For local development
];

function getAllowedOrigins(env: Env): string[] {
  if (env.ALLOWED_ORIGINS) {
    return env.ALLOWED_ORIGINS.split(",").map((origin) => origin.trim());
  }
  return DEFAULT_ALLOWED_ORIGINS;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateContactData(data: unknown): {
  valid: boolean;
  data?: ContactFormData;
  error?: string;
} {
  if (!data || typeof data !== "object") {
    return { valid: false, error: "Invalid request body" };
  }

  const formData = data as Record<string, unknown>;

  // Honeypot check
  if (formData["bot-field"] && String(formData["bot-field"]).trim() !== "") {
    // Bot detected - return success silently
    return {
      valid: true,
      data: {
        name: "",
        email: "",
        message: "",
        "bot-field": "detected",
      },
    };
  }

  // Validate required fields
  const name = String(formData.name || "").trim();
  const email = String(formData.email || "").trim();
  const message = String(formData.message || "").trim();

  if (!name || name.length === 0) {
    return { valid: false, error: "Il nome è obbligatorio" };
  }

  if (!email || !isValidEmail(email)) {
    return { valid: false, error: "Formato email non valido" };
  }

  if (!message || message.length === 0) {
    return { valid: false, error: "Il messaggio è obbligatorio" };
  }

  const phone = formData.phone ? String(formData.phone).trim() : undefined;

  return {
    valid: true,
    data: {
      name,
      email,
      phone,
      message,
    },
  };
}

function getMessage(
  name: string,
  email: string,
  message: string,
  phone?: string
): string {
  let result = `${message}\n\n${email}`;
  if (name) {
    result += `\n${name}`;
  }
  if (phone) {
    result += `\n${phone}`;
  }
  return result;
}

function createCorsHeaders(origin: string, allowedOrigins: string[]): Headers {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  if (allowedOrigins.includes(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Content-Type");
    headers.set("Access-Control-Max-Age", "86400");
  }

  return headers;
}

async function handleOptions(request: Request, env: Env): Promise<Response> {
  const origin = request.headers.get("Origin") || "";
  const allowedOrigins = getAllowedOrigins(env);
  const headers = createCorsHeaders(origin, allowedOrigins);

  return new Response(null, { status: 204, headers });
}

async function handleContact(request: Request, env: Env): Promise<Response> {
  const origin = request.headers.get("Origin") || "";
  const allowedOrigins = getAllowedOrigins(env);

  // Check CORS
  if (origin && !allowedOrigins.includes(origin)) {
    return new Response(JSON.stringify({ error: "Origin not allowed" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Parse request body
  let body: unknown;
  try {
    body = await request.json();
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Invalid JSON in request body" }),
      {
        status: 400,
        headers: createCorsHeaders(origin, allowedOrigins),
      }
    );
  }

  // Validate data
  const validation = validateContactData(body);
  if (!validation.valid) {
    return new Response(JSON.stringify({ error: validation.error }), {
      status: 400,
      headers: createCorsHeaders(origin, allowedOrigins),
    });
  }

  const contactData = validation.data!;

  // If bot detected, return success silently
  if (contactData["bot-field"] === "detected") {
    return new Response(
      JSON.stringify({
        success: true,
        message:
          "Messaggio inviato con successo! Ti risponderemo al più presto.",
      }),
      {
        status: 200,
        headers: createCorsHeaders(origin, allowedOrigins),
      }
    );
  }

  // Check required env vars
  if (!env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set");
    return new Response(
      JSON.stringify({ error: "Server configuration error" }),
      {
        status: 500,
        headers: createCorsHeaders(origin, allowedOrigins),
      }
    );
  }

  if (!env.RESEND_FROM_EMAIL || !env.RESEND_TO_EMAIL) {
    console.error("RESEND_FROM_EMAIL or RESEND_TO_EMAIL is not set");
    return new Response(
      JSON.stringify({ error: "Server configuration error" }),
      {
        status: 500,
        headers: createCorsHeaders(origin, allowedOrigins),
      }
    );
  }

  // Prepare email
  const emailSubject = `Nuovo messaggio da ${contactData.name} - SubNettuno.it`;
  const emailText = getMessage(
    contactData.name,
    contactData.email,
    contactData.message,
    contactData.phone
  );

  // Send email via Resend API
  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.RESEND_FROM_EMAIL,
        to: [env.RESEND_TO_EMAIL],
        reply_to: contactData.email,
        subject: emailSubject,
        text: emailText,
      }),
    });

    if (!resendResponse.ok) {
      const errorData = await resendResponse.json().catch(() => ({}));
      console.error("Resend API error:", errorData);
      return new Response(
        JSON.stringify({
          error: errorData.message || "Errore invio email",
        }),
        {
          status: 500,
          headers: createCorsHeaders(origin, allowedOrigins),
        }
      );
    }

    const result = await resendResponse.json();
    console.info("Message sent:", result.id);

    return new Response(
      JSON.stringify({
        success: true,
        message:
          "Messaggio inviato con successo! Ti risponderemo al più presto.",
      }),
      {
        status: 200,
        headers: createCorsHeaders(origin, allowedOrigins),
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ error: "Errore invio form" }), {
      status: 500,
      headers: createCorsHeaders(origin, allowedOrigins),
    });
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return handleOptions(request, env);
    }

    // Route: POST /contact
    if (url.pathname === "/contact" && request.method === "POST") {
      return handleContact(request, env);
    }

    // 404 for other routes
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  },
};
