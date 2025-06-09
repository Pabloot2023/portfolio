import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

export default function ProjectsGrid({ projects }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-6">
      {projects.map(({ repo, title, description, tech, demoUrl }) => (
        <div
          key={repo}
          className="
            bg-white dark:bg-gray-800 rounded-xl shadow-md
            hover:shadow-xl transform hover:scale-105
            transition-transform duration-300 ease-in-out
            flex flex-col justify-between p-6
          "
        >
          <div>
            <h3 className="text-2xl font-semibold mb-3 text-red-600">
  {title}
</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6 line-clamp-2">
              {description || 'Sin descripción'}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            {tech.map((t) => (
              <span
                key={t}
                className="
                  bg-blue-100 dark:bg-blue-900
                  text-blue-800 dark:text-blue-300
                  text-xs font-semibold px-3 py-1 rounded-full
                  select-none
                "
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex gap-6">
            <a
              href={`https://github.com/Pabloot2023/${repo}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${title} GitHub repository`}
              className="
                text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white
                transition-colors duration-200
              "
            >
              <FaGithub size={28} />
            </a>
            {demoUrl && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title} Live demo`}
                className="
                  text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white
                  transition-colors duration-200
                "
              >
                <FaExternalLinkAlt size={28} />
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
