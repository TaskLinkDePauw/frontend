"use client";

import {
    Card, CardHeader, CardBody, Avatar, Divider, Button, ScrollShadow,
    CardFooter,
    avatar
} from "@heroui/react";
import { StarIcon } from "@/components/icons/page";
import { useState } from "react";

export default function PostDetails() {
    const [bidStatus, setBidStatus] = useState<BidStatus>({});

    const post = {
        avatarUrl: "https://i.pravatar.cc/150?u=supplier1",
        title: "Looking for a Cleaning Service",
        name: "Jason Hughes",
        description: "Need a deep cleaning service for my apartment, including carpets and kitchen cleaning. Looking for a professional and reliable supplier who can complete the job within a week.",
    };

    const suppliers = [
        {
            id: 1,
            name: "Elite Affordable Movers & Cleaning",
            avatarUrl: "https://i.pravatar.cc/150?u=supplier1",
            biddingPrice: "$199",
            serviceRequest: "Includes carpet and kitchen cleaning.",
        },
        {
            id: 2,
            name: "Sparkle Clean Services",
            avatarUrl: "https://i.pravatar.cc/150?u=supplier2",
            biddingPrice: "$180",
            serviceRequest: "Eco-friendly products, one-day service.",
        },
        {
            id: 3,
            name: "Pro Clean Experts",
            avatarUrl: "https://i.pravatar.cc/150?u=supplier3",
            biddingPrice: "$220",
            serviceRequest: "Deep cleaning plus balcony and window washing.",
        },
    ];

    interface Supplier {
        id: number;
        name: string;
        avatarUrl: string;
        biddingPrice: string;
        serviceRequest: string;
    }

    interface Post {
        title: string;
        description: string;
    }

    interface BidStatus {
        [key: number]: string;
    }

    const handleDecision = (id: number, decision: string): void => {
        setBidStatus((prevStatus: BidStatus) => ({
            ...prevStatus,
            [id]: decision,
        }));
    };

    return (
        <div className="flex flex-col items-center p-8">
            {/* Post Details Card */}
            <Card className="w-full max-w-2xl">
                <CardHeader className="flex flex-row items-center gap-4">
                    <Avatar src={post.avatarUrl} size="lg" />
                    <div className="flex flex-col">
                        <h2 className="text-xl font-bold">{post.title}</h2>
                        <p className="text-sm text-gray-600">{post.description}</p>
                    </div>
                </CardHeader>
                <Divider />
                {/* Supplier List (Scrollable) */}
                <CardBody >
                    <ScrollShadow hideScrollBar className="max-h-[200px] overflow-auto w-full">
                        {suppliers.map((supplier) => (
                            <div className="flex flex-row gap-4 m-2 items-start">
                                <Avatar src={supplier.avatarUrl} size="md" />

                                <Card key={supplier.id} className="flex-1">
                                    <CardHeader className="flex flex-row items-start gap-4 p-2">
                                        <div className="flex flex-col flex-1">
                                            <h3 className="text-md font-semibold">{supplier.name}</h3>
                                            <p className="text-green-600 font-bold">{supplier.biddingPrice}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                color="success"
                                                size="sm"
                                                startContent={<StarIcon />}
                                                onPress={() => handleDecision(supplier.id, "Accepted ✅")}
                                            >
                                                Accept
                                            </Button>
                                            <Button
                                                color="danger"
                                                size="sm"
                                                startContent={<StarIcon />}
                                                onPress={() => handleDecision(supplier.id, "Rejected ❌")}
                                            >
                                                Reject
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <Divider />
                                    <CardBody className="flex flex-col gap-4">
                                        <p className="text-gray-700 text-sm">{supplier.serviceRequest}</p>
                                        {bidStatus[supplier.id] && (
                                            <div className="mt-2 p-2 bg-gray-100 rounded-md text-center text-sm font-semibold">
                                                {bidStatus[supplier.id]}
                                            </div>
                                        )}
                                    </CardBody>
                                </Card>
                            </div>
                        ))}
                    </ScrollShadow>
                </CardBody>
            </Card>
        </div >
    );
}
