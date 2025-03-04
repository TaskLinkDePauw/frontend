'use client';

import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Avatar, Button, Divider } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { useState, useCallback } from "react";
import { StarIcon } from "@/components/icons/star-icon";

interface Supplier {
    id: string;
    name: string;
    avatarUrl: string;
    rate: number;
    minHours: number;
    rating: number;
    reviewCount: number;
    tasksCount: number;
    overallTasksCount: number;
    description: string;
    reviewAuthor: string;
    reviewDate: string;
    reviewText: string;
}

export const RecommendedSupplier = ({ supplier }: { supplier: Supplier }) => {
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);


    const handleViewProfile = useCallback(
        async () => {
            try {
                router.replace(`/supplier_profile/${supplier.id}`);
            } catch (error) {
                console.error("Failed to retrieve supplier", error);
            } finally {
            }
        },
        []
    );

    const handleContinue = useCallback(
        async () => {
            setIsProcessing(true);
            try {
                // Simulate saving post content
                await new Promise((resolve) => setTimeout(resolve, 1000));
                // Redirect to schedule page
                router.replace('recommendation/schedule');
            } catch (error) {
                console.error("Failed to save post content", error);
            } finally {
                setIsProcessing(false);
            }
        },
        []
    );

    return (
        <Card className="w-full">
            {/* Header: Avatar + Basic Info */}
            <CardHeader className="flex gap-4 items-center">
                <Avatar className="w-20 h-20" src={supplier.avatarUrl} name={supplier.name} />
                <div>
                    <h2 className="text-2xl font-bold leading-tight">{supplier.name}</h2>
                    <p className="text-default-400 text-sm">{supplier.minHours} HOUR MINIMUM</p>
                    <p className="text-md font-bold">${supplier.rate.toFixed(2)}/hr</p>
                </div>
            </CardHeader>

            {/* Body: Rating, tasks, and description */}
            <CardBody className="flex flex-col gap-3">
                {/* Rating & tasks */}
                <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                        {/* Hard-coded star icons, or map them dynamically */}
                        {[...Array(5)].map((_, idx) => (
                            <StarIcon
                                key={idx}
                                height={18}
                                width={18}
                                color={idx < Math.round(supplier.rating) ? "#FACC15" : "#E5E7EB"}
                            />
                        ))}
                        <span className="text-sm text-default-400">
                            {supplier.rating} ({supplier.reviewCount} reviews)
                        </span>
                    </div>
                    <p className="text-sm text-default-400">
                        {supplier.tasksCount} Cleaning tasks<br />
                        {supplier.overallTasksCount} Cleaning tasks overall
                    </p>
                </div>

                <Divider />

                {/* Description */}
                <p className="font-bold text-md">How I can help:</p>
                <p className="text-sm text-default-500 leading-normal">
                    {supplier.description}
                </p>

                <Divider />

                {/* Latest review */}
                <div>
                    <p className="text-sm text-default-600 font-bold mb-1">
                        {supplier.reviewAuthor} on {supplier.reviewDate}
                    </p>
                    <p className="text-sm text-default-500 leading-normal">
                        &quot;{supplier.reviewText}&quot;
                    </p>
                </div>
            </CardBody>

            {/* Footer: Actions */}
            <CardFooter className="flex gap-2 justify-between">
                <Button variant="flat" color="default" className="flex-1" onPress={handleViewProfile}>
                    View Profile &amp; Reviews
                </Button>
                <Button onPress={handleContinue} variant="solid" className="plain-green-color text-white flex-1">
                    Select &amp; Continue
                </Button>
            </CardFooter>
        </Card>
    );
}