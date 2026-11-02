// The only script on the site. Every page works without it: it adds the
// button that switches between the light and dark themes, the buttons that
// copy a code sample, and plays a video in its place when its poster is
// pressed (without it, the poster is a link to the video).
//
// It is loaded in the head, before the page is drawn, so that a reader who
// chose a theme never sees a flash of the other one.
(function () {
  var root = document.documentElement;
  root.classList.add('js');

  var saved = null;
  try {
    saved = localStorage.getItem('theme');
  } catch (error) {
    // Storage can be switched off; the theme then follows the system.
  }
  if (saved === 'light' || saved === 'dark') root.dataset.theme = saved;

  function current() {
    if (root.dataset.theme) return root.dataset.theme;
    return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  document.addEventListener('click', function (event) {
    var target = event.target instanceof Element ? event.target : null;

    var poster = target && target.closest('[data-video]');
    if (poster) {
      event.preventDefault();
      var player = document.createElement('iframe');
      player.src = 'https://www.youtube-nocookie.com/embed/' + poster.dataset.video + '?autoplay=1';
      player.title = poster.dataset.title;
      player.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      player.referrerPolicy = 'strict-origin-when-cross-origin';
      player.className = 'video-player';
      poster.replaceWith(player);
      return;
    }
    if (!target) return;

    if (target.closest('[data-theme-toggle]')) {
      var next = current() === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try {
        localStorage.setItem('theme', next);
      } catch (error) {
        // The choice lasts for this page only.
      }
      return;
    }

    var copy = target.closest('[data-copy]');
    if (copy) {
      var code = copy.closest('.code-frame').querySelector('code');
      // Where the browser will not let the page write to the clipboard,
      // the code is selected instead, ready to copy by hand.
      var select = function () {
        var range = document.createRange();
        range.selectNodeContents(code);
        var selection = getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
      };
      if (!navigator.clipboard) {
        select();
        return;
      }
      navigator.clipboard.writeText(code.innerText).then(function () {
        var label = copy.textContent;
        copy.textContent = copy.dataset.done;
        setTimeout(function () {
          copy.textContent = label;
        }, 1600);
      }, select);
    }
  });
})();
