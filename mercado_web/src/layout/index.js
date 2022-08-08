import dynamic from "next/dynamic";

const MainLayout = dynamic(() => import('./MainLayout'));

export { MainLayout };
