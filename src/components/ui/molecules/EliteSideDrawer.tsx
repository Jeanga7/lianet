"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, FileCheck, Loader2 } from "lucide-react";
import { useI18n } from "@/lib/useI18n";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface EliteSideDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
}

export default function EliteSideDrawer({ isOpen, onClose, title }: EliteSideDrawerProps) {
    const { t } = useI18n();
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

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
    const handleSubmit = async () => {
        if (!file) return;
        setIsSubmitting(true);
        await new Promise(r => setTimeout(r, 2200));
        setIsSubmitting(false);
        setIsSuccess(true);
        setTimeout(() => {
            onClose();
            setTimeout(() => { setFile(null); setIsSuccess(false); }, 600);
        }, 2200);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[100] bg-[#1B365D]/30 backdrop-blur-lg cursor-crosshair"
                    />
                    <motion.div
                        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed right-0 top-0 bottom-0 z-[101] w-full max-w-lg bg-[#F8FAFC] shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="px-8 py-8 border-b border-[#1B365D]/5 flex items-center justify-between">
                            <div>
                                <h3 className="font-nunito font-black text-2xl text-[#1B365D]">{t("network.drawer.title")}</h3>
                                <p className="font-lato font-light text-sm text-[#1B365D]/50 mt-1">{t("network.drawer.subtitle")}</p>
                            </div>
                            <button onClick={onClose} className="p-2 rounded-full hover:bg-[#1B365D]/5 transition-colors">
                                <X className="w-5 h-5 text-[#1B365D]/40" />
                            </button>
                        </div>

                        {/* Position label from CTA */}
                        <div className="px-8 pt-8">
                            <p className="font-nunito font-black text-xs uppercase tracking-[0.3em] text-[#40B4A6]">{title}</p>
                        </div>

                        {/* Drop Zone */}
                        <div className="flex-1 px-8 py-6 flex flex-col gap-6">
                            <div
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                                className={cn(
                                    "relative flex-1 rounded-[2rem] border-2 border-dashed flex flex-col items-center justify-center gap-4 transition-all duration-400 cursor-pointer overflow-hidden min-h-[280px]",
                                    isDragging
                                        ? "border-[#40B4A6] bg-[#40B4A6]/5 scale-[0.98]"
                                        : file
                                            ? "border-[#40B4A6] bg-[#40B4A6]/5"
                                            : "border-[#1B365D]/10 bg-white hover:border-[#1B365D]/20"
                                )}
                            >
                                <input
                                    type="file"
                                    className="hidden"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept=".pdf,.doc,.docx"
                                />

                                {isSuccess ? (
                                    <motion.div
                                        initial={{ scale: 0.6, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="flex flex-col items-center gap-4 p-8"
                                    >
                                        <div className="w-20 h-20 rounded-full bg-[#40B4A6] flex items-center justify-center">
                                            <FileCheck className="w-10 h-10 text-white" />
                                        </div>
                                        <p className="font-nunito font-black text-xl text-[#1B365D] text-center">
                                            {t("network.drawer.successTitle")}
                                        </p>
                                        <p className="font-lato text-sm text-[#1B365D]/50 text-center">
                                            {t("network.drawer.successDesc")}
                                        </p>
                                    </motion.div>
                                ) : file ? (
                                    <div className="flex flex-col items-center gap-3 p-8">
                                        <FileCheck className="w-12 h-12 text-[#40B4A6]" />
                                        <p className="font-nunito font-black text-[#1B365D]">{file.name}</p>
                                        <p className="text-xs font-black uppercase tracking-widest text-[#1B365D]/30">
                                            {(file.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-4 p-8">
                                        <div className="w-14 h-14 rounded-full bg-[#1B365D]/5 flex items-center justify-center">
                                            <Upload className="w-6 h-6 text-[#1B365D]/30" />
                                        </div>
                                        <div className="text-center space-y-1">
                                            <p className="font-nunito font-bold text-sm text-[#1B365D]/70">
                                                {t("network.drawer.dropZone")}
                                            </p>
                                            <p className="font-lato text-xs text-[#1B365D]/40 italic">
                                                {t("network.drawer.dropHint")}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Scan effect during submit */}
                                {isSubmitting && (
                                    <motion.div
                                        initial={{ top: "-100%" }}
                                        animate={{ top: "200%" }}
                                        transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                                        className="absolute left-0 right-0 h-24 bg-gradient-to-b from-transparent via-[#40B4A6]/15 to-transparent pointer-events-none"
                                    />
                                )}
                            </div>

                            {file && !isSuccess && (
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="w-full rounded-full bg-[#1B365D] text-white py-5 font-nunito font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#0F2440] transition-colors disabled:opacity-60 shadow-xl shadow-[#1B365D]/20"
                                >
                                    {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                                    {t("network.drawer.cta")}
                                </button>
                            )}
                        </div>

                        {/* Security footer */}
                        <div className="px-8 py-6 border-t border-[#1B365D]/5 flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#40B4A6] animate-pulse" />
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#1B365D]/30">
                                {t("network.drawer.encryption")}
                            </span>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
