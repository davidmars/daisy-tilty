import { Plugin, ViteDevServer } from 'vite';
import fg from 'fast-glob';
import { promises as fs } from 'fs';
import path from 'path';

interface IconsGalleryOptions {
  dirs: string[]; // Dossiers à scanner récursivement
  output?: string; // Fichier HTML de sortie
}

function escapeHtml(str: string) {
  return str.replace(/[&<>'"]/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  }[c] || c));
}

async function generateIconsGallery(options: IconsGalleryOptions, warn: (msg: string) => void) {
  const outputFile = options.output || 'icons-gallery.src.html';
  const defaultSize = 32;
  const defaultColor = '#ff3399';
  const cssFile = path.resolve(process.cwd(), 'vite/icons-gallery.css');

  // Recherche tous les SVG dans les dossiers spécifiés
  const svgFiles = await fg(options.dirs.map(dir => `${dir.replace(/\\/g, '/')}/**/*.svg`));
  // Regroupe par famille (dossier parent)
  const families: Record<string, { file: string, name: string }[]> = {};
  svgFiles.forEach(file => {
    const parts = file.split(/[\\/]/);
    const family = parts[parts.length - 2] || 'root';
    if (!families[family]) families[family] = [];
    families[family].push({ file, name: parts[parts.length - 1] });
  });

  // Lire le CSS externe
  let css = '';
  try {
    css = await fs.readFile(cssFile, 'utf-8');
  } catch (e) {
    warn(`icons-gallery.css introuvable dans vite/. La galerie sera sans style.`);
  }

  // Génère le HTML source avec includes et balise <style>
  let html = `<include file="/src/layout/common.html" $title="Icons Gallery">
  <style>
${css}
  </style>
  <div style="padding: 1em;">
    <label style="display:block;margin-bottom:1em;">
      Icon size: <input id="icon-size-input" type="range" min="16" max="128" value="${defaultSize}" style="vertical-align:middle;" />
      <input id="icon-size-number" type="number" min="8" max="256" value="${defaultSize}" style="width:3em;" /> px
      &nbsp;|&nbsp; Color: <input id="icon-color-input" type="color" value="${defaultColor}" />
      <input id="icon-color-text" type="text" value="${defaultColor}" style="width:6em;" />
    </label>
`;
  for (const family of Object.keys(families).sort()) {
    html += `    <h2>${escapeHtml(family)}</h2>\n    <div class="icon-grid">`;
    for (const icon of families[family]) {
      const iconRel = icon.file.replace(/^src\/icons\//, '').replace(/^src\\icons\\/, '');
      const iconBaseName = icon.name.replace(/\.svg$/, '');
      html += `\n      <div class="icon-item">
        <include file="/src/components/icon.html" $icon="${iconRel}" $size="${defaultSize}" $color="${defaultColor}" style="--size:${defaultSize}px; color:${defaultColor};" />
        <span class="icon-name" data-name="${escapeHtml(iconBaseName)}">${escapeHtml(icon.name)}</span>
        <code>&lt;include file=\"/src/icons/${iconRel}\" /&gt;</code>
        <code class="icon-component" data-template="&lt;include file='/src/components/icon.html' $icon='${iconRel}' $size='{size}' $color='{color}' /&gt;">&lt;include file="/src/components/icon.html" $icon="${iconRel}" $size="${defaultSize}" $color="${defaultColor}" /&gt;</code>
      </div>`;
    }
    html += `\n    </div>`;
  }
  html += `
  </div>
  <script>
  const sizeInput = document.getElementById('icon-size-input');
  const sizeNumber = document.getElementById('icon-size-number');
  const colorInput = document.getElementById('icon-color-input');
  const colorText = document.getElementById('icon-color-text');
  function updateIconSize(val) {
    document.querySelectorAll('.icon-item > svg').forEach(function(svg) {
      svg.style.setProperty('--size', val + 'px');
    });
    sizeInput.value = val;
    sizeNumber.value = val;
    document.querySelectorAll('.icon-component').forEach(function(code) {
      var template = code.getAttribute('data-template');
      code.textContent = template.replace('{size}', val).replace('{color}', colorInput.value);
    });
  }
  function updateIconColor(val) {
    document.querySelectorAll('.icon-item > svg').forEach(function(svg) {
      svg.style.color = val;
    });
    colorInput.value = val;
    colorText.value = val;
    document.querySelectorAll('.icon-component').forEach(function(code) {
      var template = code.getAttribute('data-template');
      code.textContent = template.replace('{size}', sizeInput.value).replace('{color}', val);
    });
  }
  sizeInput.addEventListener('input', function(e) { updateIconSize(e.target.value); });
  sizeNumber.addEventListener('input', function(e) { updateIconSize(e.target.value); });
  colorInput.addEventListener('input', function(e) { updateIconColor(e.target.value); });
  colorText.addEventListener('input', function(e) { updateIconColor(e.target.value); });
  updateIconSize(sizeInput.value);
  updateIconColor(colorInput.value);
  document.querySelectorAll('code').forEach(function(code) {
    code.addEventListener('click', async function() {
      try {
        await navigator.clipboard.writeText(code.textContent);
        code.classList.add('copied');
        var old = code.textContent;
        code.textContent = 'Copied!';
        setTimeout(function() {
          code.classList.remove('copied');
          code.textContent = old;
        }, 900);
      } catch (e) {
        alert('Copy failed');
      }
    });
  });
  document.querySelectorAll('.icon-name').forEach(function(span) {
    span.addEventListener('click', async function() {
      try {
        await navigator.clipboard.writeText(span.dataset.name);
        span.classList.add('copied');
        var old = span.textContent;
        span.textContent = 'Copied!';
        setTimeout(function() {
          span.classList.remove('copied');
          span.textContent = old;
        }, 900);
      } catch (e) {
        alert('Copy failed');
      }
    });
  });
  </script>
</include>
`;
  await fs.writeFile(path.resolve(process.cwd(), outputFile), html, 'utf-8');
}

export default function iconsGalleryPlugin(options: IconsGalleryOptions): Plugin {
  return {
    name: 'vite-plugin-icons-gallery',
    async buildStart() {
      await generateIconsGallery(options, this.warn);
      this.warn(`Icons gallery source generated: ${options.output || 'icons-gallery.src.html'}`);
    },
    configureServer(server: ViteDevServer) {
      const iconDirs = options.dirs.map(dir => path.resolve(process.cwd(), dir));
      const watcher = server.watcher;
      const regenerateAndReload = async () => {
        await generateIconsGallery(options, (msg) => server.config.logger.warn(msg));
        server.ws.send({ type: 'full-reload' });
      };
      watcher.on('add', file => {
        if (iconDirs.some(dir => file.startsWith(dir)) && file.endsWith('.svg')) {
          regenerateAndReload();
        }
      });
      watcher.on('unlink', file => {
        if (iconDirs.some(dir => file.startsWith(dir)) && file.endsWith('.svg')) {
          regenerateAndReload();
        }
      });
      watcher.on('change', file => {
        if (iconDirs.some(dir => file.startsWith(dir)) && file.endsWith('.svg')) {
          regenerateAndReload();
        }
      });
    }
  };
} 