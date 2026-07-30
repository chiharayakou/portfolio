async function loadProjects() {
    try {
        const response = await fetch('projects.json');
        const data = await response.json();
        console.log("Project data loaded:", data);
        return data;
    } catch (error) {
        console.error("Failed to load projects:", error);
    }
}

function renderSection(data) {
    const projectsContainer = document.getElementById("projects");
    if (!projectsContainer || !data.sections) return;

    projectsContainer.innerHTML = ""; /* Clear all content for safety */
    data.sections.forEach(section => {
        /* === Section Title === */
        const title = document.createElement('h2');
        title.textContent = section.title.ru;
        projectsContainer.appendChild(title);

        /* === Projects Grid === */
        const grid = document.createElement('div');
        grid.className = 'project-grid';

        section.projects.forEach(project => {
            const card = document.createElement('article');
            card.className = 'project-card';

            if (project.image) {
                const img = document.createElement('img');
                img.src = project.image;
                img.alt = project.title.ru;
                img.className = 'project-card__image';
                card.appendChild(img);
            } else {
                const placeholder = document.createElement('div');
                placeholder.className = 'project-card__image project-card__image--placeholder';
                card.appendChild(placeholder);
            }

            const cardTitle = document.createElement('h3');
            cardTitle.textContent = project.title.ru;

            const cardDesc = document.createElement('p');
            cardDesc.textContent = project.description.ru;

            const status = document.createElement('span');
            status.className = `status status-${project.status}`;
            status.textContent = project.status;

            card.appendChild(cardTitle);
            card.appendChild(cardDesc);
            card.appendChild(status);
            grid.appendChild(card);
        });
        projectsContainer.appendChild(grid);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const data = await loadProjects();
    if (data) {
        renderSection(data);
    }
});