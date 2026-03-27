const dependencyDataElement = document.getElementById(
  "overview-dependency-data",
);

const dependencySections = (() => {
  if (!(dependencyDataElement instanceof HTMLScriptElement)) {
    return {};
  }

  try {
    const parsed = JSON.parse(dependencyDataElement.textContent || "{}");
    if (parsed && typeof parsed === "object") {
      return parsed;
    }
  } catch (_error) {
    return {};
  }

  return {};
})();

const dependencyMap = Object.values(dependencySections).reduce(
  (accumulator, sectionDependencies) => {
    if (!sectionDependencies || typeof sectionDependencies !== "object") {
      return accumulator;
    }

    Object.entries(sectionDependencies).forEach(([name, dependencies]) => {
      if (Array.isArray(dependencies)) {
        accumulator[name] = dependencies;
      }
    });

    return accumulator;
  },
  {},
);

const modal = document.getElementById("item-modal");
const modalBackdrop = document.getElementById("item-modal-backdrop");
const modalCloseButton = document.getElementById("item-modal-close");
const modalTitle = document.getElementById("item-modal-title");
const modalDescription = document.getElementById("item-modal-description");
const modalDependencies = document.getElementById("item-modal-dependencies");
const modalTriggers = document.querySelectorAll("[data-modal-trigger]");
let lastFocusedElement = null;

const escapeHtml = (value) => {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
};

const renderTree = (itemName, ancestry = new Set()) => {
  const dependencies = dependencyMap[itemName];
  if (!Array.isArray(dependencies) || dependencies.length === 0) {
    return "";
  }

  const branchAncestry = new Set(ancestry);
  branchAncestry.add(itemName);

  const childrenHtml = dependencies
    .map((dependencyName) => {
      const safeDependencyName = escapeHtml(dependencyName);
      if (branchAncestry.has(dependencyName)) {
        return `<li>${safeDependencyName} <span class="text-xs text-amber-600">(circular)</span></li>`;
      }

      return `<li>${safeDependencyName}${renderTree(dependencyName, branchAncestry)}</li>`;
    })
    .join("");

  return `<ul class="ml-4 border-l border-slate-300 pl-4 space-y-1">${childrenHtml}</ul>`;
};

const renderDependencies = (itemName, itemSection) => {
  const sectionDependencies = dependencySections[itemSection];
  if (
    !sectionDependencies ||
    !Array.isArray(sectionDependencies[itemName]) ||
    sectionDependencies[itemName].length === 0
  ) {
    modalDependencies.innerHTML =
      '<p class="text-slate-500">No internal dependencies.</p>';
    return;
  }

  const safeItemName = escapeHtml(itemName);
  modalDependencies.innerHTML = `
        <ul class="space-y-2">
            <li>${safeItemName}${renderTree(itemName)}</li>
        </ul>
    `;
};

const closeModal = () => {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  modalDependencies.innerHTML = "";
  if (lastFocusedElement instanceof HTMLElement) {
    lastFocusedElement.focus();
  }
};

const openModal = (title, description, section, triggerElement) => {
  modalTitle.textContent = title;
  modalDescription.textContent = description || "No description available.";
  renderDependencies(title, section);
  lastFocusedElement = triggerElement;
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  modalCloseButton.focus();
};

modalTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const title = trigger.getAttribute("data-item-name") || "";
    const description = trigger.getAttribute("data-item-description") || "";
    const section = trigger.getAttribute("data-item-section") || "";
    openModal(title, description, section, trigger);
  });
});

modalCloseButton.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", closeModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
