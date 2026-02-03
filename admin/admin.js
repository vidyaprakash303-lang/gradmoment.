async function loadData(){
  const res = await fetch("data.json");
  const data = await res.json();
  document.getElementById("headline").value = data.hero?.headline || "";
  document.getElementById("taglines").value = (data.hero?.taglines || []).join("\n");
  document.getElementById("phone").value = data.brand?.phone || "";
}

loadData().catch(() => {
  document.getElementById("note").textContent = "Could not load data.json. If you opened this file directly, use a local server (Live Server).";
});

document.getElementById("saveBtn").addEventListener("click", ()=>{
  document.getElementById("note").textContent =
    "Browser security prevents saving directly to files. For real saving, connect this admin to Netlify CMS or Firebase backend.";
});
