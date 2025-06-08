// utils/types.ts

export interface ProjectConfig {
  title: string;
  description: string;
  tech: string[];
  demo?: string;
}

export interface Project extends ProjectConfig {
  repo: string;  // URL del repositorio GitHub
}
