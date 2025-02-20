import { NavigationBar } from "@/components/navbar/navbar";

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
            <div className="w-full h-20">
                <NavigationBar />
            </div>
            <div
                style={{
                    display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', alignItems: 'center', justifyContent: 'center'
                }}
            >{children}</div>
        </div >
    );
}