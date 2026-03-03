"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown, Send } from "lucide-react";
import { EliteButton } from "@/components/ui/atoms";
import { cn } from "@/lib/utils";

interface ContactFormProps {
    dictionary: any;
    onSuccess: () => void;
    isTransmitting: boolean;
    setIsTransmitting: (val: boolean) => void;
}

export function ContactForm({ dictionary, onSuccess, isTransmitting, setIsTransmitting }: ContactFormProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        ambition: "",
        briefing: ""
    });

    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const ambitions = [
        { id: "code", label: dictionary.form.ambitions.code },
        { id: "growth", label: dictionary.form.ambitions.growth },
        { id: "squad", label: dictionary.form.ambitions.squad },
        { id: "other", label: dictionary.form.ambitions.other }
    ];

    const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const isFieldValid = (name: string, value: string) => {
        if (!value) return false;
        if (name === "email") return isValidEmail(value);
        return value.length > 1;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsTransmitting(true);

        // Simulate "Transmission" micro-animation / API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsTransmitting(false);
        onSuccess();
    };

    const renderField = (name: keyof typeof formData, label: string, placeholder: string, type = "text") => {
        const value = formData[name];
        const valid = isFieldValid(name, value);
        const showGlow = touched[name] && valid;

        return (
            <div className="relative">
                <label className="font-lato text-[12px] font-bold uppercase tracking-wider text-[#1B365D]/50 mb-3 block">
                    {label}
                </label>
                <div className="relative group">
                    <input
                        type={type}
                        value={value}
                        onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
                        onBlur={() => setTouched({ ...touched, [name]: true })}
                        placeholder={placeholder}
                        className={cn(
                            "w-full bg-white/40 border border-[#1B365D]/10 rounded-2xl px-6 py-4 font-lato text-[16px] text-[#1B365D] placeholder:text-[#1B365D]/30 transition-all outline-none",
                            "focus:border-[#40B4A6]/50 focus:bg-white/70",
                            showGlow && "border-[#40B4A6] ring-4 ring-[#40B4A6]/5"
                        )}
                    />
                    {showGlow && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute right-6 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-[#40B4A6] shadow-[0_0_10px_#40B4A6]"
                        />
                    )}
                </div>
            </div>
        );
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 rounded-[2.5rem] border border-[#1B365D]/10 bg-white/60 p-8 py-10 backdrop-blur-xl lg:p-12 shadow-2xl shadow-[#1B365D]/5">
            <div className="grid gap-8 sm:grid-cols-2">
                {renderField("name", dictionary.form.name, dictionary.form.namePlaceholder)}
                {renderField("email", dictionary.form.email, dictionary.form.emailPlaceholder, "email")}
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
                {renderField("company", dictionary.form.company, dictionary.form.companyPlaceholder)}

                <div className="relative">
                    <label className="font-lato text-[12px] font-bold uppercase tracking-wider text-[#1B365D]/50 mb-3 block">
                        {dictionary.form.ambition}
                    </label>
                    <div className="relative">
                        <select
                            value={formData.ambition}
                            onChange={(e) => {
                                setFormData({ ...formData, ambition: e.target.value });
                                setTouched({ ...touched, ambition: true });
                            }}
                            className={cn(
                                "w-full appearance-none bg-white/40 border border-[#1B365D]/10 rounded-2xl px-6 py-4 font-lato text-[16px] text-[#1B365D] transition-all outline-none",
                                "focus:border-[#40B4A6]/50 focus:bg-white/70",
                                formData.ambition && "text-[#1B365D]"
                            )}
                        >
                            <option value="" disabled className="text-[#1B365D]/30">Choose ambition</option>
                            {ambitions.map(opt => (
                                <option key={opt.id} value={opt.id}>{opt.label}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1B365D]/40 pointer-events-none" />
                    </div>
                </div>
            </div>

            <div className="relative">
                <label className="font-lato text-[12px] font-bold uppercase tracking-wider text-[#1B365D]/50 mb-3 block">
                    {dictionary.form.briefing}
                </label>
                <textarea
                    value={formData.briefing}
                    onChange={(e) => setFormData({ ...formData, briefing: e.target.value })}
                    onBlur={() => setTouched({ ...touched, briefing: true })}
                    placeholder={dictionary.form.briefingPlaceholder}
                    rows={5}
                    className={cn(
                        "w-full bg-white/40 border border-[#1B365D]/10 rounded-3xl px-6 py-5 font-lato text-[16px] text-[#1B365D] placeholder:text-[#1B365D]/30 transition-all outline-none resize-none",
                        "focus:border-[#40B4A6]/50 focus:bg-white/70"
                    )}
                />
            </div>

            <div className="mt-4 flex flex-col items-start gap-6">
                <EliteButton
                    disabled={isTransmitting || !isFieldValid("email", formData.email) || !formData.name || !formData.briefing}
                    className="w-full lg:min-w-[280px]"
                    icon={isTransmitting ? undefined : Send}
                    arrow="none"
                >
                    {isTransmitting ? dictionary.form.transmitting : dictionary.form.submit}
                </EliteButton>

                {isTransmitting && (
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2, ease: "linear" }}
                        className="h-1 bg-gradient-to-r from-[#1B365D] via-[#40B4A6] to-[#1B365D] rounded-full opacity-50"
                    />
                )}
            </div>
        </form >
    );
}
