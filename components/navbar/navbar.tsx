'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
    Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Avatar, Tooltip
} from "@heroui/react";
import { HomeIcon, AddIcon, ProfileIcon, DatabaseIcon, NotificationIcon } from "../icons/page";
import { logoutUser } from '@/services/auth';

export const NavigationBar = ({ isAuthPage = true }) => {
    const currentRoute = usePathname()
    const router = useRouter();

    const handleLogOut = () => {
        logoutUser();
        router.replace("/login");
    }
    return isAuthPage ? (
        <Navbar isBlurred isBordered maxWidth="full" height="5rem">
            <NavbarBrand>
                <p className="brand-text">TaskLink</p>
            </NavbarBrand>
            <NavbarContent justify="end">
                <NavbarItem>
                    <Button as={Link} color="primary" href="login" className="gradient-button">
                        Login
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    ) : (
        <Navbar isBordered maxWidth="full" classNames={{
            item: [
                "flex",
                "relative",
                "h-full",
                "items-center",
                "data-[active=true]:after:content-['']",
                "data-[active=true]:after:absolute",
                "data-[active=true]:after:bottom-0",
                "data-[active=true]:after:left-0",
                "data-[active=true]:after:right-0",
                "data-[active=true]:after:h-[2px]",
                "data-[active=true]:after:rounded-[2px]",
                "data-[active=true]:after:bg-primary",
            ],
        }}
        >
            <NavbarBrand>
                <p className="brand-text">TaskLink</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem className="w-32 flex justify-center" isActive={currentRoute === '/profile'}>
                    <Tooltip
                        content={
                            <div className="px-1 py-2">
                                <div className="text-md">Profile</div>
                            </div>
                        }
                        delay={0}
                        closeDelay={0}
                        offset={25}
                    >
                        <Link href="profile">
                            <ProfileIcon />
                        </Link>
                    </Tooltip>
                </NavbarItem>
                {/* <NavbarItem className="w-32 flex justify-center" isActive={currentRoute === '/dashboard'}>
                    <Tooltip className="dark"
                        content={
                            <div className="px-1 py-2">
                                <div className="text-md">Dashboard</div>
                            </div>
                        }
                        delay={0}
                        closeDelay={0}
                        offset={25}
                    >
                        <Link href="dashboard">
                            <HomeIcon />
                        </Link>
                    </Tooltip>
                </NavbarItem> */}
                <NavbarItem className="w-32 flex justify-center" isActive={currentRoute === '/database'}>
                    <Tooltip
                        content={
                            <div className="px-1 py-2">
                                <div className="text-md">Database</div>
                            </div>
                        }
                        delay={0}
                        closeDelay={0}
                        offset={25}
                    >
                        <Link href="database">
                            <DatabaseIcon />
                        </Link>
                    </Tooltip>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent className="hidden sm:flex gap-8" justify="end">
                <NavbarItem>
                    <Tooltip
                        content={
                            <div className="px-1 py-2">
                                <div className="text-md">Add email</div>
                            </div>
                        }
                        delay={0}
                        closeDelay={0}
                        offset={25}
                    >
                        <Link href="/add_email">
                            <AddIcon />
                        </Link>
                    </Tooltip>
                </NavbarItem>
                <NavbarItem>
                    <Tooltip
                        content={
                            <div className="px-1 py-2">
                                <div className="text-md">Notification</div>
                            </div>
                        }
                        delay={0}
                        closeDelay={0}
                        offset={25}
                    >
                        <Link href="#">
                            <NotificationIcon />
                        </Link>
                    </Tooltip>
                </NavbarItem>
                <NavbarItem>
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as="button"
                                className="transition-transform"
                                color="secondary"
                                name="Jason Hughes"
                                size="md"
                                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                            />
                        </DropdownTrigger>
                        <DropdownMenu variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-8" href="profile">
                                <p className="font-semibold" >Signed in as</p>
                                <p className="font-semibold">trongdatvuong@gmail.com</p>
                            </DropdownItem>
                            <DropdownItem key="settings">Settings</DropdownItem>
                            <DropdownItem key="logout" color="danger" onPress={handleLogOut}>
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarItem>
            </NavbarContent>
        </Navbar>

    );
}