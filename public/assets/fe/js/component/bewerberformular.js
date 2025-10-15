'use strict';

import ajax from "./ajax.js";

function bewerberformular(jobId) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    const modal = document.createElement('div');
    modal.className = 'modal-container';

    const form = document.createElement('form');
    form.id = 'formAddContent';

    form.innerHTML = `
        <h2>Bewerbungsformular</h2>
        <p><input type="text" name="vorname" placeholder="Vorname" required></p>
        <p><input type="text" name="nachname" placeholder="Nachname" required></p>
        <p><input type="text" name="stadt" placeholder="Stadt" required></p>
        <p><input type="text" name="plz" placeholder="PLZ" required></p>
        <p>
            <input type="file" name="CV_UPLOAD" id="cvUpload" multiple>
            <span class="file-names"></span>
        </p>
        <input type="hidden" name="jobId" value="${jobId}">
        <div class="btn-row">
            <button type="submit" class="btn primary">Bewerbung absenden</button>
            <button type="button" class="btn close">Schließen</button>
        </div>
    `;

    // 📎 File Input stylen
    const fileInput = form.querySelector('#cvUpload');
    fileInput.classList.add('btn', 'primary', 'upload-btn');

    modal.appendChild(form);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);


    form.addEventListener('submit', ajax.submitNewContent);


    const closeBtn = form.querySelector('.close');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(overlay);
    });


    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            document.body.removeChild(overlay);
        }
    });
}

export default { bewerberformular };
