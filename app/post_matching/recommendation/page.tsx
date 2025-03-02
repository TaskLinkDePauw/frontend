'use client';

import { Listbox, ListboxItem, Card, CardHeader, CardBody, Avatar, Divider, Button, CardFooter, Slider } from "@heroui/react";
import { useState, } from "react";

export default function CreFatePostPage() {

    const [selectedDateKey, setSelectedDateKey] = useState<string>("Today");
    const [selectedTimeKeys, setSelectedTimeKeys] = useState<Set<string>>(new Set());

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
                {/* Post Content */}
                <Card isPressable className="flex flex-col h-auto">
                    <CardHeader className="px-4 flex gap-4">
                        <Avatar
                            radius="full"
                            size="md"
                            src="https://heroui.com/avatars/avatar-1.png"
                        />
                        <div className="flex flex-col items-start gap-1">
                            <div className="text-small font-semibold leading-none text-default-600">Zoey Lang</div>
                            <div className="text-small tracking-tight text-default-400">Feb 28 at 8:54 AM</div>
                        </div>
                    </CardHeader>
                    <CardBody className="px-4 text-small text-default-400">
                        <p>Finding a reliable and efficient cleaning service can be a daunting task, especially with the plethora of options available in the market. Whether you are looking for a one-time deep clean or a regular maintenance service, it is crucial to find a service provider that meets your specific needs and standards. A good cleaning service should offer a range of services, including dusting, vacuuming, mopping, and sanitizing various areas of your home or office. Additionally, they should use eco-friendly cleaning products and have a team of trained and trustworthy professionals. When searching for a cleaning service, it is advisable to read reviews, ask for recommendations, and check their credentials and insurance. A reputable cleaning service will also provide a detailed quote and be transparent about their pricing and policies. By taking the time to research and choose the right cleaning service, you can ensure a clean and healthy environment for yourself and your loved ones, giving you peace of mind and more time to focus on other important tasks.</p>
                    </CardBody>
                    <CardFooter className="px-4 gap-3">
                        <div className="flex gap-1">
                            <p className="font-semibold text-default-400 text-small">10</p>
                            <p className=" text-default-400 text-small">Offers</p>
                        </div>
                        <div className="flex gap-1">
                            <p className="font-semibold text-default-400 text-small">100</p>
                            <p className="text-default-400 text-small">Views</p>
                        </div>
                    </CardFooter>
                </Card>

                <Card isPressable className="flex flex-col h-auto">
                    <CardHeader className="px-4 flex gap-4">
                        <Avatar
                            radius="full"
                            size="md"
                            src="https://heroui.com/avatars/avatar-1.png"
                        />
                        <div className="flex flex-col items-start gap-1">
                            <div className="text-small font-semibold leading-none text-default-600">Zoey Lang</div>
                            <div className="text-small tracking-tight text-default-400">Feb 28 at 8:54 AM</div>
                        </div>
                    </CardHeader>
                    <CardBody className="px-4 text-small text-default-400">
                        <p>Finding a reliable and efficient cleaning service can be a daunting task, especially with the plethora of options available in the market. Whether you are looking for a one-time deep clean or a regular maintenance service, it is crucial to find a service provider that meets your specific needs and standards. A good cleaning service should offer a range of services, including dusting, vacuuming, mopping, and sanitizing various areas of your home or office. Additionally, they should use eco-friendly cleaning products and have a team of trained and trustworthy professionals. When searching for a cleaning service, it is advisable to read reviews, ask for recommendations, and check their credentials and insurance. A reputable cleaning service will also provide a detailed quote and be transparent about their pricing and policies. By taking the time to research and choose the right cleaning service, you can ensure a clean and healthy environment for yourself and your loved ones, giving you peace of mind and more time to focus on other important tasks.</p>
                    </CardBody>
                    <CardFooter className="px-4 gap-3">
                        <div className="flex gap-1">
                            <p className="font-semibold text-default-400 text-small">10</p>
                            <p className=" text-default-400 text-small">Offers</p>
                        </div>
                        <div className="flex gap-1">
                            <p className="font-semibold text-default-400 text-small">100</p>
                            <p className="text-default-400 text-small">Views</p>
                        </div>
                    </CardFooter>
                </Card>
                <Card isPressable className="flex flex-col h-auto">
                    <CardHeader className="px-4 flex gap-4">
                        <Avatar
                            radius="full"
                            size="md"
                            src="https://heroui.com/avatars/avatar-1.png"
                        />
                        <div className="flex flex-col items-start gap-1">
                            <div className="text-small font-semibold leading-none text-default-600">Zoey Lang</div>
                            <div className="text-small tracking-tight text-default-400">Feb 28 at 8:54 AM</div>
                        </div>
                    </CardHeader>
                    <CardBody className="px-4 text-small text-default-400">
                        <p>Finding a reliable and efficient cleaning service can be a daunting task, especially with the plethora of options available in the market. Whether you are looking for a one-time deep clean or a regular maintenance service, it is crucial to find a service provider that meets your specific needs and standards. A good cleaning service should offer a range of services, including dusting, vacuuming, mopping, and sanitizing various areas of your home or office. Additionally, they should use eco-friendly cleaning products and have a team of trained and trustworthy professionals. When searching for a cleaning service, it is advisable to read reviews, ask for recommendations, and check their credentials and insurance. A reputable cleaning service will also provide a detailed quote and be transparent about their pricing and policies. By taking the time to research and choose the right cleaning service, you can ensure a clean and healthy environment for yourself and your loved ones, giving you peace of mind and more time to focus on other important tasks.</p>
                    </CardBody>
                    <CardFooter className="px-4 gap-3">
                        <div className="flex gap-1">
                            <p className="font-semibold text-default-400 text-small">10</p>
                            <p className=" text-default-400 text-small">Offers</p>
                        </div>
                        <div className="flex gap-1">
                            <p className="font-semibold text-default-400 text-small">100</p>
                            <p className="text-default-400 text-small">Views</p>
                        </div>
                    </CardFooter>
                </Card>
                <Card isPressable className="flex flex-col h-auto">
                    <CardHeader className="px-4 flex gap-4">
                        <Avatar
                            radius="full"
                            size="md"
                            src="https://heroui.com/avatars/avatar-1.png"
                        />
                        <div className="flex flex-col items-start gap-1">
                            <div className="text-small font-semibold leading-none text-default-600">Zoey Lang</div>
                            <div className="text-small tracking-tight text-default-400">Feb 28 at 8:54 AM</div>
                        </div>
                    </CardHeader>
                    <CardBody className="px-4 text-small text-default-400">
                        <p>Finding a reliable and efficient cleaning service can be a daunting task, especially with the plethora of options available in the market. Whether you are looking for a one-time deep clean or a regular maintenance service, it is crucial to find a service provider that meets your specific needs and standards. A good cleaning service should offer a range of services, including dusting, vacuuming, mopping, and sanitizing various areas of your home or office. Additionally, they should use eco-friendly cleaning products and have a team of trained and trustworthy professionals. When searching for a cleaning service, it is advisable to read reviews, ask for recommendations, and check their credentials and insurance. A reputable cleaning service will also provide a detailed quote and be transparent about their pricing and policies. By taking the time to research and choose the right cleaning service, you can ensure a clean and healthy environment for yourself and your loved ones, giving you peace of mind and more time to focus on other important tasks.</p>
                    </CardBody>
                    <CardFooter className="px-4 gap-3">
                        <div className="flex gap-1">
                            <p className="font-semibold text-default-400 text-small">10</p>
                            <p className=" text-default-400 text-small">Offers</p>
                        </div>
                        <div className="flex gap-1">
                            <p className="font-semibold text-default-400 text-small">100</p>
                            <p className="text-default-400 text-small">Views</p>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div >
    );
}