import fs from "fs";
import path from "path";

export const heartbeat = (req, res) => {

    const packageServiceData = JSON.parse(
        fs.readFileSync(path.resolve("package.json"), "utf8"),
    );

    let heartbeatObject = {
        ServiceName: packageServiceData.name || "N/A",
        ServiceVersion: packageServiceData.version || "N/A",
    };

    res.status(200).json({
        status: "success",
        message: "Service is UP!",
        timestamp: new Date().toISOString(),
        uptime: process.uptime().toFixed(2),
        data: heartbeatObject,
    });
};
