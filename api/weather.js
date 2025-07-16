/*este arquivo é dedicado a proteger a chave da api usada na aplicação web. É uma proteção utilizada através do Vercel.*/

export default async function handler(req, res) {
    const {city} = req.query; 

    if (!city) {
        return res.status(400).json({error: "Cidade não Fornecida"});
    }

    const apikey = process.env.OPENWEATHER_KEY;

    const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}&lang=pt_br`;

    try {
        const response = await fetch(apiWeatherUrl);
        const data = await response.json();

        if (response.status !== 200) {
            return res.status(response.status).json(data);
        }

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({error: "erro ao buscar dados da api." });
    }
}