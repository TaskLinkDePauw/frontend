"use client";

import React, { useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Button,
    Progress,
    Avatar,
    Badge
} from "@heroui/react";

import { PostGrid } from "@/components/post_grid";


export default function Dashboard() {
    // Mock data for demonstration
    const [stats] = useState<{ label: string; value: number; color: "success" | "danger" | "primary" | "default" | "secondary" | "warning" }[]>([
        { label: "Accepted", value: 24, color: "success" },
        { label: "Pending", value: 45, color: "danger" },
    ]);

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
            <Card className="w-3/4 flex flex-col gap-4 p-8">
                {/* Top row: Title, date, or any navigation */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Home</h1>
                    <div className="text-sm text-gray-300">December, 12</div>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {stats.map((stat) => (
                        <Card key={stat.label} className="dark:bg-[#1F2937] dark:border-none">
                            <CardBody>
                                <Progress
                                    className="max-w-md"
                                    color={stat.color}
                                    formatOptions={{ style: "decimal" }}
                                    label={`${stat.label} posts`}
                                    maxValue={62}
                                    showValueLabel={true}
                                    size="sm"
                                    value={stat.value}
                                />
                            </CardBody>
                        </Card>
                    ))}


                </div>


                {/* Projects grid */}
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {posts.map((post) => (
                        <PostGrid key={post.id} post={post} />
                    ))}
                </div>
            </Card>
            {/*
        Right side (Client messages)
      */}
            <Card className="w-1/4 flex flex-col gap-4 p-8">
                <h2 className="text-lg font-bold">Client Messages</h2>
                {messages.map((msg) => (
                    <Card key={msg.id} className="dark:bg-[#111827] dark:border-none">
                        <CardHeader className="items-center">
                            <Avatar name={msg.name} className="mr-3" />
                            <h3 className="text-md font-semibold">{msg.name}</h3>
                        </CardHeader>
                        <CardBody>
                            <p className="text-sm text-gray-300">{msg.message}</p>
                        </CardBody>
                    </Card>
                ))}
            </Card>
        </div>
    );
}