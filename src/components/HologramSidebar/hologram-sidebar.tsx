import {Project, projects} from "@/data/projects";

export default function HologramSidebar() {
    return (
        <div className="h-full grid grid-cols-1 gap-0 overflow-auto" style={{ borderRight: "1px solid #00ffff" }}>
            {projects.map((Project, index) => (
                <HologramSidebarItem key={index} Project={Project} />
            ))}
        </div>
    );
}

function HologramSidebarItem({ Project }: { Project: Project }) {
    return (
        <div className="flex items-center justify-center text-center border-b border-t border-cyan-400 h-16 text-sm m-0 p-0">
            <h3>{Project.Name}</h3> {/* Use "name" (lowercase) since that's how projects are defined */}
        </div>
    );
}