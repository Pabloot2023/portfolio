import { GetStaticProps } from 'next';
import Head from 'next/head';
import ProjectCard from '@/components/ProjectCard';
import { fetchProjectsFromGitHub } from '@/utils/github';

export default function Home({ projects }: { projects: any[] }) {
  return (
    <>
      <Head>
        <title>Portafolio de Andrés</title>
      </Head>
      <main className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-4xl font-bold mb-6 text-center">Mis Proyectos</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.repo} project={project} />
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const projects = await fetchProjectsFromGitHub('Pabloot2023');
  return {
    props: { projects },
    revalidate: 3600,
  };
};
