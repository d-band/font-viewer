const $ = require('jquery');
const opentype = require('opentype.js');

require('./style/index.less');

function showError(msg) {
  $('.message').text(msg).slideDown(300, () => {
    setTimeout(() => {
      $('.message').slideUp();
    }, 3000);
  });
}

function renderFont(font) {
  const listEl = $('#J_glyphList');
  listEl.empty();
  const len = font.glyphs.length;
  const SVG = $(`
    <li class="glyph">
      <div>
        <h3></h3>
        <p>
          <svg class="glyph-svg" viewBox="-14 -136 100 200"><path class="path" d="M 0,0" /></svg>
        </p>
      </div>
    </li>
  `);
  /** 各glyph描画 */
  for (let i = 0; i < len; i++) {
    const v = font.glyphs.get(i);
    const svg = SVG.clone(true);
    svg.find('h3').html(v.unicode || 0);
    const path = v.getPath().toPathData();
    if (path) {
      svg.find('.path').attr('d', path);
    }
    listEl.append(svg);
  }
}

$(() => {
  $('.tabs-item').on('click', (e) => {
    const el = $(e.currentTarget);
    const cur = el.attr('tabindex');
    $('.tabs-item').removeClass('active');
    el.addClass('active');
    $('.tabs-content').children().each((i, v) => {
      if (i == cur) {
        $(v).show();
      } else {
        $(v).hide();
      }
    });
  });

  $('.form-url').on('submit', (e) => {
    e.preventDefault();
    const url = $('.form-url input').val();
    opentype.load(url, (err, font) => {
      if (err) {
        console.error(err);
        showError('Load url failed!');
        return;
      }
      renderFont(font);
    });
    return false;
  });

  $('#J_file').on('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const font = opentype.parse(evt.target.result);
        renderFont(font);
      } catch (err) {
        console.error(err);
        showError('Unsupported font type!');
      }
    };
    reader.onerror = (err) => {
      console.error(err);
      showError('Upload file failed!');
    };
    reader.readAsArrayBuffer(file);
  });
});
