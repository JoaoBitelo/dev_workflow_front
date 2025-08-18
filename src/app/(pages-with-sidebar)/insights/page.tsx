"use client";

// import "./index.scss";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { data as mockedData } from "./mocked";
import { Typography } from "@mui/material";

export default function LandingPage() {
    const router = useRouter();
    const [data, setData] = useState([...mockedData]);

    const handlebutton = async (pageName: string) => {
        router.push(`/${pageName}`);
    };

    return (
        <div className="prompts-grid">
            {data.map((item) => (
                <div key={item.name} className={`prompt-card ${item.status}`} onClick={() => handlebutton(item.name)}>
                    <Typography id="modal-header" variant="h6" component="h2" mb={2}>
                        {item.description}
                    </Typography>
                </div>
            ))}
        </div>
    );
}
