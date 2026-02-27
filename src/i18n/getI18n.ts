import { messages } from "./messages";
import type { Locale } from "./config";

export async function getI18n(locale: Locale) {
    return (key: string) => {
        const keys = key.split(".");
        let value: any = messages[locale as keyof typeof messages];
        for (const k of keys) {
            if (value && value[k] !== undefined) {
                value = value[k];
            } else {
                return key;
            }
        }
        return value;
    };
}
