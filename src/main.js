import express from "express";
import { PrismaClient } from "@prisma/client";

const database = new PrismaClient();

const app = express();

app.use(express.json());

const port = 7000;

app.get("/shoes", async (req, res) => {
  try {
    const shoes = await database.shoes.findMany();
    if (!shoes) throw new Error("Shoes not found");
    res.send(shoes);
  } catch (err) {
    res.send({ status: 404, message: err.message });
  }
});

app.get("/shoes/:id", async (req, res) => {
  try {
    const shoes = await database.shoes.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (!shoes) throw new Error("Shoes not found");

    res.send(shoes);
  }catch (err) {
    res.send({ status: 404, message: err.message });
  }
});

app.post("/shoes/create", async (req, res) => {
  try {
    const shoes = await database.shoes.create({
      data: {
        category: req.body.category,
        brand: req.body.brand,
        size: req.body.size,
      },
    });
    res.send({ message: "Shoes made Successfully", data: shoes });
  } catch (err) {}
});

app.put("/shoes/update/", async (req, res) => {
  try {
    const shoes = await database.shoes.update({
      where: {
        id: req.body.id,
      },
      data: {
        category: req.body.category,
        brand: req.body.brand,
        size: req.body.size,
      },
    });
    res.send({ message: "Update successful", data: shoes });
  } catch (err) {}
});

app.delete("/shoes/delete", async (req, res) => {
  await database.shoes.delete({
    where: {
      id: req.body.id,
    },
  });
  res.send({ message: "Delete successful" });
});

app.listen(port, () => {
    console.log(`Aplikasi nya jalan di port ${port}`);
  });