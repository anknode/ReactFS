import citiesData from "/data/cities.json";

export default function handler(req, res) {
  if (req.method === "GET") {
    const cities = citiesData.map((city) => city.name);
    res.status(200).json(cities);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
