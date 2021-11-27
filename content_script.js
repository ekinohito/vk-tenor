// Put all the javascript code here, that you want to execute after page load
async function addTenor() {
    const html = document.createElement('div')
    html.innerHTML = (await (await fetch(browser.runtime.getURL("tenor.html"))).text())
    document.body.prepend(html.firstChild)

    const wrapper = document.querySelector(".vk-tenor")
    const button = wrapper.querySelector(".button")
    const popup = wrapper.querySelector(".popup")
    const searchbar = wrapper.querySelector(".searchbar")
    const gifbins = wrapper.getElementsByClassName("gifbin")
    const gifTemplate = wrapper.querySelector(".gif-template")

    button.addEventListener("click", () => { popup.classList.toggle("hidden") })
    wrapper.addEventListener("click", (e) => { e.stopPropagation() })
    document.body.addEventListener("click", () => popup.classList.add("hidden"))

    let gifs = null
    function setGifs(newGifs) {
        gifs = newGifs
        for (const gifbin of gifbins) {
            gifbin.innerHTML = ""
        }
        let currentBin = 0
        for (const gif of gifs) {
            const gifElement = gifTemplate.content.firstElementChild.cloneNode(true);
            gifElement.src = gif.media[0].tinygif.url
            gifbins[currentBin++].append(gifElement)
            currentBin = currentBin % gifbins.length
        }
    }
    searchbar.addEventListener("change", async () => setGifs(await fetchGifs(searchbar.value)))
}

async function fetchGifs(query) {
    try {
        const res = await fetch(`https://g.tenor.com/v1/search?q=${query}&key=S30OUUVPB3T5&limit=8&contentfilter=high&media_filter=minimal`)
        const data = await res.json()
        return data.results
    } catch (e) {
        console.log(e.message)
    }
}

addTenor()