import { useEffect, useState } from "react";
import { StatusMessage } from "@/types";
import classNames from "classnames";
import DOMPurify from "dompurify";

interface StatusMessageProps {
    message: StatusMessage[];
}

const StatusMessageComponent: React.FC<StatusMessageProps> = ({ message }) => {
    const [statusMessage, setStatusMessage] = useState<StatusMessage[]>([]);

    useEffect(() => {
        const sanitized = message.map((msg) => ({
            ...msg,
            message: DOMPurify.sanitize(msg.message),
        }));
        setStatusMessage(sanitized);
    }, [message]);

    return (
        <>
            {statusMessage.length > 0 && (
                <div className="w-1/2 mx-auto">
                    <ul className="list-none mb-3 mx-auto">
                        {statusMessage.map(({ message, type }) => (
                            <li
                                key={message}
                                className={classNames({
                                    "text-green-600": type === "success",
                                    "text-red-800": type === "error",
                                })}
                                dangerouslySetInnerHTML={{ __html: message }}
                            />
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

export default StatusMessageComponent;
