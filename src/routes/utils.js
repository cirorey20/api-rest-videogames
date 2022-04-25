async function mapApi (urlApi) {
    let arrayApi = await urlApi.data.results.map((ele) => {
        return {
            id: ele.id,
            name: ele.name,
            img: ele.background_image,
            description: null,
            released: ele.released,
            rating: ele.rating,
            platforms: ele.platforms.map(el => el.platform.name),
            genres: ele.genres.map(el => el.name),
        }
    })
    return arrayApi;
}

module.exports = {
    mapApi,
}