import { PrismaClient } from "@prisma/client";
import dumyMaster from "@/dummy/dummyMasterCis.json";

const prisma = new PrismaClient();

async function main() {
    // generate data Cis Master
    await prisma.cis_master.createMany({
        data: dumyMaster,
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
