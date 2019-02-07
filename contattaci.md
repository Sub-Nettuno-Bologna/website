---
id: 163
title: Contattaci
date: 2018-08-04T13:17:18+00:00
author: carlo
layout: page
---

<form action="https://formspree.io/{{ site.contactus_email }}" method="POST" >

<label> Il tuo nome (richiesto)<br>
<input type="text" name="your-name" value="" size="40" class="wpcf7-form-control wpcf7-text wpcf7-validates-as-required" aria-required="true" aria-invalid="false" />
</label>

<label> La tua email (richiesto)<br>
<input type="email" name="your-email" value="" size="40" class="wpcf7-form-control wpcf7-text wpcf7-email wpcf7-validates-as-required wpcf7-validates-as-email" aria-required="true" aria-invalid="false"/>
</label>

<label> Oggetto<br>
<input type="text" name="your-subject" value="" size="40" class="wpcf7-form-control wpcf7-text" aria-invalid="false"/>
</label>

<label> Il tuo messaggio<br>
<textarea name="your-message" cols="40" rows="10" class="wpcf7-form-control wpcf7-textarea" aria-invalid="false"></textarea>
</label>

<div>
  <input type="submit" value="Invia" class="button button-primary" />
</div>
<p>I dati inseriti saranno utilizzati e trattati nel rispetto del regolamento UE2016/679.</p>

</form>
