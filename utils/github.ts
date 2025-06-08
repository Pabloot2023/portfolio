// utils/github.ts

export interface ProjectConfig {
  name: string;
  description?: string;
  image?: string;
  demoUrl?: string;
  repo?: string;
  [key: string]: any; // Para cualquier otra propiedad extra
}

export async function fetchProjectsFromGitHub(username: string): Promise<ProjectConfig[]> {
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
            // Si no hay config, usar info básica del repo
            return {
              name: repo.name,
              description: repo.description,
              repo: repo.html_url,
              // Puedes agregar otros campos si quieres
            };
          }

          const config = await configRes.json();
          return {
            ...config,
            repo: repo.html_url,
          };
        } catch (error) {
          // Si falla al obtener config, usar info básica
          return {
            name: repo.name,
            description: repo.description,
            repo: repo.html_url,
          };
        }
      })
    );

    // Filtrar nulos o proyectos inválidos (por si algo raro)
    return projects.filter(Boolean);
  } catch (error) {
    console.error('Error in fetchProjectsFromGitHub:', error);
    return [];
  }
}
