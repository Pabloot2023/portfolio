import ProjectCard from './ProjectCard';

interface Project {
  title: string;
  description?: string;
  tech: string[];
  demo?: string;
  repo: string;
}

interface ProjectsListProps {
  projects: Project[];
}

export default function ProjectsList({ projects }: ProjectsListProps) {
  return (
    <section className="projects-grid">
      {projects.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </section>
  );
}
