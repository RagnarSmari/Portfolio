import HologramSidebar from "@/components/HologramSidebar/hologram-sidebar";
import HologramContent from "@/components/HologramContent/hologram-content";

export default function Projects() {
    return (
        <div className="hologram-container">
            <div className="grid grid-cols-[25%_75%] gap-0 h-full">
                <HologramSidebar/>
                <HologramContent/>
            </div>
        </div>
    )
}

