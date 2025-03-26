import moment from "moment-timezone";

const logMethods = {
    error: console.error,
    warn: console.warn,
    info: console.info,
    log: console.log,
};

/**
 * Custom logging function with timestamp and structured formatting.
 * Maintains console.logger as the function name for compatibility.
 * @param {string} logType - Type of log (error, warn, info, log).
 * @param {string} identifier - Unique identifier for the log.
 * @param {any} logData - Data to log (can be any type).
 */
console.logger = (logType = "log", identifier = "", logData = "") => {
    if (!logType || !identifier) return;
    const currentTime = moment()
        .tz("Asia/Kolkata")
        .format("YYYY-MM-DD HH:mm:ss Z");
    const data =
        typeof logData === "object" ? JSON.stringify(logData, null, 2) : logData;
    const message = `${currentTime} || ${logType.toUpperCase()} || ${identifier} || ${data}`;
    (logMethods[logType.toLowerCase()] || console.log)(message);
};
