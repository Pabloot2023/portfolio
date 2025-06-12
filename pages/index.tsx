'use client';

import ProjectsList from '@/components/ProjectsList';
import ThemeToggle from '@/components/ThemeToggle';
import { fetchProjectsFromGitHub } from '@/utils/github';
import type { Project } from '@/utils/types';
import Head from 'next/head';
import { useEffect, useState } from 'react';

interface HomeProps {
  projects?: Project[];
}

export default function Home({ projects = [] }: HomeProps) {
  const [search, setSearch] = useState('');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [isClientLoaded, setIsClientLoaded] = useState(false);

  useEffect(() => {
    setIsClientLoaded(true);
  }, []);

  useEffect(() => {
    const searchTerm = search.toLowerCase();
    const results = projects.filter((project) => {
      const inTitle = project.title.toLowerCase().includes(searchTerm);
      const inTech = project.tech.some((tech) =>
        tech.toLowerCase().includes(searchTerm)
      );
      return inTitle || inTech;
    });
    setFilteredProjects(results);
  }, [search, projects]);

  return (
    <>
      <Head>
        <title>Portafolio de Andrés</title>
      </Head>

      {/* Botón de cambio de tema */}
      <div className="theme-toggle-container">
        <ThemeToggle />
      </div>

      <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] py-8 px-4 transition-colors duration-200">
        <h1 className="main-title">PORTFOLIO</h1>

        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar proyectos por título o tecnología"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        {isClientLoaded && filteredProjects.length === 0 ? (
          <p className="text-center text-lg">No se encontraron proyectos.</p>
        ) : (
          <ProjectsList projects={filteredProjects} />
        )}
      </main>
    </>
  );
}

// ⬇️ Carga estática desde GitHub
export async function getStaticProps() {
  const projects = await fetchProjectsFromGitHub('Pabloot2023');

  return {
    props: {
      projects,
    },
    revalidate: 3600, // Revalida cada hora
  };
}