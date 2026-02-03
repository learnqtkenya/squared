'use client';

import { useState } from 'react';

export default function SquaredIoTPage() {
    const [data, setData] = useState(null);

    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-4xl font-bold mb-4">Squared IoT</h1>
            <p className="text-gray-600">Welcome to the IoT products page</p>
        </main>
    );
}