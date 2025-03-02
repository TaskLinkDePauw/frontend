'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
    Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Avatar, Tooltip,
    Progress
} from "@heroui/react";
import { HomeIcon, AddIcon, ProfileIcon, DatabaseIcon, NotificationIcon, MessageIcon } from "./icons/page";
import { logoutUser } from '@/services/auth';

export const ProgressNavigationBar = ({ stage }: { stage: 1 | 2 | 3 | 4 }) => {
    const currentRoute = usePathname()
    const router = useRouter();

    const progressTitle = (stage: 1 | 2 | 3 | 4) => {
        switch (stage) {
            case 1:
                return "1. Describe your post";
            case 2:
                return "2. Browse Suppliers and prices";
            case 3:
                return "3. Choose date & time";
            case 4:
                return "4. Review & Pay";
            default:
                return "Loading...";
        }
    }
    const progressValue = (stage: 1 | 2 | 3 | 4) => {
        switch (stage) {
            case 1:
                return 25;
            case 2:
                return 50;
            case 3:
                return 75;
            case 4:
                return 100;
            default:
                return 100;
        }
    }

    const handleLogOut = () => {
        logoutUser();
        router.replace("/login");
    }
    return (
        <Navbar isBlurred={false} maxWidth="full" position='sticky'
            className="px-28 bg-white"
        >
            <NavbarBrand className='max-w-40'>
                <p className="brand-text">TaskLink</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex w-full justify-center">
                <Progress
                    aria-label="Downloading..."
                    className="max-w-full pr-16"
                    color="success"
                    size="sm"
                    radius='sm'
                    label={progressTitle(stage)}
                    value={progressValue(stage)}
                    classNames={{
                        track: "drop-shadow-md border border-default",
                        indicator: "gradient-color",
                        label: "font-medium text-default-600",
                    }}
                />
            </NavbarContent>
        </Navbar>

    );
}