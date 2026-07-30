async function loadProjects() {
    try {
        const response = await fetch('projects.json');
        const data = await response.json();
        console.log("Project data loaded:", data);
        return data;
    } catch(error) {
        console.error("Failed to load projects:", error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
});