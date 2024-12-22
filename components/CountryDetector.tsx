"use client";
import { useState, useEffect } from "react";

export function useCountryDetection() {
        const [country, setCountry] = useState<string>("");

        useEffect(() => {
                fetch("/api/detect-country")
                        .then((response) => response.json())
                        .then((data) => {
                                if (data.country) {
                                        setCountry(data.country);
                                } else {
                                        console.error("Country detection failed, defaulting to India");
                                        setCountry('IN'); // Default to IN if country is null
                                }
                        });
        }, []);

        return country;
}