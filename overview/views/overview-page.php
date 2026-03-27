<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss-browser/4.1.13/index.global.js" integrity="sha512-RAOoTi4JqATUmfyj+oyxwAo3JtUeZwLsBpNisDcY5VzvXZARuuaE5zfwUCDVa2LBBUax70uBlO4+eZA1Y/tk0A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <title>Overview</title>
</head>
<body class="min-h-screen bg-slate-100 text-slate-900 antialiased">
    <header class="py-4">
        <h1 class="text-3xl font-bold tracking-tight sm:text-4xl text-center">
            <?php echo htmlspecialchars($data["title"], ENT_QUOTES, 'UTF-8'); ?>
        </h1>
        <details>
            <summary class="text-lg text-slate-600 text-center py-2"><?php echo htmlspecialchars($title, ENT_QUOTES, 'UTF-8'); ?></summary>
            <p class="text-slate-600 text-center py-2 w-[400px] mx-auto"><?php echo htmlspecialchars($data["about"], ENT_QUOTES, 'UTF-8'); ?></p>
        </details>
    </header>
    <main class="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <?php if ($errorMessage !== null): ?>
            <div class="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-sm">
                <?php echo htmlspecialchars($errorMessage, ENT_QUOTES, 'UTF-8'); ?>
            </div>
        <?php else: ?>
            <div class="grid gap-6 md:grid-cols-4">
                <?php foreach ($sections as $section): ?>
                    <?php
                    $items = array_keys($data["sections"][$section] ?? []);
                    ?>
                    <section class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <h2 class="mb-4 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
                            <?php echo htmlspecialchars($section, ENT_QUOTES, 'UTF-8'); ?>
                        </h2>

                        <?php if (count($items) === 0): ?>
                            <p class="text-sm text-slate-500">No items found.</p>
                        <?php else: ?>
                            <ul class="space-y-2">
                                <?php foreach ($items as $item): ?>
                                    <?php if (is_string($item)): ?>
                                        <?php
                                        $description = $data["sections"][$section][$item] ?? '';
                                        if (!is_string($description)) {
                                            $description = '';
                                        }
                                        ?>
                                        <li>
                                            <button
                                                type="button"
                                                class="w-full rounded-md bg-slate-50 px-3 py-2 text-left text-sm text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                                                data-modal-trigger
                                                data-item-section="<?php echo htmlspecialchars($section, ENT_QUOTES, 'UTF-8'); ?>"
                                                data-item-name="<?php echo htmlspecialchars($item, ENT_QUOTES, 'UTF-8'); ?>"
                                                data-item-description="<?php echo htmlspecialchars($description, ENT_QUOTES, 'UTF-8'); ?>"
                                            >
                                                <?php echo htmlspecialchars($item, ENT_QUOTES, 'UTF-8'); ?>
                                            </button>
                                        </li>
                                    <?php endif; ?>
                                <?php endforeach; ?>
                            </ul>
                        <?php endif; ?>
                    </section>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </main>
    <footer class="mt-10 text-sm text-slate-500 text-center italic fixed bottom-0 w-full py-2">
        <?php echo "Created at: " . htmlspecialchars($data["created_at"], ENT_QUOTES, 'UTF-8'); ?>
    </footer>

    <div id="item-modal" class="fixed inset-0 z-50 hidden items-center justify-center p-4">
        <div id="item-modal-backdrop" class="absolute inset-0 bg-slate-900/50"></div>
        <div
            class="relative z-10 w-full max-w-lg rounded-xl border border-slate-200 bg-white p-5 shadow-xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="item-modal-title"
        >
            <div class="mb-4 flex items-start justify-between gap-3">
                <h3 id="item-modal-title" class="text-lg font-semibold text-slate-900"></h3>
                <button
                    id="item-modal-close"
                    type="button"
                    class="rounded-md p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                    aria-label="Close modal"
                >
                    &times;
                </button>
            </div>
            <p id="item-modal-description" class="whitespace-pre-line text-sm leading-6 text-slate-700"></p>
            <div class="mt-4 border-t border-slate-200 pt-4">
                <h4 class="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-600">Dependencies</h4>
                <div id="item-modal-dependencies" class="text-sm leading-6 text-slate-700"></div>
            </div>
        </div>
    </div>

    <script>
        const dependencySections = <?php echo json_encode($dependencies, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT); ?>;
        const dependencyMap = Object.values(dependencySections).reduce((accumulator, sectionDependencies) => {
            if (!sectionDependencies || typeof sectionDependencies !== 'object') {
                return accumulator;
            }

            Object.entries(sectionDependencies).forEach(([name, dependencies]) => {
                if (Array.isArray(dependencies)) {
                    accumulator[name] = dependencies;
                }
            });

            return accumulator;
        }, {});

        const modal = document.getElementById('item-modal');
        const modalBackdrop = document.getElementById('item-modal-backdrop');
        const modalCloseButton = document.getElementById('item-modal-close');
        const modalTitle = document.getElementById('item-modal-title');
        const modalDescription = document.getElementById('item-modal-description');
        const modalDependencies = document.getElementById('item-modal-dependencies');
        const modalTriggers = document.querySelectorAll('[data-modal-trigger]');
        let lastFocusedElement = null;

        const escapeHtml = (value) => {
            return value
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
        };

        const renderTree = (itemName, ancestry = new Set()) => {
            const dependencies = dependencyMap[itemName];
            if (!Array.isArray(dependencies) || dependencies.length === 0) {
                return '';
            }

            const branchAncestry = new Set(ancestry);
            branchAncestry.add(itemName);

            const childrenHtml = dependencies.map((dependencyName) => {
                const safeDependencyName = escapeHtml(dependencyName);
                if (branchAncestry.has(dependencyName)) {
                    return `<li>${safeDependencyName} <span class="text-xs text-amber-600">(circular)</span></li>`;
                }

                return `<li>${safeDependencyName}${renderTree(dependencyName, branchAncestry)}</li>`;
            }).join('');

            return `<ul class="ml-4 border-l border-slate-300 pl-4 space-y-1">${childrenHtml}</ul>`;
        };

        const renderDependencies = (itemName, itemSection) => {
            const sectionDependencies = dependencySections[itemSection];
            if (!sectionDependencies || !Array.isArray(sectionDependencies[itemName]) || sectionDependencies[itemName].length === 0) {
                modalDependencies.innerHTML = '<p class="text-slate-500">No internal dependencies.</p>';
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
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            modalDependencies.innerHTML = '';
            if (lastFocusedElement instanceof HTMLElement) {
                lastFocusedElement.focus();
            }
        };

        const openModal = (title, description, section, triggerElement) => {
            modalTitle.textContent = title;
            modalDescription.textContent = description || 'No description available.';
            renderDependencies(title, section);
            lastFocusedElement = triggerElement;
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            modalCloseButton.focus();
        };

        modalTriggers.forEach((trigger) => {
            trigger.addEventListener('click', () => {
                const title = trigger.getAttribute('data-item-name') || '';
                const description = trigger.getAttribute('data-item-description') || '';
                const section = trigger.getAttribute('data-item-section') || '';
                openModal(title, description, section, trigger);
            });
        });

        modalCloseButton.addEventListener('click', closeModal);
        modalBackdrop.addEventListener('click', closeModal);

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
                closeModal();
            }
        });
    </script>
</body>
</html>
