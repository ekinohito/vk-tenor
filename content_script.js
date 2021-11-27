// Put all the javascript code here, that you want to execute after page load
const wrapper = document.createElement('div')
wrapper.className = "wrapper"

const tenorMenu = document.createElement('div')
tenorMenu.className = "tenor-menu"
tenorMenu.textContent = "VK Tenor"

const searchbar = document.createElement('input')
searchbar.className = "searchbar"
searchbar.placeholder = "Search Tenor"
searchbar.addEventListener("change", async () => {
    console.log(searchbar.value)
    try {
        const res = await fetch(`https://g.tenor.com/v1/search?q=${searchbar.value}&key=S30OUUVPB3T5&limit=8`)
        const data = await res.json()
        console.log(data)
    } catch (e) {
        console.log(e.message)
    }

})
tenorMenu.appendChild(searchbar)

const button = document.createElement('button')
button.textContent = "Open menu"
button.addEventListener("click", () => {tenorMenu.style.display = "flex" })
wrapper.addEventListener("click", (e) => { e.preventDefault(); e.stopPropagation(); })
document.body.addEventListener("click", () => tenorMenu.style.display = "none")

wrapper.appendChild(button)
wrapper.appendChild(tenorMenu)
document.body.prepend(wrapper)