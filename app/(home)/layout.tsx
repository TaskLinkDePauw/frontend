import { NavigationBar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { SubNavigationBar } from "@/components/subnavbar";
import { Button } from "@heroui/react";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div
            style={{
                display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw'
            }}
        >
            <div className="w-full h-auto">
                <NavigationBar isAuthPage={false} />
            </div>
            <div className="w-full px-8 pb-4 bg-[#f5f5f5]">
                <SubNavigationBar />
            </div>
            <div
                style={{
                    display: 'flex', flexDirection: 'row', height: '100vh', width: '100vw', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: '#f5f5f5'
                }}
            >
                {children}
            </div>
        </div >
    );
}