(function () {
  var form = document.querySelector('form[name="contact"]');
  if (!form) return;

  var wrap = form.closest(".w-form");
  if (!wrap) return;

  var done = wrap.querySelector(".w-form-done");
  var fail = wrap.querySelector(".w-form-fail");

  form.addEventListener(
    "submit",
    function (event) {
      // Capture phase: block Webflow's delegated .w-form form handler.
      event.preventDefault();
      event.stopImmediatePropagation();

      if (fail) fail.style.display = "none";

      var body = new URLSearchParams(new FormData(form)).toString();

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body,
      })
        .then(function (res) {
          if (!res.ok) throw new Error("Form submission failed");
          form.style.display = "none";
          if (fail) fail.style.display = "none";
          if (done) done.style.display = "block";
        })
        .catch(function () {
          if (done) done.style.display = "none";
          if (fail) fail.style.display = "block";
        });
    },
    true,
  );
})();
