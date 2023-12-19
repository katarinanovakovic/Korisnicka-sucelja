import { cn } from "@/lib/utils";

type IconSize = {
  width?: number;
  height?: number;
};

const LogoIcon = ({ width = 42, height = 42 }: IconSize) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 226 226"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M132.198 221.586H92.4717V183.625H132.198V221.586ZM105.714 212.758H118.956V196.867H105.714V212.758Z"
        fill="#8B8992"
      />
      <path
        d="M112.997 196.867H118.956V212.758H112.997V221.586H132.198V183.625H112.997V196.867Z"
        fill="#57555C"
      />
      <path
        d="M212.093 165.969H13.9014V60.0312H212.093V165.969Z"
        fill="#6366F1"
      />
      <path
        d="M212.091 60.0312H112.996V165.969H212.091V60.0312Z"
        fill="#818CF8"
      />
      <path d="M145.439 212.758H79.228V226H145.439V212.758Z" fill="#4F46E5" />
      <path
        d="M105.714 165.969H65.9873V75.4805H105.714V165.969Z"
        fill="#B87FD9"
      />
      <path
        d="M105.714 165.969H85.8506V75.4805H105.714V165.969Z"
        fill="#8034AD"
      />
      <path
        d="M127.869 57.8242H43.3909L26.2153 0H51.4827C60.5047 0 71.0053 3.22845 79.2295 9.04971V0H145.045L127.869 57.8242Z"
        fill="#8B8992"
      />
      <path d="M145.044 0H85.6299V57.8242H127.869L145.044 0Z" fill="#57555C" />
      <path
        d="M109.687 88.7227H62.0146C51.062 88.7227 42.1514 79.812 42.1514 68.8594V44.582H129.55V68.8594C129.55 79.812 120.639 88.7227 109.687 88.7227Z"
        fill="#E3CEF0"
      />
      <path
        d="M85.8506 44.582V88.7227H109.687C120.639 88.7227 129.55 79.812 129.55 68.8594V44.582H85.8506Z"
        fill="#D5B4E8"
      />
      <path
        d="M188.792 52.2387C184.761 52.2387 180.784 51.182 177.2 49.1126C171.82 46.006 167.971 40.9903 166.363 34.989C164.755 28.988 165.58 22.7201 168.687 17.3398C171.793 11.9595 176.809 8.11085 182.81 6.50281L205.277 0.48291L211.297 22.9496C212.905 28.9505 212.08 35.2185 208.973 40.5988C205.866 45.9791 200.851 49.8282 194.85 51.4358C192.846 51.973 190.812 52.2387 188.792 52.2387Z"
        fill="#E0E0E2"
      />
      <path
        d="M211.296 22.9496L205.276 0.48291H205.276L177.2 49.1122C180.784 51.1815 184.761 52.2387 188.791 52.2382C190.812 52.2382 192.846 51.9725 194.849 51.4358C200.85 49.8277 205.866 45.9791 208.973 40.5988C212.079 35.2185 212.904 28.9505 211.296 22.9496Z"
        fill="#ACABB1"
      />
      <path
        d="M123.998 180.988L89.5938 161.124L144.77 65.5572L179.174 85.4205L123.998 180.988Z"
        fill="#FFE477"
      />
      <path
        d="M106.795 171.055L123.996 180.986L179.171 85.4236L161.97 75.4922L106.795 171.055Z"
        fill="#FFA733"
      />
      <path
        d="M177.649 99.8315L133.051 74.083L171.484 30.5215L196.158 44.767L177.649 99.8315Z"
        fill="#FF9A00"
      />
      <path
        d="M196.158 44.767L183.821 37.6445L155.35 86.9571L177.649 99.8316L196.158 44.767Z"
        fill="#E67500"
      />
      <path
        d="M212.093 196.867H13.9014V152.727H212.093V196.867Z"
        fill="#4F46E5"
      />
      <path
        d="M212.091 152.727H112.996V196.867H212.091V152.727Z"
        fill="#312E81"
      />
      <path d="M145.439 212.758H112.333V226H145.439V212.758Z" fill="#312E81" />
    </svg>
  );
};

const Logo = ({ dark = false }) => (
  <div className="flex items-center justify-between max-w-min gap-2">
    <LogoIcon />
    <span
      className={cn(
        "font-roboto-condensed font-bold text-3xl whitespace-nowrap",
        { "text-brand-purple-900": !dark, "text-brand-purple-200": dark }
      )}
    >
      design matters.
    </span>
  </div>
);

export default Logo;
