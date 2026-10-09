function getData(key) {
    var data = localStorage.getItem(key);
    if (data === null) return [];
    return JSON.parse(data);
}

function saveData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function escapeHTML(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function showToast(message, type) {
    type = type || "success";
    var toast = document.getElementById("gymToast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "gymToast";
        document.body.appendChild(toast);
    }

    var icon = type === "success" ? "fa-circle-check" : "fa-circle-exclamation";
    toast.className = "toast " + type;
    toast.innerHTML = '<i class="fas ' + icon + '"></i><span>' + escapeHTML(message) + '</span>';

    setTimeout(function () { toast.classList.add("show"); }, 10);
    setTimeout(function () { toast.classList.remove("show"); }, 2800);
}

function openConfirm(message, onConfirm) {
    var overlay = document.getElementById("gymModal");
    if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "gymModal";
        overlay.className = "modal-overlay";
        overlay.innerHTML =
            '<div class="modal">' +
                '<i class="fas fa-triangle-exclamation"></i>' +
                '<h3>Are you sure?</h3>' +
                '<p id="gymModalMsg"></p>' +
                '<div class="modal-actions">' +
                    '<button type="button" class="btn-cancel" id="gymCancel">Cancel</button>' +
                    '<button type="button" class="btn-delete" id="gymConfirm">Delete</button>' +
                '</div>' +
            '</div>';
        document.body.appendChild(overlay);
    }

    document.getElementById("gymModalMsg").innerText = message;
    overlay.classList.add("show");

    document.getElementById("gymCancel").onclick = function () {
        overlay.classList.remove("show");
    };

    document.getElementById("gymConfirm").onclick = function () {
        overlay.classList.remove("show");
        onConfirm();
    };
}

function loadUserInfo() {
    var user = localStorage.getItem("gymUser");
    if (!user) return;

    var nameEl = document.getElementById("userName");
    var avatarEl = document.getElementById("userAvatar");

    if (nameEl) nameEl.innerText = user;
    if (avatarEl) avatarEl.innerText = user.charAt(0).toUpperCase();
}

document.addEventListener("DOMContentLoaded", loadUserInfo);