"use client";

import React, { useState, useCallback } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Button,
    Progress,
    Avatar,
    Badge,
    useDisclosure,
    Textarea, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
} from "@heroui/react";
import { toast } from "react-hot-toast";
import { PostGrid } from "@/components/post_grid";
import { AddIcon } from "@/components/icons/add-icon";
import { TrashIcon } from "@/components/icons/trash-icon";
import { CreatePostModal } from "@/components/create_post_modal";
import { useRouter } from "next/navigation";

export default function Post() {
    // Mock data for demonstration
    const createPostModal = useDisclosure();
    const router = useRouter();

    const [isProcessing, setIsProcessing] = useState(false);
    const [postTitle, setPostTitle] = useState("");
    const [postContent, setPostContent] = useState("");
    const handleSave = useCallback(
        async () => {
            setIsProcessing(true);
            const postData = {}
            if (postData) {
                console.log("Email saved successfully");
                toast.success("Email saved successfully");
                router.replace("/database");
            } else {
                console.error("Error saving email");
                toast.error("Error saving email");
            }
            setIsProcessing(false);

        },
        [postTitle, postContent]
    );
    const [stats] = useState([
        { label: "In Progress", value: 45 },
        { label: "Upcoming", value: 24 },
        { label: "Total Projects", value: 62 },
    ]);

    const handleCreatePost = useCallback(() => {
        createPostModal.onOpen();

    }, [createPostModal]);

    const [posts] = useState([
        {
            id: "1",
            date: "December 10, 2020",
            title: "Web Designing",
            subtitle: "Prototyping",
            status: "Pending",
            description: "Creating wireframes and mockups for the new website.",
            color: "bg-[#E7F0FF]"
        },
        {
            id: "2",
            date: "December 11, 2020",
            title: "Backend Development",
            subtitle: "API Integration",
            status: "Accepted",
            description: "Integrating third-party APIs for the application.",
            color: "bg-[#FFF4E6]"
        },
        {
            id: "3",
            date: "December 12, 2020",
            title: "Database Design",
            subtitle: "Schema Creation",
            status: "Pending",
            description: "Designing the database schema for the project.",
            color: "bg-[#E9F7EF]"
        },
        {
            id: "4",
            date: "December 13, 2020",
            title: "Testing",
            subtitle: "Unit Testing",
            status: "Accepted",
            description: "Writing unit tests for the application.",
            color: "bg-[#FEEEEF]"
        },
        {
            id: "5",
            date: "December 14, 2020",
            title: "Deployment",
            subtitle: "Production Deployment",
            status: "Accepted",
            description: "Deploying the application to the production environment.",
            color: "bg-[#E7F0FF]"
        },
    ]);

    const [messages] = useState([
        {
            id: 1,
            name: "Stephanie",
            message: "I've got the first assignment. It's neat, good job!",
        },
        {
            id: 2,
            name: "Mark",
            message: "Any new updates on the next round of projects?",
        },
        {
            id: 3,
            name: "David",
            message: "Hey, I'd love to jump on a call this afternoon.",
        },
        {
            id: 4,
            name: "Lisa",
            message: "I am really impressed! Can't wait to see the final.",
        },
    ]);

    return (
        <div className="flex flex-row gap-4 justify-center px-8 pb-8 w-full h-full text-white">

            {/*
        Left side (main content)
      */}
            <Card className="w-full flex flex-col gap-4 p-8">
                {/* Top row: Title, date, or any navigation */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Posts</h1>
                    <div className="flex items-center gap-2">
                        <Button size="md" color="primary"
                            onPress={() => handleCreatePost()}
                        >
                            Add Post</Button>
                    </div>
                </div>

                {/* Projects grid */}
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {posts.map((post) => (
                        <PostGrid key={post.id} post={post} />
                    ))}
                </div>
            </Card>
            <Modal isOpen={createPostModal.isOpen} onOpenChange={createPostModal.onOpenChange} size="3xl" scrollBehavior="inside">
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <Input
                                    label="Title"
                                    placeholder="Enter your post title"
                                    className="w-full h-full"
                                    value={postTitle}
                                    onValueChange={setPostTitle}
                                    variant="underlined"
                                />
                            </ModalHeader>
                            <ModalBody className="flex flex-col">
                                <Textarea
                                    placeholder="Enter your post content"
                                    variant="bordered"
                                    className="w-full h-full"
                                    value={postContent}
                                    maxRows={30}
                                    onValueChange={setPostContent}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button isLoading={isProcessing} color="primary" onPress={handleSave}>
                                    Save
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}