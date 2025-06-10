interface Project {
  title: string;
  description?: string;
  tech: string[];
  demo?: string;
  repo: string;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="project-card">
      <div>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">
          {project.description || 'Sin descripción'}
        </p>
      </div>

      <div className="tech-stack">
        {project.tech.map((tech) => (
          <span key={tech} className="tech-tag">
            {tech}
          </span>
        ))}
      </div>

      <div className="project-links">
        <a
          href={`https://github.com/Pabloot2023/${project.repo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn"
        >
          Ver Repo
        </a>
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            Ver Demo
          </a>
        )}
      </div>
    </div>
  );
}
