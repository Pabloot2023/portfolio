import type { Project } from './types';

export async function fetchProjectsFromGitHub(username: string): Promise<Project[]> {
  // Función para intentar traer el config desde main o master
  async function fetchConfig(repoName: string): Promise<any | null> {
    const branches = ['main', 'master'];
    for (const branch of branches) {
      try {
        const res = await fetch(
          `https://raw.githubusercontent.com/${username}/${repoName}/${branch}/project.config.json`
        );
        if (res.ok) {
          return await res.json();
        }
      } catch (e) {
        // ignora error y prueba siguiente rama
      }
    }
    return null; // no encontró config en ninguna rama
  }

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
          const config = await fetchConfig(repo.name);

          if (!config) {
            // No hay config, usamos info básica
            const project: Project = {
              title: repo.name,
              description: repo.description || '',
              tech: [],
              demo: '',
              repo: repo.html_url,
            };

            // Forzar demo para portfolio-andres y cocinero si demo está vacío
            if (project.title.toLowerCase() === 'portfolio-andres' && !project.demo) {
              project.demo = 'https://portfolio-andres-ecru.vercel.app/';
            }
            if (project.title.toLowerCase() === 'cocinero' && !project.demo) {
              project.demo = 'https://cocinero.vercel.app/';
            }

            return project;
          }

          const project: Project = {
            title: config.title || repo.name,
            description: config.description || '',
            tech: Array.isArray(config.tech) ? config.tech : [],
            demo: config.demo || '',
            repo: repo.html_url,
          };

          // Forzar demo para portfolio-andres y cocinero si demo está vacío
          if (project.title.toLowerCase() === 'portfolio-andres' && !project.demo) {
            project.demo = 'https://portfolio-andres-ecru.vercel.app/';
          }
          if (project.title.toLowerCase() === 'cocinero' && !project.demo) {
            project.demo = 'https://cocinero.vercel.app/';
          }

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

          // Forzar demo para portfolio-andres y cocinero si demo está vacío
          if (project.title.toLowerCase() === 'portfolio-andres' && !project.demo) {
            project.demo = 'https://portfolio-andres-ecru.vercel.app/';
          }
          if (project.title.toLowerCase() === 'cocinero' && !project.demo) {
            project.demo = 'https://cocinero.vercel.app/';
          }

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
