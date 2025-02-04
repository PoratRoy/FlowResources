import SessionStorage, { SKey } from "@/lib/sessionStorage";
import { Category } from "@/models/types/category";
import { Project } from "@/models/types/project";
import { Website } from "@/models/types/website";

export const sessionProjects: Project[] = SessionStorage.get(SKey.Projects);
export const sessionCategories: Category[] = SessionStorage.get(SKey.Categories);
export const sessionWebsites: Website[] = SessionStorage.get(SKey.Websites);

export const getSessionData = () => {
    return { sessionProjects, sessionCategories, sessionWebsites}
}

export const setSessionProjects = (projects: Project[]) => SessionStorage.set(SKey.Projects, projects);
export const setSessionCategories = (categories: Category[]) => SessionStorage.set(SKey.Categories, categories);
export const setSessionWebsites = (websites: Website[]) => SessionStorage.set(SKey.Websites, websites);