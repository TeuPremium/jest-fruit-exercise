import fruits from "data/fruits";
import app from "index";
import { Fruit } from "repositories/fruits-repository";
import { FruitInput } from "services/fruits-service";
import supertest from "supertest";

const api = supertest(app);

describe("testando a api", () => {
  const result: Fruit[] = [
    { price: 10, name: "banamba", id: 1 },
    { price: 23, name: "papaya", id: 2 },
  ];

  const fruitsArray: FruitInput[] = [
    { price: 10, name: "banamba" },
    { price: 23, name: "papaya" },
  ];
  it("should return status 201 when fruit is inserted", async () => {
    const insertOne = await api.post("/fruits").send(fruitsArray[0]);

    expect(insertOne.status).toEqual(201);
  });

  it("should return status 200 when getting all fruits", async () => {
    await api.post("/fruits").send(fruitsArray[1]);
    const getAll = await api.get("/fruits");
    expect(getAll.status).toEqual(200);
    expect(getAll.body).toEqual(result);
  });

  it("should return status 200 when reaching for especific fruit", async () => {
    const getAll = await api.get("/fruits/2");
    expect(getAll.status).toEqual(200);
    expect(getAll.body).toEqual(result[1]);
  });
});
