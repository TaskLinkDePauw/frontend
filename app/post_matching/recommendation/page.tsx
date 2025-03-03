'use client';

import { StarIcon } from "@/components/icons/star-icon";
import { Listbox, ListboxItem, Card, CardHeader, CardBody, Avatar, Divider, Button, CardFooter, Slider } from "@heroui/react";
import { useState, useCallback } from "react";
import { useRouter } from 'next/navigation';

export default function RecommendPage() {
    const router = useRouter();

    const [selectedDateKey, setSelectedDateKey] = useState<string>("Today");
    const [selectedTimeKeys, setSelectedTimeKeys] = useState<Set<string>>(new Set());
    const [isProcessing, setIsProcessing] = useState(false);

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

    interface FilterDateKey {
        key: string;
        title: string;
    }
    const filterDateKeys: FilterDateKey[] = [
        {
            key: "Today",
            title: "Today",
        },
        {
            key: "Within 3 Days",
            title: "Within 3 Days",
        },
        {
            key: "Within A Week",
            title: "Within A Week",
        },
        {
            key: "Choose Dates",
            title: "Choose Dates",
        },
    ]

    interface FilterTimeKey {
        key: string;
        title: string;
    }
    const filterTimeKeys: FilterTimeKey[] = [
        {
            key: "Morning",
            title: "Morning",
        },
        {
            key: "Afternoon",
            title: "Afternoon",
        },
        {
            key: "Evening",
            title: "Evening",
        },
    ]

    const tasker = {
        name: "Stephanie K.",
        avatarUrl: "https://i.pravatar.cc/150?u=stephaniek", // or any image URL
        rate: 60.91,
        minHours: 2,
        rating: 4.9,
        reviewCount: 63,
        tasksCount: 82,
        overallTasksCount: 80,
        description:
            "Experienced airbnb cleaner. I can bring all supplies or use yours prefer. Fast and efficient. Feel free to ask questions!",
        reviewAuthor: "Natalie O.",
        reviewDate: "Sat, Feb 8",
        reviewText:
            "Stephanie was available much sooner than other Taskers. Very punctual and brought her own supplies. Worked quickly and communicated when she was almost finished so I could review the work. Details like fridge/microwave, baseboards, and vents were careful...",
    };


    return (
        <div className="h-full flex-row flex gap-4 justify-center px-8">
            {/* Left side - Suggestion and Filter */}
            <div className="w-1/6 flex flex-col gap-4">
                <Card className="flex-col justify-center">
                    <CardHeader className="px-4 flex-row justify-between" >
                        <p className="text-lg feed-title-text">Date</p>
                    </CardHeader>

                    <Divider />
                    <CardBody className="p-4 h-auto w-full flex justify-center items-center">
                        <div className="flex flex-wrap gap-2 justify-center">
                            {filterDateKeys.map((filter) => (
                                <Button
                                    key={filter.key}
                                    radius="lg"
                                    className={`text-default-600 ${selectedDateKey == filter.key ? 'plain-green-color text-white ' : ''}`}
                                    variant={selectedDateKey == filter.key ? 'flat' : 'bordered'}
                                    size="md"
                                    onPress={() => {
                                        setSelectedDateKey(filter.key);
                                    }}
                                >
                                    {filter.title}
                                </Button>
                            ))}
                        </div>
                    </CardBody>
                </Card>
                <Card className="flex-col justify-center h-auto">
                    <CardHeader className="px-4 flex-row justify-between" >
                        <p className="text-lg feed-title-text">Time of Day</p>
                    </CardHeader>
                    <Divider />
                    <CardBody className="w-full p-0">
                        <Listbox
                            className="w-full p-0 m-0"
                            aria-label="Multiple selection example"
                            selectedKeys={selectedTimeKeys}
                            selectionMode="multiple"
                            variant="flat"
                            onSelectionChange={(keys) => setSelectedTimeKeys(new Set(keys as unknown as string[]))}>
                            {filterTimeKeys.map((filter) => (
                                <ListboxItem className="pl-4 pr-5 py-3 text-md" key={filter.key}>
                                    <span className={`text-md text-default-600`}>{filter.title}</span>
                                </ListboxItem>
                            ))}
                        </Listbox>
                    </CardBody>
                </Card>
                <Card className="flex-col justify-center h-auto">
                    <CardHeader className="px-4 flex-row justify-between" >
                        <p className="text-lg feed-title-text">Price</p>
                    </CardHeader>
                    <Divider />
                    <CardBody className="w-full p-4">
                        <Slider
                            classNames={{
                                base: "max-w-md gap-3 text-default-600",
                                filler: "gradient-color",
                                thumb: "gradient-color",
                            }}
                            defaultValue={[100, 500]}
                            formatOptions={{ style: "currency", currency: "USD" }}
                            label="Price Range"
                            size="sm"
                            maxValue={1000}
                            minValue={0}
                            step={50}
                        />
                    </CardBody>
                </Card>
            </div>
            {/* Middle side - Post and Feed Content */}
            <div className="w-1/2 flex flex-col gap-4">
                <Card className="w-full">
                    {/* Header: Avatar + Basic Info */}
                    <CardHeader className="flex gap-4 items-center">
                        <Avatar className="w-20 h-20" src={tasker.avatarUrl} name={tasker.name} />
                        <div>
                            <h2 className="text-2xl font-bold leading-tight">{tasker.name}</h2>
                            <p className="text-default-400 text-sm">{tasker.minHours} HOUR MINIMUM</p>
                            <p className="text-md font-bold">${tasker.rate.toFixed(2)}/hr</p>
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
                                        color={idx < Math.round(tasker.rating) ? "#FACC15" : "#E5E7EB"}
                                    />
                                ))}
                                <span className="text-sm text-default-400">
                                    {tasker.rating} ({tasker.reviewCount} reviews)
                                </span>
                            </div>
                            <p className="text-sm text-default-400">
                                {tasker.tasksCount} Cleaning tasks<br />
                                {tasker.overallTasksCount} Cleaning tasks overall
                            </p>
                        </div>

                        <Divider />

                        {/* Description */}
                        <p className="font-bold text-md">How I can help:</p>
                        <p className="text-sm text-default-500 leading-normal">
                            {tasker.description}
                        </p>

                        <Divider />

                        {/* Latest review */}
                        <div>
                            <p className="text-sm text-default-600 font-bold mb-1">
                                {tasker.reviewAuthor} on {tasker.reviewDate}
                            </p>
                            <p className="text-sm text-default-500 leading-normal">
                                &quot;{tasker.reviewText}&quot;
                            </p>
                        </div>
                    </CardBody>

                    {/* Footer: Actions */}
                    <CardFooter className="flex gap-2 justify-between">
                        <Button variant="flat" color="default" className="flex-1">
                            View Profile &amp; Reviews
                        </Button>
                        <Button onPress={handleContinue} variant="solid" className="plain-green-color text-white flex-1">
                            Select &amp; Continue
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div >
    );
}