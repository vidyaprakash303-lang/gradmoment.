const FONT_STACKS = [
  '"Cinzel", serif',
  '"Playfair Display", serif',
  '"Cormorant Garamond", serif',
  '"Marcellus", serif',
  '"Prata", serif',
  '"Manrope", system-ui, sans-serif'
];

const TAGLINES = [
  "Where love becomes a celebration.",
  "Your story. Our stage. A Grand Moment.",
  "Elegance in every detail, joy in every heartbeat.",
  "From ‘Yes’ to forever — crafted beautifully.",
  "Luxury weddings, timeless memories.",
  "Celebrate relationships with royal ambience.",
  "Moments fade. Memories don’t.",
  "A premium space for premium emotions."
];

function startTaglineRotator(){
  const el = document.querySelector("[data-tagline]");
  if(!el) return;

  let i = Math.floor(Math.random()*TAGLINES.length);
  let fi = Math.floor(Math.random()*FONT_STACKS.length);

  el.textContent = TAGLINES[i];
  el.style.fontFamily = FONT_STACKS[fi];

  setInterval(() => {
    i = (i + 1) % TAGLINES.length;
    fi = (fi + 1) % FONT_STACKS.length;

    el.animate(
      [{opacity:0, transform:"translateY(6px)"},{opacity:1, transform:"translateY(0px)"}],
      {duration:520, easing:"cubic-bezier(.2,.8,.2,1)"}
    );

    el.textContent = TAGLINES[i];
    el.style.fontFamily = FONT_STACKS[fi];
  }, 2600);
}

function setupAmbientAudio(){
  const audio = document.querySelector("#ambientAudio");
  const btn = document.querySelector("#audioToggle");
  const hint = document.querySelector("#audioHint");
  if(!audio || !btn) return;

  let isPlaying = false;

  const setUI = () => {
    btn.textContent = isPlaying ? "Pause Sound" : "Play Sound";
    if(hint) hint.textContent = isPlaying ? "Ambient on" : "Tap to enable (browser policy)";
  };

  async function tryPlay(){
    try{
      audio.volume = 0.42;
      await audio.play();
      isPlaying = true;
      setUI();
    }catch(e){
      isPlaying = false;
      setUI();
    }
  }

  btn.addEventListener("click", async () => {
    if(!isPlaying){
      await tryPlay();
    } else {
      audio.pause();
      isPlaying = false;
      setUI();
    }
  });

  tryPlay();

  const once = async () => {
    if(!isPlaying) await tryPlay();
    window.removeEventListener("pointerdown", once);
  };
  window.addEventListener("pointerdown", once, {passive:true});
}

function setupReveal(){
  const els = document.querySelectorAll("[data-reveal]");
  if(!els.length) return;

  const io = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
      if(en.isIntersecting){
        en.target.animate(
          [{opacity:0, transform:"translateY(14px)"},{opacity:1, transform:"translateY(0px)"}],
          {duration:700, easing:"cubic-bezier(.2,.8,.2,1)"}
        );
        io.unobserve(en.target);
      }
    });
  }, {threshold:.12});

  els.forEach(el=>io.observe(el));
}

/* WhatsApp form (booking + contact) */
function setupWhatsAppForms(){
  const forms = document.querySelectorAll("[data-wa-form]");
  forms.forEach(form => {
    form.addEventListener("submit", (e)=>{
      e.preventDefault();

      const phone = "918708808087";
      const name = form.querySelector("[name='name']")?.value?.trim() || "";
      const mobile = form.querySelector("[name='mobile']")?.value?.trim() || "";
      const date = form.querySelector("[name='date']")?.value?.trim() || "";
      const guests = form.querySelector("[name='guests']")?.value?.trim() || "";
      const type = form.querySelector("[name='type']")?.value?.trim() || "";
      const msg = form.querySelector("[name='message']")?.value?.trim() || "";

      const text =
`Grand Moment Booking Enquiry
Name: ${name}
Phone: ${mobile}
Event Type: ${type}
Event Date: ${date}
Guests: ${guests}
Message: ${msg}
Location: Haryana`;

      const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
      window.open(url, "_blank", "noopener,noreferrer");
    });
  });
}

document.addEventListener("DOMContentLoaded", ()=>{
  startTaglineRotator();
  setupAmbientAudio();
  setupReveal();
  setupWhatsAppForms();
});
