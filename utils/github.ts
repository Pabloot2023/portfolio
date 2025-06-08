export async function fetchProjectsFromGitHub(username: string): Promise<Project[]> {
  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos`);
    if (!res.ok) {
      console.error('Error fetching repos from GitHub:', res.statusText);
      return [];
    }
    const repos = await res.json();

    const projects = await Promise.all(
      repos.map(async (repo: any) => {
        try {
          const configRes = await fetch(
            `https://raw.githubusercontent.com/${username}/${repo.name}/main/project.config.json`
          );

          if (!configRes.ok) {
            // No hay config, usamos info básica con valores por defecto
            const project: Project = {
              title: repo.name,
              description: repo.description || '',
              tech: [], // vacío si no hay info
              demo: '', // sin demo
              repo: repo.html_url,
            };
            return project;
          }

          const config = await configRes.json();

          // Mapear config a Project
          const project: Project = {
            title: config.title || repo.name,
            description: config.description || '',
            tech: Array.isArray(config.tech) ? config.tech : [],
            demo: config.demo || '',
            repo: repo.html_url,
          };
          return project;
        } catch (error) {
          // Error al obtener config, usar datos básicos
          const project: Project = {
            title: repo.name,
            description: repo.description || '',
            tech: [],
            demo: '',
            repo: repo.html_url,
          };
          return project;
        }
      })
    );

    return projects.filter((p): p is Project => p !== null);
  } catch (error) {
    console.error('Error in fetchProjectsFromGitHub:', error);
    return [];
  }
}
