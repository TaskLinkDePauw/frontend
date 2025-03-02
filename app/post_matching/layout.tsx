'use client';

import { ProgressNavigationBar } from "@/components/progress_navbar";
import { usePathname } from 'next/navigation';

export default function PostMatchingLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const getStageFromUrl = () => {
        const currentRoute = usePathname()
        if (currentRoute.includes("create_post")) {
            return 1;
        } else if (currentRoute.includes("recommendation")) {
            return 2;
        } else if (currentRoute.includes("choose_date")) {
            return 3;
        } else {
            return 4;
        }
    }
    return (
        <div
            style={{
                display: 'flex', flexDirection: 'column', width: '100%'
            }}
        >
            <div className="w-full h-20">
                <ProgressNavigationBar stage={getStageFromUrl()} />
            </div>
            <div
                style={{
                    display: 'flex', flexDirection: 'column', height: 'auto', width: 'auto', paddingBottom: '20px', paddingRight: '20px', paddingLeft: '20px'
                }}
            >{children}</div>
        </div >
    );
}