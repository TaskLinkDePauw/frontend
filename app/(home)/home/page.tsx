'use client';

import { Listbox, ListboxItem, Input, Card, CardHeader, CardBody, Avatar, Divider, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Accordion, AccordionItem, Button, useDisclosure, Chip, CardFooter, User } from "@heroui/react";
import { EditIcon, WrenchIcon, PaintIcon, ThreeDotVerticleIcon, ClockIcon, StickIcon, ImageIcon, VideoIcon, AIIdeaIcon, WarningIcon } from "@/components/icons/page";
import { useState, useCallback } from "react";

import { CarIcon } from "@/components/icons/car-icon";
import { useRouter } from 'next/navigation';
import { PostFeed } from "@/components/post_feed";

type ProfileProps = {
    profile_name: string | undefined;
    full_name: string | undefined;
    job_title: string | undefined;
    email: string | undefined;
    phone: string | undefined;
    avatar_url: string | undefined;
    linkedIn: string | undefined;
} | undefined;

type ResumeProps = {
    resume_public_id: string | undefined;
    resume_title: string | undefined;
    resume_pdf_url: string | undefined;
} | undefined;

const initialSkills = ["C++", "React", "NextJS", "mongoDB"];

export default function HomePage() {
    const router = useRouter();

    const handleCreatePost = useCallback(
        async () => {
            try {
                // Simulate saving post content
                await new Promise((resolve) => setTimeout(resolve, 1000));
                // Redirect to recommendation page
                router.replace('post_matching/create_post');
            } catch (error) {
                console.error("Failed to save post content", error);
            } finally {
            }
        },
        []
    );

    const [profileInfo, setProfileInfo] = useState<ProfileProps>(
        {
            profile_name: "Dat Vuong",
            full_name: "Dat Trong Vuong",
            job_title: "Software Engineer",
            email: "trongdatvuong@gmail.com",
            phone: "765-712-2967",
            avatar_url: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
            linkedIn: "https://www.linkedin.com/in/dat-vuong/",
        }
    );

    const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());

    interface Service {
        id: number;
        name: string;
        items: string[];
        icon: JSX.Element;
    }
    const recommendedServices: Service[] = [
        {
            id: 1,
            name: "Assembly",
            items: ["IKEA Assembly", "Pax Assembly"],
            icon: <WrenchIcon height={24} width={24} />,
        },
        {
            id: 2,
            name: "Paint",
            items: ["Interior Painting", "Exterior Painting", "Wall Painting"],
            icon: <PaintIcon height={24} width={24} />,
        },
        {
            id: 3,
            name: "Ride",
            items: ["Airport", "Walmart", "Kroger"],
            icon: <CarIcon height={24} width={24} />,
        },
    ];

    interface FilterKey {
        key: string;
        title: string;
        color: 'warning' | 'danger' | 'default' | 'primary' | 'secondary' | 'success';
        // Removed icon property from FilterKey type
        icon: JSX.Element;
    }
    const filterKeys: FilterKey[] = [
        {
            key: "Accepted",
            title: "Accepted",
            color: "success",
            icon: <StickIcon height={20} width={20} color="#69CE73" />
        },
        {
            key: "Pending",
            title: "Pending",
            color: 'warning',
            icon: <ClockIcon height={20} width={20} color="#F5A571" />
        },
        {
            key: "Expired",
            title: "Expired",
            color: 'danger',
            icon: <WarningIcon height={20} width={20} color="#F31260" />
        },
    ]
    return (
        <div className="h-full flex-row flex gap-4 justify-center px-8">
            {/* Left side - Suggestion and Filter */}
            <div className="w-1/6 flex flex-col gap-4">
                <Card className=" px-8 py-16 flex-col justify-center items-center gradient-button ">
                    <CardHeader className="px-0 justify-end">
                        <Button isIconOnly aria-label="Edit" variant="light">
                            <EditIcon height={20} width={20} />
                        </Button>
                    </CardHeader>
                    <div className="pb-4">
                        <Avatar
                            className="w-30 h-30"
                            name="Jason Hughes"
                            src={profileInfo?.avatar_url}
                        />
                    </div>
                    <p className="font-bold text-xl">{profileInfo?.profile_name}</p>
                    <p className="text-sm">{profileInfo?.job_title}</p>
                </Card>
                <Card className="flex-col justify-center">
                    <CardHeader className="px-4 flex-row justify-between" >
                        <p className="text-lg feed-title-text">Suggestion</p>
                        <ThreeDotVerticleIcon height={20} width={20} />
                    </CardHeader>
                    <Divider />
                    <CardBody className="p-0 h-auto">
                        <Accordion className="m-0 p-0 h-auto" showDivider={false} variant="light">
                            {recommendedServices.map((service) => (
                                <AccordionItem className="pl-4 pr-5 py-0 m-0 text-md" key={service.id} startContent={service.icon} title={<span className="p-0 m-0 text-sm text-default-600">{service.name}</span>}>
                                    {service.items.map((item) => (
                                        <Button key={item} variant="bordered" radius="full" className="text-sm m-1">{item}</Button>
                                    ))}
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardBody>
                </Card>
                <Card className="flex-col justify-center h-auto">
                    <CardHeader className="px-4 flex-row justify-between" >
                        <p className="text-lg feed-title-text">Filter</p>
                        <ThreeDotVerticleIcon height={20} width={20} />
                    </CardHeader>
                    <Divider />
                    <CardBody className="w-full p-0">
                        <Listbox
                            className="w-full p-0 m-0"
                            aria-label="Multiple selection example"
                            selectedKeys={selectedKeys}
                            selectionMode="multiple"
                            variant="flat"
                            onSelectionChange={(keys) => setSelectedKeys(new Set(keys as unknown as string[]))}>
                            {filterKeys.map((filter) => (
                                <ListboxItem startContent={filter.icon} className="pl-4 pr-5 py-3 text-md" key={filter.key} color={filter.color}>
                                    <span className={`text-md text-default-600`}>{filter.title}</span>
                                </ListboxItem>
                            ))}
                        </Listbox>
                    </CardBody>
                </Card>
            </div>
            {/* Middle side - Post and Feed Content */}
            <div className="w-1/2 flex flex-col gap-4">
                <Card className="flex-col justify-center">
                    <CardBody className="px-4 flex flex-row gap-4">
                        <Avatar
                            radius="full"
                            size="md"
                            src="https://heroui.com/avatars/avatar-1.png"
                        />
                        <Button onPress={handleCreatePost} className="h-full justify-start text-default-400" radius="full" variant="bordered" fullWidth aria-label="Edit" size='lg'>
                            Start a Post
                        </Button>
                    </CardBody>
                    <Divider />
                    <CardFooter className="flex-row justify-between px-20 py-2 m-0">
                        <Button className="p-1 m-0" variant="light" color="primary" aria-label="Edit" size='lg'>
                            <ImageIcon height={20} width={20} color='#378FE9' />
                            Photo
                        </Button>
                        <Button className="p-1 m-0" variant="light" color="success" aria-label="Edit" size='lg'>
                            <VideoIcon height={20} width={20} color='#5F9B41' />
                            Video
                        </Button>
                        <Button className="p-1 m-0" variant="light" color="warning" aria-label="Edit" size='lg'>
                            <AIIdeaIcon height={20} width={20} color='#E06847' />
                            AI Generation
                        </Button>
                    </CardFooter>
                </Card>
                {/* Post Content */}
                <PostFeed post={
                    {
                        id: "1",
                        user: {
                            name: "Zoey Lang",
                            avatarUrl: "https://heroui.com/avatars/avatar-1.png",
                        },
                        date: "Feb 28 at 8:54 AM",
                        status: "Active",
                        description: "Finding a reliable and efficient cleaning service can be a daunting task, especially with the plethora of options available in the market. Whether you are looking for a one-time deep clean or a regular maintenance service, it is crucial to find a service provider that meets your specific needs and standards. A good cleaning service should offer a range of services, including dusting, vacuuming, mopping, and sanitizing various areas of your home or office. Additionally, they should use eco-friendly cleaning products and have a team of trained and trustworthy professionals. When searching for a cleaning service, it is advisable to read reviews, ask for recommendations, and check their credentials and insurance. A reputable cleaning service will also provide a detailed quote and be transparent about their pricing and policies. By taking the time to research and choose the right cleaning service, you can ensure a clean and healthy environment for yourself and your loved ones, giving you peace of mind and more time to focus on other important tasks.",
                        offers: 10,
                        views: 100,
                    }
                } />
                <PostFeed post={
                    {
                        id: "2",
                        user: {
                            name: "Zoey Lang",
                            avatarUrl: "https://heroui.com/avatars/avatar-1.png",
                        },
                        date: "Feb 28 at 8:54 AM",
                        status: "Active",
                        description: "Finding a reliable and efficient cleaning service can be a daunting task, especially with the plethora of options available in the market. Whether you are looking for a one-time deep clean or a regular maintenance service, it is crucial to find a service provider that meets your specific needs and standards. A good cleaning service should offer a range of services, including dusting, vacuuming, mopping, and sanitizing various areas of your home or office. Additionally, they should use eco-friendly cleaning products and have a team of trained and trustworthy professionals. When searching for a cleaning service, it is advisable to read reviews, ask for recommendations, and check their credentials and insurance. A reputable cleaning service will also provide a detailed quote and be transparent about their pricing and policies. By taking the time to research and choose the right cleaning service, you can ensure a clean and healthy environment for yourself and your loved ones, giving you peace of mind and more time to focus on other important tasks.",
                        offers: 10,
                        views: 100,
                    }
                } />
                <PostFeed post={
                    {
                        id: "3",
                        user: {
                            name: "Zoey Lang",
                            avatarUrl: "https://heroui.com/avatars/avatar-1.png",
                        },
                        date: "Feb 28 at 8:54 AM",
                        status: "Active",
                        description: "Finding a reliable and efficient cleaning service can be a daunting task, especially with the plethora of options available in the market. Whether you are looking for a one-time deep clean or a regular maintenance service, it is crucial to find a service provider that meets your specific needs and standards. A good cleaning service should offer a range of services, including dusting, vacuuming, mopping, and sanitizing various areas of your home or office. Additionally, they should use eco-friendly cleaning products and have a team of trained and trustworthy professionals. When searching for a cleaning service, it is advisable to read reviews, ask for recommendations, and check their credentials and insurance. A reputable cleaning service will also provide a detailed quote and be transparent about their pricing and policies. By taking the time to research and choose the right cleaning service, you can ensure a clean and healthy environment for yourself and your loved ones, giving you peace of mind and more time to focus on other important tasks.",
                        offers: 10,
                        views: 100,
                    }
                } />

            </div>
            {/* Right side - Message and Contact */}
            <div className="w-1/5 flex flex-col gap-4">
                <Card className="flex-col justify-center h-auto">
                    <CardHeader className="px-4 flex-row justify-between" >
                        <p className="text-lg feed-title-text">Contact</p>
                        <ThreeDotVerticleIcon height={20} width={20} />
                    </CardHeader>
                    <Divider />
                    <CardBody className="flex flex-col w-full p-0">
                        <Button className="justify-start px-4 py-8 text-default-600" variant="light">
                            <User
                                avatarProps={{
                                    src: "https://avatars.githubusercontent.com/u/30373425?v=4",
                                }}
                                name="Junior Garcia"
                            />
                        </Button>
                        <Button className="justify-start px-4 py-8 text-default-600" variant="light">
                            <User
                                avatarProps={{
                                    src: "https://avatars.githubusercontent.com/u/30373425?v=4",
                                }}
                                name="Junior Garcia"
                            />
                        </Button>
                        <Button className="justify-start px-4 py-8 text-default-600" variant="light">
                            <User
                                avatarProps={{
                                    src: "https://avatars.githubusercontent.com/u/30373425?v=4",
                                }}
                                name="Junior Garcia"
                            />
                        </Button>
                        <Button className="justify-start px-4 py-8 text-default-600" variant="light">
                            <User
                                avatarProps={{
                                    src: "https://avatars.githubusercontent.com/u/30373425?v=4",
                                }}
                                name="Junior Garcia"
                            />
                        </Button>
                        <Button className="justify-start px-4 py-8 text-default-600" variant="light">
                            <User
                                avatarProps={{
                                    src: "https://avatars.githubusercontent.com/u/30373425?v=4",
                                }}
                                name="Junior Garcia"
                            />
                        </Button>
                        <Button className="justify-start px-4 py-8 text-default-600" variant="light">
                            <User
                                avatarProps={{
                                    src: "https://avatars.githubusercontent.com/u/30373425?v=4",
                                }}
                                name="Junior Garcia"
                            />
                        </Button>
                        <Button className="justify-start px-4 py-8 text-default-600" variant="light">
                            <User
                                avatarProps={{
                                    src: "https://avatars.githubusercontent.com/u/30373425?v=4",
                                }}
                                name="Junior Garcia"
                            />
                        </Button>
                    </CardBody>
                </Card>
            </div>
        </div >
    );
}