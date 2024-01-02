import { use, useEffect, useState } from "react";
import { StatusMessage } from "@/types";
import classNames from "classnames";

interface StatusMessageProps {
    message: StatusMessage[];
}


const StatusMessageComponent: React.FC<StatusMessageProps> = ({ message }) => {
    const [statusMessage, setStatusMessage] = useState<StatusMessage[]>([]);

    useEffect(() => {
        setStatusMessage(message);
    }, []);

    return (
        <>
            {statusMessage && (
                <div className="w-1/2 mx-auto">
                    <ul className="list-none mb-3 mx-auto">
                        {statusMessage.map(({message, type}, index) => (
                            <li key={index}
                                className={classNames({
                                    "text-green-600 ": type === "success",
                                    "text-red-800": type === "error"
                                })}>
                                    {message}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}

export default StatusMessageComponent;