export default function ProjectCard({ project }: { project: any }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
      <p className="text-gray-600 mb-2">{project.description}</p>
      <div className="flex flex-wrap gap-1 mb-3">
        {project.tech.map((t: string) => (
          <span key={t} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
            {t}
          </span>
        ))}
      </div>
      <div className="flex gap-3">
        <a href={project.demo} target="_blank" className="text-blue-500 hover:underline">
          Demo
        </a>
        <a href={project.repo} target="_blank" className="text-gray-500 hover:underline">
          Código
        </a>
      </div>
    </div>
  );
}
