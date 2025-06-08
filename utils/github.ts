export async function fetchProjectsFromGitHub(username: string) {
  const res = await fetch(`https://api.github.com/users/${username}/repos`);
  const repos = await res.json();

  const projects = await Promise.all(
    repos.map(async (repo: any) => {
      try {
        const configRes = await fetch(
          `https://raw.githubusercontent.com/${username}/${repo.name}/main/project.config.json`
        );
        if (!configRes.ok) return null;

        const config = await configRes.json();
        return {
          ...config,
          repo: repo.html_url,
        };
      } catch {
        return null;
      }
    })
  );

  return projects.filter(Boolean);
}
