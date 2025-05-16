import { NavDesktop } from "./nav-desktop";
import { NavMobile } from "./nav-mobile";

export function Navbar() {
  return (
    <div className="h-20">
      <nav aria-label="Main navigation">
        <NavDesktop />
        <NavMobile />
      </nav>
    </div>
  );
}
