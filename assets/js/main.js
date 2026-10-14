// Salman SEO Tools — shared behaviour
document.addEventListener('DOMContentLoaded', function () {
  // footer year
  document.querySelectorAll('#year').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // mobile nav
  var toggle = document.getElementById('navToggle'), nav = document.getElementById('mainNav');
  if (toggle && nav) toggle.addEventListener('click', function () { nav.classList.toggle('open'); });

  // homepage tool search
  var box = document.getElementById('toolSearch');
  if (box) {
    var cards = Array.prototype.slice.call(document.querySelectorAll('.tool-card'));
    var empty = document.getElementById('noResults');
    box.addEventListener('input', function () {
      var q = box.value.trim().toLowerCase(), shown = 0;
      cards.forEach(function (c) {
        var hit = (c.getAttribute('data-name') || '').toLowerCase().indexOf(q) !== -1;
        c.style.display = hit ? '' : 'none';
        if (hit) shown++;
      });
      document.querySelectorAll('.cat-block').forEach(function (cat) {
        var visible = cat.querySelectorAll('.tool-card:not([style*="none"])').length;
        cat.style.display = visible ? '' : 'none';
      });
      if (empty) empty.style.display = shown ? 'none' : 'block';
    });
    box.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        var first = document.querySelector('.tool-card:not([style*="none"])');
        if (first) window.location.href = first.getAttribute('href');
      }
    });
  }
});

// copy helper used by tool pages
function copyText(id, btn) {
  var el = document.getElementById(id);
  var txt = el ? (el.value !== undefined ? el.value : el.textContent) : '';
  if (!txt.trim()) return;
  navigator.clipboard.writeText(txt).then(function () {
    if (btn) { var o = btn.textContent; btn.textContent = 'Copied ✓'; setTimeout(function(){ btn.textContent = o; }, 1600); }
  });
}
function downloadFile(filename, content, mime) {
  var blob = new Blob([content], { type: mime || 'text/plain' });
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = filename;
  document.body.appendChild(a); a.click();
  setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); }, 500);
}
