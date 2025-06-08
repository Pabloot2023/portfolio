import ProjectCard from '@/components/ProjectCard';
import { fetchProjectsFromGitHub, ProjectConfig } from '@/utils/github';
import { GetStaticProps } from 'next';
import Head from 'next/head';

interface HomeProps {
  projects: ProjectConfig[];
}

export default function Home({ projects }: HomeProps) {
  return (
    <>
      <Head>
        <title>Portafolio de Andrés</title>
      </Head>
      <main className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-4xl font-bold mb-6 text-center">Mis Proyectos</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length === 0 && (
            <p className="text-center col-span-full">No se encontraron proyectos.</p>
          )}
          {projects.map((project) => (
            <ProjectCard key={project.repo} project={project} />
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const projects = await fetchProjectsFromGitHub('Pabloot2023');
  return {
    props: { projects },
    revalidate: 3600, // Rebuild cada hora
  };
};
