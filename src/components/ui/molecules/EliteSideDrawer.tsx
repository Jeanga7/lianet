"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, FileCheck, Loader2, ChevronDown, Check } from "lucide-react";
import { useI18n } from "@/lib/useI18n";
import { useState, useRef, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";

interface EliteSideDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    track: "expert" | "team";
}

export default function EliteSideDrawer({ isOpen, onClose, title, track }: EliteSideDrawerProps) {
    const { t } = useI18n();
    const [isDragging, setIsDragging] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "fullstack",
        otherRole: "",
        social: "",
        track: track
    });
    // Update track in formData whenever the prop changes
    useEffect(() => {
        setFormData(prev => ({ ...prev, track }));
    }, [track]);

    // Reset form when drawer closes to ensure fresh state
    useEffect(() => {
        if (!isOpen) {
            const timer = setTimeout(() => {
                setFormData({
                    name: "",
                    email: "",
                    role: "fullstack",
                    otherRole: "",
                    social: "",
                    track: track
                });
                setFile(null);
                setIsSuccess(false);
                setIsDragging(false);
                setCurrentStatus("");
                setIsSubmitting(false);
            }, 700); // Wait for AnimatePresence exit
            return () => clearTimeout(timer);
        }
    }, [isOpen, track]);

    const [file, setFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentStatus, setCurrentStatus] = useState<"verifying" | "aligning" | "authorizing" | "">("");
    const [isSuccess, setIsSuccess] = useState(false);

    // Validation logic
    const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validateUrl = (url: string) => {
        try { return new URL(url).protocol.startsWith('http'); }
        catch { return false; }
    };

    const validation = useMemo(() => ({
        name: formData.name.trim().length >= 2,
        email: validateEmail(formData.email),
        social: validateUrl(formData.social),
        otherRole: formData.role !== "other" || formData.otherRole.trim().length >= 2
    }), [formData]);

    const isFormValid = validation.name && validation.email && validation.social && validation.otherRole;

    // Dropdown State
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Business Strategy Categories & Role Mapping
    const roleGroups = [
        {
            id: "code",
            label: t("network.drawer.roleGroups.code"),
            roles: [
                { id: "fullstack", label: t("network.drawer.roles.fullstack") },
                { id: "mobile", label: t("network.drawer.roles.mobile") },
                { id: "cloud", label: t("network.drawer.roles.cloud") }
            ]
        },
        {
            id: "design",
            label: t("network.drawer.roleGroups.design"),
            roles: [
                { id: "product", label: t("network.drawer.roles.product") },
                { id: "brand", label: t("network.drawer.roles.brand") },
                { id: "motion", label: t("network.drawer.roles.motion") }
            ]
        },
        {
            id: "content",
            label: t("network.drawer.roleGroups.content"),
            roles: [
                { id: "community", label: t("network.drawer.roles.community") },
                { id: "copywriter", label: t("network.drawer.roles.copywriter") }
            ]
        },
        {
            id: "growth",
            label: t("network.drawer.roleGroups.growth"),
            roles: [
                { id: "seo", label: t("network.drawer.roles.seo") },
                { id: "growth", label: t("network.drawer.roles.growth") }
            ]
        },
        {
            id: "other",
            label: t("network.drawer.roleGroups.other"),
            roles: [
                { id: "other", label: t("network.drawer.roles.other") }
            ]
        }
    ];

    // Helper to find current role label
    const currentRoleLabel = roleGroups
        .flatMap(g => g.roles)
        .find(r => r.id === formData.role)?.label || "";

    // Map specific role IDs to their pole broad category for placeholders
    const getPoleFromRole = (roleId: string) => {
        if (["fullstack", "mobile", "cloud"].includes(roleId)) return "code";
        if (["product", "brand", "motion"].includes(roleId)) return "design";
        if (["community", "copywriter"].includes(roleId)) return "content";
        if (["seo", "growth"].includes(roleId)) return "growth";
        return "other";
    };

    // FIXED: Dynamic Placeholder derivation using full i18n paths
    const impactPlaceholder = t(`network.drawer.socialPlaceholder.${getPoleFromRole(formData.role)}` as any);

    const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
    const handleDragLeave = () => setIsDragging(false);
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const f = e.dataTransfer.files[0];
        if (f) setFile(f);
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (f) setFile(f);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.social) return;

        setIsSubmitting(true);

        setCurrentStatus("verifying");
        await new Promise(r => setTimeout(r, 1400));
        setCurrentStatus("aligning");
        await new Promise(r => setTimeout(r, 1400));
        setCurrentStatus("authorizing");
        await new Promise(r => setTimeout(r, 1200));

        setIsSubmitting(false);
        setIsSuccess(true);
        setCurrentStatus("");

        setTimeout(() => {
            onClose();
            setTimeout(() => {
                setFile(null);
                setIsSuccess(false);
                setFormData({ name: "", email: "", role: "fullstack", otherRole: "", social: "", track: track });
            }, 600);
        }, 4000);
    };

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const inputClasses = "w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 font-lato font-light text-[#1B365D] placeholder:text-[#1B365D]/45 focus:outline-none focus:border-[#40B4A6]/30 focus:bg-white/10 transition-all duration-500 shadow-sm backdrop-blur-sm";
    const labelClasses = "font-nunito font-black text-[10px] uppercase tracking-[0.4em] text-[#1B365D]/65 ml-1";

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <style dangerouslySetInnerHTML={{
                        __html: `
                        .elite-scrollbar {
                            scrollbar-width: thin;
                            scrollbar-color: rgba(64, 180, 166, 0.4) transparent;
                        }
                        .elite-scrollbar::-webkit-scrollbar {
                            width: 6px;
                        }
                        .elite-scrollbar::-webkit-scrollbar-track {
                            background: transparent;
                        }
                        .elite-scrollbar::-webkit-scrollbar-thumb {
                            background: rgba(64, 180, 166, 0.4);
                            border-radius: 10px;
                        }
                        .elite-scrollbar::-webkit-scrollbar-thumb:hover {
                            background: rgba(64, 180, 166, 0.6);
                        }
                    `}} />
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[100] bg-[#1B365D]/30 backdrop-blur-2xl cursor-crosshair"
                    />
                    <motion.div
                        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed right-0 top-0 bottom-0 z-[101] w-full max-w-lg bg-[#F8FAFC] shadow-2xl flex flex-col backdrop-blur-3xl"
                    >
                        {/* Header */}
                        <div className="px-8 py-8 border-b border-[#1B365D]/5 flex items-center justify-between flex-shrink-0">
                            <div className="space-y-4">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2">
                                        <div className={cn(
                                            "px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest",
                                            track === "expert" ? "bg-[#40B4A6]/10 text-[#40B4A6]" : "bg-[#1B365D]/10 text-[#1B365D]"
                                        )}>
                                            {track === "expert" ? "PÔLE D'IMPACT" : "PÔLE DE CONSTRUCTION"}
                                        </div>
                                        <p className="font-nunito text-[11px] font-black uppercase tracking-[0.2em] text-[#1B365D]/40">
                                            Fast-Track System
                                        </p>
                                    </div>
                                    <h2 className="font-nunito text-[clamp(1.8rem,4vw,2.4rem)] font-black leading-[1.02] tracking-[-0.03em] text-[#1B365D]">
                                        {title}
                                    </h2>
                                </div>
                                <p className="font-lato font-light text-[15px] leading-relaxed text-[#1B365D]/65">
                                    {t("network.drawer.subtitle")}
                                </p>
                            </div>
                            <button onClick={onClose} className="p-2 rounded-full hover:bg-[#1B365D]/5 transition-colors group">
                                <X className="w-5 h-5 text-[#1B365D]/40 group-hover:text-[#1B365D]/70" />
                            </button>
                        </div>

                        {/* Form Body */}
                        <div className="flex-1 overflow-y-auto px-8 py-8 elite-scrollbar relative">
                            {isSubmitting && (
                                <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#F8FAFC]/90 backdrop-blur-xl">
                                    <motion.div
                                        initial={{ top: "0%" }}
                                        animate={{ top: "100%" }}
                                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                                        className="absolute left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#40B4A6] to-transparent shadow-[0_0_20px_#40B4A6] z-50 opacity-80"
                                    />
                                    <div className="flex flex-col items-center gap-8">
                                        <div className="relative">
                                            <motion.div
                                                animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.3, 0.1] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                                className="absolute inset-0 bg-[#40B4A6] rounded-full blur-2xl"
                                            />
                                            <Loader2 className="w-12 h-12 animate-spin text-[#40B4A6] relative z-10" />
                                        </div>
                                        <AnimatePresence mode="wait">
                                            <motion.p
                                                key={currentStatus}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="font-nunito font-black text-[11px] uppercase tracking-[0.5em] text-[#1B365D] text-center px-8"
                                            >
                                                {(t as any)(`network.drawer.status.${currentStatus}`)}
                                            </motion.p>
                                        </AnimatePresence>
                                    </div>
                                </div>
                            )}

                            {isSuccess ? (
                                <motion.div
                                    initial={{ scale: 0.95, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="h-full flex flex-col items-center justify-center gap-10 p-8"
                                >
                                    <div className="relative">
                                        <motion.div
                                            animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
                                            transition={{ duration: 3, repeat: Infinity }}
                                            className="absolute inset-0 bg-[#40B4A6] rounded-full blur-3xl opacity-30"
                                        />
                                        {/* Light Sparkles */}
                                        {[...Array(6)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{
                                                    opacity: [0, 1, 0],
                                                    scale: [0, 1, 0],
                                                    x: [0, (i % 2 ? 1 : -1) * (20 + i * 10)],
                                                    y: [0, (i < 3 ? -1 : 1) * (20 + i * 10)]
                                                }}
                                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                                                className="absolute top-1/2 left-1/2 w-1 h-1 bg-[#40B4A6] rounded-full shadow-[0_0_10px_#40B4A6]"
                                            />
                                        ))}
                                        <div className="relative w-32 h-32 rounded-full bg-[#1B365D] flex items-center justify-center shadow-[0_20px_50px_rgba(27,54,93,0.3)]">
                                            <FileCheck className="w-14 h-14 text-[#40B4A6]" />
                                        </div>
                                    </div>
                                    <div className="text-center space-y-4">
                                        <p className="font-nunito font-black text-3xl text-[#1B365D] tracking-tight">
                                            {t("network.drawer.successTitle")}
                                        </p>
                                        <div className="w-12 h-[2px] bg-[#40B4A6]/30 mx-auto rounded-full" />
                                        <p className="font-lato font-light text-base text-[#1B365D]/75 max-w-xs mx-auto leading-relaxed">
                                            {t("network.drawer.successDesc")}
                                        </p>
                                    </div>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-10">
                                    <div className="space-y-8">
                                        <div className="space-y-3">
                                            <label className={labelClasses}>{t("network.drawer.nameLabel")}</label>
                                            <div className="relative">
                                                <input
                                                    required
                                                    type="text"
                                                    placeholder={t("network.drawer.namePlaceholder")}
                                                    className={cn(inputClasses, validation.name && "border-[#40B4A6]/30")}
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                />
                                                {validation.name && (
                                                    <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="absolute right-4 top-1/2 -translate-y-1/2">
                                                        <Check className="w-3.5 h-3.5 text-[#40B4A6]" />
                                                    </motion.div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <label className={labelClasses}>{t("network.drawer.emailLabel")}</label>
                                            <div className="relative">
                                                <input
                                                    required
                                                    type="email"
                                                    placeholder={t("network.drawer.emailPlaceholder")}
                                                    className={cn(inputClasses, validation.email && "border-[#40B4A6]/30")}
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                />
                                                {validation.email && (
                                                    <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="absolute right-4 top-1/2 -translate-y-1/2">
                                                        <Check className="w-3.5 h-3.5 text-[#40B4A6]" />
                                                    </motion.div>
                                                )}
                                            </div>
                                        </div>

                                        {/* CUSTOM ELITE DROPDOWN */}
                                        <div className="space-y-3" ref={dropdownRef}>
                                            <label className={labelClasses}>{t("network.drawer.roleLabel")}</label>
                                            <div className="relative">
                                                <div
                                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                                    className={cn(inputClasses, "cursor-pointer flex items-center justify-between select-none relative z-20", isDropdownOpen && "border-[#40B4A6]/30 bg-white/10")}
                                                >
                                                    <span className={cn("transition-colors", formData.role ? "text-[#1B365D]" : "text-[#1B365D]/40")}>
                                                        {currentRoleLabel}
                                                    </span>
                                                    <ChevronDown className={cn("w-4 h-4 text-[#1B365D]/50 transition-transform duration-500", isDropdownOpen && "rotate-180")} />
                                                </div>

                                                <AnimatePresence>
                                                    {isDropdownOpen && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: -10, scale: 0.98 }}
                                                            animate={{ opacity: 1, y: 5, scale: 1 }}
                                                            exit={{ opacity: 0, y: -10, scale: 0.98 }}
                                                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                                            className="absolute left-0 right-0 z-[100] bg-[#F8FAFC]/95 backdrop-blur-2xl border border-[#1B365D]/10 rounded-3xl shadow-2xl overflow-hidden max-h-[400px] flex flex-col"
                                                        >
                                                            <div className="flex-1 overflow-y-auto pt-4 pb-4 elite-scrollbar">
                                                                {roleGroups.map(group => (
                                                                    <div key={group.id} className="mb-4">
                                                                        <div className="px-6 py-2">
                                                                            <span className="font-nunito font-black text-[9px] uppercase tracking-[0.4em] text-[#1B365D]/55">
                                                                                {group.label}
                                                                            </span>
                                                                        </div>
                                                                        <div className="space-y-1">
                                                                            {group.roles.map(role => (
                                                                                <div
                                                                                    key={role.id}
                                                                                    onClick={() => {
                                                                                        setFormData({ ...formData, role: role.id });
                                                                                        setIsDropdownOpen(false);
                                                                                    }}
                                                                                    className={cn(
                                                                                        "px-8 py-3 cursor-pointer flex items-center justify-between transition-all duration-300 hover:bg-[#1B365D]/5 group/item",
                                                                                        formData.role === role.id && "bg-[#1B365D]/5"
                                                                                    )}
                                                                                >
                                                                                    <span className={cn(
                                                                                        "font-lato font-light text-sm text-[#1B365D]/80 transition-colors group-hover/item:text-[#1B365D]",
                                                                                        formData.role === role.id && "text-[#1B365D] font-medium"
                                                                                    )}>
                                                                                        {role.label}
                                                                                    </span>
                                                                                    {formData.role === role.id && (
                                                                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                                                                            <Check className="w-4 h-4 text-[#40B4A6]" />
                                                                                        </motion.div>
                                                                                    )}
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                            <p className="font-lato font-light text-[11px] text-[#1B365D]/85 italic ml-1">
                                                {t("network.drawer.roleHint")}
                                            </p>
                                        </div>

                                        <AnimatePresence>
                                            {formData.role === "other" && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="space-y-3 overflow-hidden"
                                                >
                                                    <label className={labelClasses}>{t("network.drawer.otherLabel")}</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        placeholder={t("network.drawer.otherPlaceholder")}
                                                        className={cn(inputClasses, "border-[#40B4A6]/10")}
                                                        value={formData.otherRole}
                                                        onChange={(e) => setFormData({ ...formData, otherRole: e.target.value })}
                                                    />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        <div className="space-y-3">
                                            <label className={labelClasses}>{t("network.drawer.socialLabel")}</label>
                                            <div className="relative">
                                                <input
                                                    required
                                                    type="url"
                                                    placeholder={impactPlaceholder}
                                                    className={cn(inputClasses, "border-[#40B4A6]/20 bg-white/10", validation.social && "border-[#40B4A6]/40")}
                                                    value={formData.social}
                                                    onChange={(e) => setFormData({ ...formData, social: e.target.value })}
                                                />
                                                {validation.social && (
                                                    <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="absolute right-4 top-1/2 -translate-y-1/2">
                                                        <Check className="w-3.5 h-3.5 text-[#40B4A6]" />
                                                    </motion.div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3 transition-opacity duration-500">
                                        <label className={cn(labelClasses, "text-[9px] text-[#1B365D]/60")}>{t("network.drawer.dropZone")}</label>
                                        <div
                                            onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}
                                            onClick={() => fileInputRef.current?.click()}
                                            className={cn(
                                                "relative rounded-xl border border-dashed flex items-center justify-between transition-all duration-700 cursor-pointer overflow-hidden px-5 py-3",
                                                isDragging ? "border-[#40B4A6] bg-[#40B4A6]/5" : file ? "border-[#40B4A6]/40 bg-[#40B4A6]/5" : "border-[#1B365D]/25 bg-white/20 hover:border-[#1B365D]/40 shadow-sm"
                                            )}
                                        >
                                            <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileChange} accept=".pdf,.doc,.docx" />
                                            <div className="flex items-center gap-3">
                                                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-500", file ? "bg-[#40B4A6]/10" : "bg-[#1B365D]/10")}>
                                                    <Upload className={cn("w-3 h-3", file ? "text-[#40B4A6]" : "text-[#1B365D]/60")} />
                                                </div>
                                                <p className="font-lato font-light text-[11px] text-[#1B365D]/85 italic">{file ? file.name : t("network.drawer.dropHint")}</p>
                                            </div>
                                            {file && <FileCheck className="w-4 h-4 text-[#40B4A6]" />}
                                        </div>
                                    </div>

                                    <div className="relative pb-10">
                                        <button
                                            disabled={isSubmitting || !isFormValid}
                                            className="w-full group/btn relative rounded-full bg-[#1B365D] text-white py-6 px-10 font-nunito font-black text-xs uppercase tracking-[0.4em] flex items-center justify-center gap-3 hover:bg-[#0F2440] transition-all duration-700 disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_25px_50px_rgba(27,54,93,0.25)] overflow-hidden"
                                        >
                                            <motion.div animate={{ scale: [1, 1.05, 1], opacity: [0, 0.2, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 bg-[#40B4A6] rounded-full pointer-events-none" />
                                            <div className="absolute inset-0 bg-gradient-to-r from-[#40B4A6] to-[#1B365D] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700" />
                                            <span className="relative z-10 flex items-center gap-3">
                                                {t("network.drawer.cta")}
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#40B4A6] shadow-[0_0_8px_#40B4A6] animate-pulse" />
                                            </span>
                                            <div className="absolute inset-0 z-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-700" />
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>

                        {/* Security Architect footer */}
                        <div className="px-8 py-6 border-t border-[#1B365D]/5 flex items-center justify-between flex-shrink-0 bg-white/20">
                            <div className="flex items-center gap-3">
                                <div className="w-1 h-1 rounded-full bg-[#40B4A6] shadow-[0_0_8px_#40B4A6]" />
                                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#1B365D]/45">{t("network.drawer.encryption")}</span>
                            </div>
                            <div className="text-[9px] font-nunito font-black text-[#1B365D]/30">v.3.2.0-STABLE</div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
