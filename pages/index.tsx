import ProjectsList from '@/components/ProjectsList';
import { fetchProjectsFromGitHub } from '@/utils/github';
import type { Project } from '@/utils/types';
import { GetStaticProps } from 'next';
import Head from 'next/head';

interface HomeProps {
  projects: Project[];
}

// Validación sencilla para asegurar que el objeto cumple el tipo Project
function isProject(obj: any): obj is Project {
  return (
    obj &&
    typeof obj.title === 'string' &&
    typeof obj.repo === 'string' &&
    Array.isArray(obj.tech) &&
    obj.tech.every((t: any) => typeof t === 'string')
  );
}

export default function Home({ projects }: HomeProps) {
  return (
    <>
      <Head>
        <title>Portafolio de Andrés</title>
      </Head>
      <main className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white py-8 px-4">
        <h1 className="main-title">PORTFOLIO</h1>

        {projects.length === 0 ? (
          <p className="text-center text-lg">No se encontraron proyectos.</p>
        ) : (
          <ProjectsList projects={projects} />
        )}
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const rawProjects = await fetchProjectsFromGitHub('Pabloot2023');

  // Filtra sólo los proyectos que cumplen la validación
  const projects: Project[] = rawProjects.filter(isProject);

  return {
    props: { projects },
    revalidate: 3600, // Rebuild cada hora
  };
};
