import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function useNetworkStatus() {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            toast.success("✅ Back online");
        };

        const handleOffline = () => {
            setIsOnline(false);
            toast.error("🚫 You're offline");
        };

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);
        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    return isOnline;
}
