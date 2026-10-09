# Prova gratuita Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a single `/prova-gratuita` page that explains the free trial for scuba diving and apnea and reuses the existing contact form.

**Architecture:** Add one Astro page composed from existing `Layout`, `SectionContainer`, `SectionHeader`, card primitives, and `ContactSection`. The page remains content-only and does not read or write Sanity. Update the two header CTA links to point to the new route; keep `/contatti` for generic requests.

**Tech Stack:** Astro, TypeScript, existing Astro components, Tailwind utility classes, Lucide icons.

## Global Constraints

- Do not change the events section on the home page.
- Do not add Sanity documents, fields, date management, or automatic booking confirmation.
- Use the existing `ContactSection`/`ContactForm` endpoint and validation.
- The page must say that the club confirms the date and availability after the request.
- Use Italian copy approved in `docs/superpowers/specs/2026-10-09-prova-gratuita-design.md`.
- Keep `/contatti` available for generic contact requests.

---

### Task 1: Build the free trial page

**Files:**
- Create: `src/pages/prova-gratuita.astro`

**Interfaces:**
- Consumes: `Layout`, `SectionContainer`, `SectionHeader`, `Card`, `CardHeader`, `CardTitle`, `CardContent`, `ContactSection`, and Lucide icons.
- Produces: a public, indexable `/prova-gratuita` route with one H1 and one contact form.

- [ ] **Step 1: Add page frontmatter and SEO metadata**

Create the page with:

```astro
---
import Layout from "@/layouts/Layout.astro";
import SectionContainer from "@/components/layout/Section.astro";
import SectionHeader from "@/components/layout/SectionHeader.astro";
import Card from "@/components/primitives/Card/Card.astro";
import CardHeader from "@/components/primitives/Card/CardHeader.astro";
import CardTitle from "@/components/primitives/Card/CardTitle.astro";
import CardContent from "@/components/primitives/Card/CardContent.astro";
import ContactSection from "@/features/contact/ContactSection.astro";
import { MessageCircle, Waves, CheckCircle, Shirt } from "@lucide/astro";
---

<Layout
  title="Prova gratuita sub e apnea a Bologna | Club Sub Nettuno"
  description="Richiedi una prova gratuita di subacquea o apnea in piscina a Bologna. Scrivici: concordiamo insieme giorno e percorso, senza impegno."
>
```

- [ ] **Step 2: Add the hero and the two trial cards**

Render one H1 in a `SectionHeader` with `headingLevel="h1"`, followed by the approved hero subtitle. Use two white cards in a responsive two-column grid:

```astro
<SectionContainer background="gradient-secondary" padding="lg">
  <SectionHeader
    title="Prova subacquea e apnea a Bologna"
    subtitle="La prima prova in piscina è gratuita e senza impegno. Scegli se vuoi avvicinarti alla subacquea con bombole o all’apnea: concordiamo insieme giorno e percorso."
    headingLevel="h1"
    hasBreadcrumbs={false}
    titleSize="xl"
  />

  <div class="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
    <Card class="bg-white">
      <CardHeader class="text-center">
        <Waves class="mx-auto h-12 w-12 text-primary" aria-hidden="true" />
        <CardTitle>Prova subacquea</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Respira sott’acqua con le bombole, impara a conoscere l’attrezzatura e prova i primi esercizi in piscina insieme a un istruttore.</p>
      </CardContent>
    </Card>
    <Card class="bg-white">
      <CardHeader class="text-center">
        <MessageCircle class="mx-auto h-12 w-12 text-primary" aria-hidden="true" />
        <CardTitle>Prova apnea</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Scopri respirazione, rilassamento e primi esercizi di apnea in piscina, sempre seguito dagli istruttori.</p>
      </CardContent>
    </Card>
  </div>
</SectionContainer>
```

- [ ] **Step 3: Add the process and what-to-bring sections**

Use a white section for three numbered steps and a gray section for the practical information. Keep the exact approved statements:

```astro
<SectionContainer background="white" padding="lg">
  <SectionHeader title="Come funziona" hasBreadcrumbs={false} titleSize="lg" />
  <ol class="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
    <li><strong>1. Scrivici.</strong> Indicaci se ti interessa la subacquea o l’apnea.</li>
    <li><strong>2. Concordiamo.</strong> Ti comunichiamo una data e le informazioni necessarie per la prova.</li>
    <li><strong>3. Prova in piscina.</strong> Vieni, prova con un istruttore e valuta insieme a noi il percorso.</li>
  </ol>
</SectionContainer>

<SectionContainer background="gray" padding="lg">
  <SectionHeader title="Cosa portare" hasBreadcrumbs={false} titleSize="lg" />
  <ul class="mx-auto grid max-w-3xl gap-4">
    <li><CheckCircle aria-hidden="true" /> Costume e asciugamano.</li>
    <li><CheckCircle aria-hidden="true" /> L’attrezzatura necessaria per la prova viene fornita dal club.</li>
    <li><Shirt aria-hidden="true" /> Certificato medico non agonistico, se già disponibile; il club conferma prima della prova cosa serve nel caso specifico.</li>
  </ul>
</SectionContainer>
```

The implementation may wrap each list item in a flex container so icons align correctly on mobile; do not rely on color alone to communicate the steps.

- [ ] **Step 4: Reuse the existing contact section**

Append the existing section without creating a new endpoint:

```astro
<ContactSection
  hasBreadcrumbs={false}
  formHiddenFields={{ campaign: "Prova gratuita" }}
  formDefaultMessage="Ciao, sono interessato alla prova gratuita. Mi interessa la subacquea o l’apnea e vorrei concordare una data."
/> 
</Layout>
```

The form remains the existing name/email/phone/message form. No new fields or Sanity content are added.

### Task 2: Point the header CTA to the dedicated page

**Files:**
- Modify: `src/components/layout/site/Header.astro:92-103` (desktop CTA)
- Modify: `src/components/layout/site/Header.astro:116-127` (mobile CTA)

**Interfaces:**
- Consumes: the existing `headerData.hero.free_trial` label.
- Produces: both CTA links target `/prova-gratuita` while the generic `/contatti` route remains unchanged elsewhere.

- [ ] **Step 1: Change both CTA hrefs**

Replace only these two attributes:

```astro
<a href="/prova-gratuita" ...>
```

Keep the label, icon, classes, accessibility attributes, and mobile behavior unchanged.

### Task 3: Verify the route and hand off deployment

**Files:**
- Verify: `src/pages/prova-gratuita.astro`
- Verify: `src/components/layout/site/Header.astro`

- [ ] **Step 1: Run formatting checks**

Run `git diff --check`.

Expected: exit code 0 and no whitespace errors.

- [ ] **Step 2: Build the site**

Run `pnpm run build`.

Expected: exit code 0, `/prova-gratuita` generated, and no new errors. Existing Vite chunk-size warnings are acceptable if they remain unchanged.

- [ ] **Step 3: Inspect the generated HTML**

Run:

```bash
rg -n "Prova subacquea e apnea a Bologna|Prova gratuita|/prova-gratuita|Campagna" dist/client/prova-gratuita/index.html dist/client/index.html
```

Expected: the page contains one H1, the approved sections, and the route; the generated home/header output contains `/prova-gratuita`.

- [ ] **Step 4: Commit the implementation**

After verification:

```bash
git add src/pages/prova-gratuita.astro src/components/layout/site/Header.astro
git commit -m "Add free trial landing page"
```

The deployment itself remains a separate user action; do not push or deploy from this task.
