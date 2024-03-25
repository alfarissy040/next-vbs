import { PrismaClient } from "@prisma/client";
import dumyMaster from "@/dummy/dummyMasterCis.json";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    // generate admin aks_pemakai
    await prisma.aks_pemakai.create({
        data: {
            username: "admin",
            password: await hash("admin", 16),
            email: "admin@admin.com",
            name: "Muhammad Faza Alfarisy"
        }
    })
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
