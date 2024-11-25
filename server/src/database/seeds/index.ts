import seedActivityLogs from "./seedActivtiyLogs";


async function seed() {
    try {
        // Initialize the tables
        await seedActivityLogs();
    } catch (error) {
        console.error("Error while seeding data:", error);
    }
}

export { seed }