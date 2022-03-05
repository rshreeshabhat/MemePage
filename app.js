var after = ''

function fetchMemes() {
    if (document.getElementById('memes')) {
        document.getElementById('memes').remove()
    }

    let parentdiv = document.createElement('div')
    parentdiv.id = 'memes'
    fetch(`https://www.reddit.com/r/memes.json?after=${after}`)
        .then(response => response.json())
        .then(body => {
            after = body.data.after
            console.log(after)
            for (let index = 0; index < body.data.children.length; index++) {
                if (body.data.children[index].data.post_hint === "image") {
                    let div = document.createElement("div");
                    let h3 = document.createElement("h3");
                    let image = document.createElement("img");
                    image.src = body.data.children[index].data.url_overridden_by_dest;
                    h3.textContent = body.data.children[index].data.title;
                    div.appendChild(h3);
                    div.appendChild(image);
                    parentdiv.appendChild(div);
                }
            }
            document.body.appendChild(parentdiv);
        })
        .catch((e) => {
            console.log(e);
        });
}